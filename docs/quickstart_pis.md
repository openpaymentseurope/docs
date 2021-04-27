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
// As we see, creditorAccount will look
function getCreditorAccount(creditor, bic){
    switch (bic) {
      case "HANDSESS":
        return {
          clearingNumber: globalAny.creditorClearingNumber,
          bban: globalAny.creditorBban,
          currency: globalAny.creditorCurrency,
        };
      default:
        return {
          iban: globalAny.creditorIban,
          currency: globalAny.creditorCurrency,
        };
    }
}

function getDebtorAccount(debtor, bic){
    switch (bic) {
        case "HANDSESS":
        case "NDEASESS":
            return {
                bban: account.bban,
                currency: account.currency,
            };
        default:
            return {
                iban: account.iban,
                currency: account.currency,
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
````

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

