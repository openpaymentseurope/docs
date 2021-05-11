---
id: quickstart_pis
title: Integrate to PIS
sidebar_label: Integrate to PIS
---

This guide shows how to integrate to the PIS API. It will contain information on how to initiate a domestic payment between two private accounts.

## Prerequisites

Follow the [Get started](getstarted) guide to set up an account and create an application.

## Good to know

### Certificate
If you use the production environment, you should attach the certificate you downloaded from the Developer Portal when making API requests.

### SCA approaches

There are two SCA (authentication) approaches that the application needs to implement in order to support all banks: Decoupled and Redirect.

In the **Decoupled** approach, the user never leaves your application, and will authenticate either by scanning a QR code that you generate.

In the **Redirect** approach, you route the user to the chosen bank where the user authenticates, and once that’s done the bank will route the user back to your application.

### Variables and constants used in the guide


| Name         | Description                                                                                                                                                                                                                                                             |
| ------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| authURL      | The token URL. For production, use `https://auth.openbankingplatform.com/connect/token`                                                                                                                                                                                 |
| apiHost      | The API host. All API calls in this guide except the ones to `authURL` will be prefixed with this value. For production, use `https://api.openbankingplatform.com`                                                                                                                                                                                                 |
| bic          | Will contain the BIC of the bank that the user selected.                                                                                                                                                                                                                |
| clientID     | The Client ID of the application you created in the Developer Portal.                                                                                                                                                                                                   |
| clientSecret | The secret that was generated when you created an application. If you did not save that value, you need to create a new application.                                                                                                                                    |
| paymentAmount | The transaction amount                                                                                                                                    |
| paymentCurrency | The transaction currency                                                                                                                                    |
| psuUserAgent | The User-Agent from the user's request.                                                                                                                                                                                                                                 |
| psuIpAddress | The user's IP address                                                                                                                                                                                                                                                   |
| xRequestID   | Most requests require the header `X-Request-ID`, which is a uuid. This will be a unique identifier of your request and will be useful in case you need support. In this guide, we assume that you have generated this value and stored it in the variable `xRequestID`. |

## Integration

Info om att man kommer göra en överföring från ett privatkonto till ett annat.
The guide shows how to initiate a domestic payment. 

### 1. Get access token

You need an access token to make requests to the Open Banking API. Access tokens are valid for one hour.

#### Endpoint

```javascript
POST authURL
```
#### Headers

```javascript
Content-Type: "application/x-www-form-urlencoded"
```

#### Body

```javascript
{
    client_id: clientID,
    client_secret: clientSecret,
    grant_type: ”client_credentials”,
    scope: ”paymentinitiation private”
}
```

Note: `scope`contains information about what part of the API the access token should be valid for.
#### Result
```javascript
accessToken = response.data.access_token;
```

### 2. Create Payment Initiation

#### Endpoint
```javascript
POST /psd2/paymentinitiation/v1/payments/domestic
```

#### Headers
```javascript
Accept: "application/json",
Authorization: "Bearer " + accessToken,
Content-Type: "application/json",
PSU-IP-Address: psuIpAddress,
PSU-User-Agent: psuUserAgent,
X-BicFi: bic,
X-Request-ID: xRequestID,
```

We need to construct parts of the request body a bit differently depending on what bank we are sending the money from and to. This is because the differs a bit in what format they want the account numbers (formuleringen suger).
To our help we have the functions `getCreditorAccount` and `getDebtorAccount`, which returns the body parameters formatted in the correct way depending on what bank the money is sent from and to.

```javscript
// As we see, wes  ditorAccs sount will look
function getCreditorAccount(creditor, bic){
    switch (bic) {
      case "HANDSESS":
        return {
          clearingNumber: creditor.clearingNumber,
          bban: creditor.bban,
          currency: creditor.currency,
        };
      default:
        return {
          iban: creditor.iban,
          currency: creditor.currency,
        };
    }
}

function getDebtorAccount(debtor, bic){
    switch (bic) {
        case "HANDSESS":
        case "NDEASESS":
            return {
                bban: debtor.bban,
                currency: debtor.currency,
            };
        default:
            return {
                iban: debtor.iban,
                currency: debtor.currency,
            };
    }
}
```

`remittanceInformationUnstructured` contains the message that will be displayed on the transaction.



#### Body
```javascript
{
    instructedAmount: {
        currency: paymentCurrency,
        amount: paymentAmount,
    },
    creditorName: creditorName,
    creditorAccount: getCreditorAccount(creditor, bic),
    remittanceInformationUnstructured:
        remittanceInformationUnstructured,
    debtorAccount: getDebtorAccount(debtor, bic),
}
```


#### Result

```javascript
paymentID = response.data.paymentId
```

### 3. Start Payment Initiation Authorisation Process

#### Endpoint

```javascript
POST /psd2/paymentinitiation/v1/payments/domestic/${paymentID}/authorisations
```

#### Request headers
```javascript
    Accept: "application/json",
    Authorization: "Bearer " + accessToken,
    Content-Type: "application/json",
    PSU-IP-Address: psuIpAddress,
    X-BicFi: bicFi,
    X-Request-ID: xRequestID,
```

#### Result

```javascript
paymentAuthorisationID = response.data.authorisationId;
authoriseTransactionUri = response.data._links.authoriseTransaction.href;
authenticationMethodID = response.data.scaMethods[0].authenticationMethodId;
```

### 4. Update PSU Data for Payment Initiation

#### Endpoint

```javascript
POST authoriseTransactionUri
```

#### Headers
```javascript
Accept: "application/json",
Authorization: "Bearer " + accessToken,
Content-Type: "application/json",
PSU-IP-Address: psuIpAddress,
X-BicFi: bicFi,
X-Request-ID: xRequestID,
```

#### Body
```javascript
authenticationMethodId: authenticationMethodID
```

#### Result

```javascript
scaApproach = response.headers.aspsp-sca-approach;

// Only relevant if scaApproach == "DECOUPLED"
autoStartToken = result.challengeData.data[0]

// Only relevant if scaApproach == "REDIRECT"
redirectLinkToBank = result._links.scaOAuth.href
```

If the SCA approach is Decopled, you will use `autoStartToken` for the QR code that the user will scan. Construct the full QR code like this:
```javascript
bankIdLink = "bankid:///?autostarttoken=" + autoStartToken
```

If your users only sign in on a desktop, the above is enough. You will display the QR code in the browser and poll the status of the Payment to see when it's verified. 

If you want to support users on smartphones, you'll need to create a slightly different link, it must contain a redirect_uri query parameter with a value that points back to your site/application. Instruct the user to click on this link, once the authentication process is complete, Mobilt BankID will redirect the user to the value in this parameter. 
```javascript
bankIdLink = "bankid:///?autostarttoken=" + autoStartToken + "&redirect=" + redirectUriAfterDecoupledAuthentication
```

In case of Redirect approach, you need to extract the link to the bank's external authentication page, and replace the placeholders with the relevant values.

Replace the following placeholders in `redirectLinkToBank` in the following way:

`"[CLIENT_ID]"` should be replaced by your `clientID`.

`"[TPP_REDIRECT_URI]"` is the URI you want the bank to redirect to after the user has authenticated. This URI has to be whitelisted for your application in the Developer Portal.

`"[TPP_STATE]"` is a convenience field for you to put in anything you want, for example something that identifies this session. You may or may not need to use this, depending on how your system is set up.


We now have what we need to let the user authenticate.
The flow will differ completely between Decoupled and Redirect, so the intructions will be separated.

### 5a. Decoupled

If using desktop, you use the `bankIdLink` to to generate a QR code that you present in your UI. When the user has successfully authenticated, the SCA status of the Payment Initiation Authorisation will be `"finalised"`.

#### Endpoint
´´´javascript
GET /psd2/paymentinitiation/v1/payments/domestic/${paymentID}/authorisations/{paymentAuthorisationID}
```

#### Headers
```javascript
Accept: "application/json",
Authorization: "Bearer " + accessToken,
Content-Type: "application/json",
PSU-IP-Address: psuIpAddress
X-BicFi: bicFi,
X-Request-ID: xRequestID,
```

#### Result
```javascript
scaStatus = response.data.scaStatus
```

### 5b. Redirect

First you need to route the user to `redirectLinkToBank`. When the user has authenticated, the bank will route the user back to the URI you replaced `"[TPP_REDIRECT_URI]"` with. Once there, you extract the URL parameters `code` and `scope`.

To finalise the Payment, you make the following request:

#### Endpoint
```javascript
POST authUrl
```

#### Headers
```javascript
Content-Type: "application/x-www-form-urlencoded",
X-PaymentId: paymentID,
X-PaymentAuthorisationId: paymentAuthorisationID,
```

#### Body
```javascript
{
    client_id: clientID,
    client_secret: clientSecret,
    code: code,
    redirect_uri: redirectURI, // Will be the same value as what you replaced [TPP_REDIRECT_URI] with in the end of step 4.
    scope: scope,
    grant_type: "authorization_code"
}
```

#### Result
```javascript
accessToken = result.access_token
```

If you receive an access token it means that the request was successful.

### 6. Get Payment Initiation Status

The last thing to do is to check the status of the Payment Initiation.



<!-- Get Payment Initiation Authorisation SCA Status -->

