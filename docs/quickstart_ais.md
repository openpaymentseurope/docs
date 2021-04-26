---
id: quickstart_ais
title: List accounts
sidebar_label: List accounts
---

This guide shows how to integrate to the Open Banking API. It contains instructions on what API calls to make and how to structure them. The application will let a user do the following for its private accounts:

- Choose a bank. (Using the ASPSP API)
- Authenticate to the bank. (Using the Consent API)
- List its accounts. (Using the AIS API).

## Prerequisites

Follow the [Get started](getstarted) guide to set up an account and create an application.

## Good to know

### ASPSP
The terms "ASPSP" (Account Servicing Payment Service Provider) and "bank" will be used interchangeably in this guide.

### Certificate
If you make requests to the production environment you need to attach the certificate you downloaded from the Developer Portal in every API request.
### Consent

A Consent is an object that holds information about what permissions a user has given you to get its account information from a particular bank.

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
| psuUserAgent | The User-Agent from the user's request.                                                                                                                                                                                                                                 |
| psuIpAddress | The user's IP address                                                                                                                                                                                                                                                   |
| xRequestID   | Most requests require the header `X-Request-ID`, which is a uuid. This will be a unique identifier of your request and will be useful in case you need support. In this guide, we assume that you have generated this value and stored it in the variable `xRequestID`. |

## ASPSP API

First we need to fetch all available banks, which can be used by you to create a UI where your user can pick what bank to authenticate to. This is an optional step, you can of course hard code the banks if you want to. We recommend you fetching them from our API though, so that new banks we integrate with can automatically be added to your UI.

### 1. Get access token

You need an access token to make requests to the ASPSP API. Access tokens are valid for one hour.

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
    scope: ”aspspinformation private”
}
```

Note: `scope`contains information about what part of the API the access token should be valid for.
#### Result
```javascript
accessToken = response.data.access_token;
```


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
banks = response.data.aspsps;
```

You now have a list of banks that you can use to create a UI that let your user select a bank to authenticate to.

## Consent API

After the user has chosen a bank, we need to authenticate the user to that bank. This is done by creating a Consent object and execute an authentication process (Måste ha bättre formulering). The following examples assume that you have already created an access token with scope `"accountinformation private"`. 

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
You can read more about the specific body parameters in the API documentation.

#### Result
```javascript
consentID = response.data.consentId;
```

### 2. Start Consent Authorisation Process

Next step is to start an authorisation process for this Consent. [Skriva något mer?]

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
// Contains the authentication method supported (currently only Bank ID).
authenticationMethodID = response.data.scaMethods[0].authenticationMethodId;

//Resource identification of the related SCA, 
// will be used in the final step of the Redirect approach.
consentAuthorisationID = response.data.authorisationId;

// URL that will be used in the call to Update PSU Data for Consent (next step).
resource = response.data._links.scaStatus.href;
```

### 3. Update PSU Data for Consent
(skriv något här med)
#### Endpoint

```javascript
PUT resource
```

#### Headers

```javascript
Accept: "application/json",
Authorization: "Bearer " + accessToken,
Content-Type: "application/json",
PSU-IP-Address: psuIpAddress,
X-BicFi: bic,
X-Request-ID: xRequestID
```

#### Body

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

#### Decoupled

If the SCA approach is Decopled, you need to get the `autoStartToken` for the QR code that your user will scan.

```javascript
autoStartToken = result.challengeData.data[0]
```

You can the construct the full QR code like this:
```javascript
bankIdLink = "bankid:///?autostarttoken=" + autoStartToken
```

If your users only sign in on a desktop, the above is enough. You will display the QR code in the browser and poll the status of the Consent to see when it's verified. 

[Nedanstående är dåligt och behöver förbättras]
If you want to support users on smartphones, you'll need to create a slightly different link, it must contain a redirect_uri query parameter with a value that points back to your site/application. Instruct the user to click on this link, once the authentication process is complete, Mobilt BankID will redirect the user to the value in this parameter. 
```javascript
bankIdLink = "bankid:///?autostarttoken=" + autoStartToken + "&redirect=" + redirectUriAfterDecoupledAuthentication
```

#### Redirect

In case of Redirect approact, you need to extract the link to the bank's external authentication page, and replace the placeholders with the relevant values.

```javascript
redirectLinkToBank = result._links.scaOAuth.href
```

Replace the following placeholders in `redirectLinkToBank` in the following way:

`"[CLIENT_ID]"` should be replaced by your `clientID`.

`"[TPP_REDIRECT_URI]"` is the URI you want the bank to redirect to after the user has authenticated. This URI has to be whitelisted for your application in the Developer Portal.

`"[TPP_STATE]"` is a convenience field for you to put in anything you want, for example something that identifies this session. You may or may not need to use this, depending on how your system is set up.

We now have what we need to let the user authenticate.
The flow will now differ completely between Decoupled and Redirect, so the instructions will be separated.

### 4a. Decoupled

If using desktop, you use the `bankIdLink` to generate a QR code that you present in your UI. When the user has successfully authenticated, the status of the Consent will be valid. To know the status of the Consent, you should poll the OPE API endpoint Get Consent Status:

#### Endpoint

```javascript
GET /psd2/consent/v1/consents/{consentID}/status
```

Headers
```javascript
Accept: "application/json",
Authorization: "Bearer " + accessToken,
Content-Type: "application/json",
PSU-IP-Address: psuIpAddress,
X-BicFi: bic,
X-Request-ID: xRequestID,
```

Result
```javascript
consentStatus = result.consentStatus
```

When `consentStatus` == `"valid"`, the Consent is ready to use for AIS calls.

### 4b. Redirect

First you need to route the user to `redirectLinkToBank`. When the user has authenticated, the bank will route the user back to the URI you replaced `"[TPP_REDIRECT_URI]"` with. Once there, you extract the URL parameters `code` and `scope`.

To finalise the Consent, you make the following request:

#### Endpoint

```javscript
POST authUrl
```

#### Headers

```javascript
Content-Type: "application/x-www-form-urlencoded",
X-ConsentAuthorisationId: consentAuthorisationID, // from step 2
X-ConsentId: consentID,
```

#### Body

```javascript
{
    client_id: clientID,
    client_secret: clientSecret,
    code: code,
    redirect_uri, // Will be the same value as what you replaced [TPP_REDIRECT_URI] with in the end of step 3.
    scope: scope, 
    grant_type: "authorization_code",
}
```

#### Result
```javascript
accessToken = result.access_token
```

If you receive an access token it means that the request was successful. We recommend that you also do a request to Get Consent Status like in the Decoupled flow to confirm the correct status of the Consent.


## AIS API

When you have a valid Consent for the user, you can make calls to the AIS endpoints to get the user's account and transaction data.

### 1. Get Account List

#### Endpoint

```javascript
GET /psd2/accountinformation/v1/accounts
```

#### Headers

```javascript
Accept: "application/json",
Authorization: "Bearer " + accessToken,
Consent-ID: consentID,
Content-Type: "application/json",
X-BicFi: bic,
X-Request-ID: xRequestID,
PSU-IP-Address: psuIpAddress,
```

#### Result

```javascript
accounts = result.data.accounts
```
