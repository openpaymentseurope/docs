---
id: quickstart_pis
title: Integrate to PIS
sidebar_label: Integrate to PIS
---

This guide shows how to integrate to the PIS API. It will contain information on how to initiate a domestic private account to account payment.

## Prerequisites

Follow the [Get started](getstarted) guide to set up an account and create an application.

## Good to know

### Certificate
If you use the production environment, you should attach the certificate you downloaded from the Developer Portal when making API requests.

### SCA approaches

There are two SCA (authentication) approaches that the application needs to implement in order to support all banks: Decoupled and Redirect.

In the **Redirect** approach, you route the user to the chosen bank where the user authenticates, and once that’s done the bank will route the user back to your application.

In the **Decoupled** approach, the user stays in your application where you generate a QR code or a link for Mobile Bank ID.

### Variables and constants used in the guide


| Name         | Description                                                                                                                                                                                                                                                             |
| ------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| authURL      | The token URL. For production, use `https://auth.openbankingplatform.com/connect/token`                                                                                                                                                                                 |
| apiHost      | The API host. All API calls in this guide except the ones to `authURL` will be prefixed with this value. For production, use `https://api.openbankingplatform.com`                                                                                                                                                                                                 |
| bic          | Will contain the BIC of the bank that the user selected.                                                                                                                                                                                                                |
| clientID     | The Client ID of the application you created in the Developer Portal.                                                                                                                                                                                                   |
| clientSecret | The secret that was generated when you created an application. If you did not save that value, you need to generate a new secret.                                                                                                                                    |
| paymentAmount | The transaction amount                                                                                                                                    |
| paymentCurrency | The transaction currency                                                                                                                                    |
| psuUserAgent | The User-Agent from the user's request.                                                                                                                                                                                                                                 |
| psuIpAddress | The user's IP address                                                                                                                                                                                                                                                   |
| xRequestID   | Most requests require the header `X-Request-ID`, which is a uuid. This will be a unique identifier of your request and will be useful in case you need support. Make sure to create a new  In this guide, we assume that you have generate a new value for every request and stored it in the variable `xRequestID`. |

## Integration

The guide shows how to initiate a domestic payment between two private bank accounts. 

### 1. Get access token

You need an access token to make requests to the Open Banking Platform API. Access tokens are valid for one hour.

#### Endpoint

```javascript
POST authURL
```
#### Request headers

```javascript
Content-Type: "application/x-www-form-urlencoded"
```

#### Request body

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
accessToken = response.body.access_token;
```

### 2. Create Payment Initiation
<a href="https://docs.openpayments.io/en/openpayments-NextGenPSD2-1.3.3.html#operation/initiatePayment" target="_blank">Endpoint details</a>

First we need to create a payment initiation. This is where we specify the details of the transaction.

#### Endpoint
```javascript
POST /psd2/paymentinitiation/v1/payments/domestic
```

#### Request headers
```javascript
Accept: "application/json",
Authorization: "Bearer " + accessToken,
Content-Type: "application/json",
PSU-IP-Address: psuIpAddress,
PSU-User-Agent: psuUserAgent,
X-BicFi: bic,
X-Request-ID: xRequestID,
```

We need to construct parts of the request body a bit differently depending on what bank we are sending the money from (the debtor) and to (the creditor). This is because the banks differs a bit in what format they want the account numbers.
For that we can create the helper functions `getCreditorAccount` and `getDebtorAccount`, which returns the body parameters formatted in the correct way depending on the bank of the sender (the debtor).

This assumes that you have the objects `creditor` and `debtor` that contains the neccessary information.

```javscript

// generates the body parameter debtorAccount
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

// generates the body parameter creditorAccount
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

```


#### Request body
```javascript
{
    instructedAmount: {
        currency: paymentCurrency,
        amount: paymentAmount,
    },
    creditorName: creditor.name,
    creditorAccount: getCreditorAccount(creditor, bic),
    remittanceInformationUnstructured:
        "This text shows up on the transaction, both for creditor and debtor",
    debtorAccount: getDebtorAccount(debtor, bic),
}
```


#### Result

```javascript
// The paymentID will be used in the coming requests
paymentID = response.body.paymentId
```

### 3. Start Payment Initiation Authorisation Process
<a href="https://docs.openpayments.io/en/openpayments-NextGenPSD2-1.3.3.html#operation/startPaymentAuthorisation" target="_blank">Endpoint details</a>

Next we need to create an authorisation for the payment initiation we just created.

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
    X-BicFi: bic,
    X-Request-ID: xRequestID,
```

#### Result

```javascript
// Contains the id that represents Mobilt BankID (mbid).
authenticationMethodID = response.body.scaMethods[0].authenticationMethodId;
// URL that will be used in the call to Update PSU Data for Payment Initiation (next step).
authoriseTransactionUri = response.body._links.authoriseTransaction.href;
//Resource identification of the related SCA, 
// will be used in the final step of the Redirect approach.
paymentAuthorisationID = response.body.authorisationId;
```

### 4. Update PSU Data for Payment Initiation

<a href="https://docs.openpayments.io/en/openpayments-NextGenPSD2-1.3.3.html#operation/updatePaymentPsuData" target="_blank">Endpoint details</a>

This request triggers the authentication flow.

#### Endpoint

```javascript
POST authoriseTransactionUri
```

#### Request headers
```javascript
Accept: "application/json",
Authorization: "Bearer " + accessToken,
Content-Type: "application/json",
PSU-IP-Address: psuIpAddress,
X-BicFi: bic,
X-Request-ID: xRequestID,
```

#### Request body
```javascript
{
    authenticationMethodId: authenticationMethodID
}
```

#### Result

The first thing we need to check in the response is the SCA method used by the bank (Decoupled or Redirect), which will be extracted from the response headers.

```javascript
// "DECOUPLED" or "REDIRECT"
scaApproach = response.headers.aspsp-sca-approach;
```

We are interested in different values from the response depending on if we got Decoupled or Redirect.

If the SCA approach is Decopled, you need to get the `autoStartToken` for the QR code that your user will scan.

```javascript
autoStartToken = response.body.challengeData.data[0]
```

You can the construct the full QR code like this:
```javascript
bankIdLink = "bankid:///?autostarttoken=" + autoStartToken
```

If your users only ude a desktop, the above is enough. You will display the QR code in the browser and poll the status of the Payment Initiation to see when it's verified. 

If you want to support users on smartphones, you'll need to create a slightly different link, it must contain a redirect_uri query parameter with a value that points back to your site/application. Instruct the user to click on this link, once the authentication process is complete, Mobilt BankID will redirect the user to the value in this parameter. 
```javascript
bankIdLink = "bankid:///?autostarttoken=" + autoStartToken + "&redirect=" + redirectUriAfterDecoupledAuthentication
```

In case of Redirect approach, you need to extract the link to the bank's external authentication page, and replace the placeholders with the relevant values.

```javascript
redirectLinkToBank = response.body._links.scaOAuth.href
```

Replace the following placeholders in `redirectLinkToBank` in the following way:

`"[CLIENT_ID]"` should be replaced by your `clientID`.

`"[TPP_REDIRECT_URI]"` is the URI you want the bank to redirect to after the user has authenticated. This URI has to be whitelisted for your application in the Developer Portal.

`"[TPP_STATE]"` is a convenience field for you to put in anything you want, for example something that identifies this session. You may or may not need to use this, depending on how your system is set up.


We now have what we need to let the user authorise the payment intiation. The flow will differ completely between Decoupled and Redirect, so the intructions will be separated.

### 5a. Decoupled

If using desktop, you use the `bankIdLink` to to generate a QR code that you present in your UI. When the user has successfully authenticated, the SCA status of the Payment Initiation Authorisation will be `"finalised"`.

<a href="https://docs.openpayments.io/en/openpayments-NextGenPSD2-1.3.3.html#operation/getPaymentInitiationScaStatus" target="_blank">Endpoint details</a>
#### Endpoint

```javascript
GET /psd2/paymentinitiation/v1/payments/domestic/${paymentID}/authorisations/{paymentAuthorisationID} 
```

#### Request headers
```javascript
Accept: "application/json",
Authorization: "Bearer " + accessToken,
Content-Type: "application/json",
PSU-IP-Address: psuIpAddress
X-BicFi: bic,
X-Request-ID: xRequestID,
```

#### Result
```javascript
scaStatus = response.body.scaStatus
```

### 5b. Redirect

First you need to route the user to `redirectLinkToBank`. When the user has authenticated, the bank will route the user back to the URI you replaced `"[TPP_REDIRECT_URI]"` with. Once there, you extract the URL parameters `code` and `scope`.

To finalise the payment, you make the following request:

#### Endpoint
```javascript
POST authUrl
```

#### Request headers
```javascript
Content-Type: "application/x-www-form-urlencoded",
X-PaymentId: paymentID,
X-PaymentAuthorisationId: paymentAuthorisationID,
```

#### Request body
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
accessToken = response.body.access_token
```

If you receive an access token it means that the request was successful.

### 6. Get Payment Initiation Status

The last thing to do is to check the status of the Payment Initiation.

#### Endpoint

<a href="https://opedocstest.z6.web.core.windows.net/en/openpayments-NextGenPSD2-1.3.3.html#operation/getPaymentInitiationStatus" target="_blank">Endpoint details</a>

```javascript
GET /psd2/paymentinitiation/v1/payments/domestic/{paymentID}/status
```

#### Request headers
```javascript
Accept: "application/json",
Authorization: ”Bearer ” + accessToken,
Content-Type: "application/json",
PSU-IP-Address: psuIpAddress,
PSU-User-Agent: psuUserAgent
```

#### Result
```javascript
transactionStatus = response.body.transactionStatus
```

The Payment Initiation can have a number of different statutes. Read more about them in the <a href="https://opedocstest.z6.web.core.windows.net/en/openpayments-NextGenPSD2-1.3.3.html#operation/getPaymentInitiationStatus" target="_blank">Endpoint details</a>.
Currently we want to check if the payment was rejected. In that case, `transactionStatus` will have the value `"RJCT"`.
If not, then we are done.
