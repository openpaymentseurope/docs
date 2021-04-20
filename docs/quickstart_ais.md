---
id: quickstart_ais
title: List accounts
sidebar_label: List accounts
---

This guide shows how to make requests to the Open Payments API. We will build an application that lets a user do the following:

- Choose a bank. (Using the ASPSP API)
- Authenticate to the bank. (Using the Consent API)
- List its accounts. (Using the AIS API).

## Prerequisites

Follow the [Get started](getstarted) guide to set up an account and create an application.

## Good to know

### Consent

A Consent is an object that holds information about what permissions a user has given you to get its account information from a particular bank.

### SCA flows

There are two SCA (authentication) flows that the application needs to implement in order to support all banks: Decoupled flow and OAuth Redirect flow.

In the **Decoupled** flow, the user will stay in the application and you’ll either generate a QR code that the user scans with its Bank ID app, or in case of your user using your app in a smartphone, you will handle it the proper way [DENNA FORMULERINGEN MÅSTE GÖRAS OM]

In the **OAuth Redirect** flow, you route the user to the chosen bank where the user authenticates, and once that’s done the bank will route the user back to our application.

### Variables and constants used in the guide

| Name         | Description                                                                                                                                                                                                                                                             |
| ------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| authURL      | The token URL. For production, use `https://auth.openbankingplatform.com/connect/token`                                                                                                                                                                                 |
| apiHost      | The API host. For production, use `https://api.openbankingplatform.com`                                                                                                                                                                                                 |
| bic          | Will contain the BIC of the bank that the user selected.                                                                                                                                                                                                                |
| clientID     | The Client ID of the application you created in the Developer Portal.                                                                                                                                                                                                   |
| clientSecret | The secret that was generated when you created an application. If you did not save that value, you need to create a new application.                                                                                                                                    |
| psuUserAgent | The User-Agent from the user's request.                                                                                                                                                                                                                                 |
| psuIpAddress | The user's IP address                                                                                                                                                                                                                                                   |
| xRequestID   | Most requests require the header `X-Request-ID`, which is a uuid. This will be a unique identifier of your request and will be useful in case you need support. In this guide, we assume that you have generated this value and stored it in the variable `xRequestID`. |

## ASPSP API

First thing to do is to get all aspsps to show in your UI and let the user chose a bank. This is an optional step, you can hard code the banks if you want to. We recommend you fetching them from our API though, since in that case new banks that we integrate to will automatically be added to your UI.

### 1. Get access token

We will get an access token to make requests to the ASPSP API. Access tokens are valid for one hour.

#### Endpoint

`authURL`

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
    scope: ”aspspinformation private”
}
```

#### Result
```javascript
accessToken = response.access_token;
```

Note: `scope`contains information about what part of the API the access token should be valid for. For example, if you want an access token for making requests to the PIS API for corporate accounts, `scope` will contain `paymentinitiation corporate`.

### 2. Get ASPSP List

Next step is to get all banks in Sweden that Open Payments has integrated to.

#### Endpoint

```javascript
GET /psd2/aspspinformation/v1/aspsps?isoCountryCodes=SE
```

#### Headers

```javascript
Accept: "application/json",
Authorization: "Bearer " + accessToken,
Content-Type: "application/json",
X-Request-ID: xRequestID
```

#### Result
```javascript
aspsps = response.aspsps;
```

You now have a list of banks that you can use to create a UI that let your user select a bank to authenticate to.

## Consent API

After the user has chosen a bank, we need to authenticate the user to that bank. That is done by creating a Consent object and [execute an authentication process (Måste ha bättre formulering)]

### 1. Create Consent

#### Endpoint

```javascript
POST /psd2/consent/v1/consents
```

#### Headers

```javascript
Accept: "application/json",
Authorization: ”Bearer ” + accessToken,
Content-Type: "application/json",
X-BicFi: bic,
X-Request-ID: xRequestID,
PSU-User-Agent: psuUserAgent,
PSU-IP-Address: psuIpAddress,
```

#### Body
```javascript
{
    access: {},
    combinedServiceIndicator: false,
    frequencyPerDay: 1,
    recurringIndicator: false,
    validUntil: ”2021-04-23”,
}
```
You can read more about the specific body parameters in the API docs.

#### Result
```javascript
consentID = response.consentId;
```

### 2. Start Consent Authorisation Process

Next step is to start an authorization process for this Consent.

#### Endpoint

```javascript
POST /psd2/consent/v1/consents/{consentID}/authorisations
```

#### Headers

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
authenticationMethodId = result.scaMethods[0].authenticationMethodId;
authorisationId = result.authorisationId;
updatePSUDataForConsentAddress = result._links.scaStatus.href;
```

`authenticationMethodId` will hold the authentication method supported (currently only Bank ID).
`authorisationId` Resource identification of the related SCA (vet inte vad jag ska skriva)
``