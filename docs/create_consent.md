---
id: quickstart_ais
title: Integrate to AIS
sidebar_label: Integrate to AIS
---


This guide demonstrates how to create a consent and let a user authorise it.
[Peter, kan du skriva lite grejer om consent här?]

In step 1 we create a consent. In step 2 and 3 we start an authorisation process for that consent.
Step 1-3 will be executed immediately after one another and need no user input in between, meaning that all three probably will be executed from a single function in your system (Det här suger så hårt men essensen av vad jag vill säga finns där, hur skriva?)
Step 4 describes how to handle the two different SCA flows.

## Prerequisites

For requests to the Consent API, we need an access token for `scope` `"accountinformation private"`.

### Variables and constants used in the guide

| Name         | Description                                                                                                                                                                                                                                                             |
| ------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API_HOST      | The API host. All API calls in this guide except the ones to `AUTH_URL` will be prefixed with this value. For production, use `https://api.openbankingplatform.com`                                                                                                                                                                                                 |
| bic          | Will contain the BIC of the bank that you want to create a consent for.                                                                                                                                                                                                                |
| CLIENT_ID     | The Client ID of the application you created in the Developer Portal.                                                                                                                                                                                                   |
| CLIENT_SECRET | The secret that was generated when you created an application. If you did not save that value, you need to generate a new secret.                                                                                                                                    |
| psuUserAgent | The User-Agent from the user's request.                                                                                                                                                                                                                                 |
| psuIpAddress | The user's IP address                                                                                                                                                                                                                                                   |
| xRequestID   | Most requests require the header `X-Request-ID`, which is a uuid. This will be a unique identifier of your request and will be useful in case you need support. Make sure to create a new GUID for every individual request. In this guide, we assume that you store this value in the variable `xRequestID`. |


### 1. Create Consent
<a href="https://docs.openpayments.io/en/openpayments-NextGenPSD2-1.3.3.html#operation/createConsent" target="_blank">Endpoint details</a>

#### Endpoint
```javascript
POST /psd2/consent/v1/consents
```

#### Request headers

```javascript
Accept: "application/json",
Authorization: ”Bearer ” + accessToken,
Content-Type: "application/json",
X-BicFi: bic,
X-Request-ID: xRequestID,
PSU-IP-Address: psuIpAddress,
PSU-User-Agent: psuUserAgent,
```

#### Request body
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
consentID = response.body.consentId;
```

### 2. Start Consent Authorisation Process
<a href="https://docs.openpayments.io/en/openpayments-NextGenPSD2-1.3.3.html#operation/startConsentAuthorisation" target="_blank">Endpoint details</a>

Next step is to start an authorisation process for this consent.

#### Endpoint

```javascript
POST /psd2/consent/v1/consents/{consentID}/authorisations
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

//Resource identification of the related SCA, 
// will be used in the final step of the Redirect flow.
consentAuthorisationID = response.body.authorisationId;

// URL that will be used in the call to Update PSU Data for Consent (next step).
resource = response.headers.location;
```

### 3. Update PSU Data for Consent
<a href="https://docs.openpayments.io/en/openpayments-NextGenPSD2-1.3.3.html#operation/updateConsentsPsuData" target="_blank">Endpoint details</a>

This request triggers the authentication flow.

#### Endpoint

```javascript
PUT resource
```

#### Request headers

```javascript
Accept: "application/json",
Authorization: "Bearer " + accessToken,
Content-Type: "application/json",
PSU-IP-Address: psuIpAddress,
X-BicFi: bic,
X-Request-ID: xRequestID
```

#### Request body

```javascript
{
    authenticationMethodId: authenticationMethodID
}
```

#### Result

The first thing we need to check in the response is the SCA flow used by the bank (Decoupled or Redirect), which will be extracted from the response headers.

```javascript
// "DECOUPLED" or "REDIRECT"
scaFlow = response.headers.aspsp-sca-approach;
```

We are interested in different values from the response depending on if we got Decoupled or Redirect.

If the SCA flow is Decopled, you need to get the `autoStartToken` for the QR code that your user will scan.

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

In case of Redirect flow, you need to extract the link to our auth server (which in turn will redirect to the bank's external authentication page) and replace the placeholders with the relevant values.

```javascript
redirectLinkToBank = result.body._links.scaOAuth.href
```

Replace the following placeholders in `redirectLinkToBank` in the following way:

`"[CLIENT_ID]"` should be replaced by your `CLIENT_ID`.

`"[TPP_REDIRECT_URI]"` is the URI you want us to redirect to after we get confirmation from the bank that the user has authenticated. This URI has to be whitelisted for your application in the Developer Portal.

`"[TPP_STATE]"` is a convenience field for you to put in anything you want, for example something that identifies this session. It's important that you can identify the correct session after the PSU is redirected back again.

We now have what we need to let the user authenticate.
The flow will now differ completely between Decoupled and Redirect, so the instructions will be separated.

### 4a. Decoupled

If using desktop, you use the `bankIdLink` to generate a QR code that you present in your UI. When the user has successfully authenticated, the status of the Consent will be valid. To know the status of the Consent, you should poll the OPE API endpoint Get Consent Status:

<a href="https://docs.openpayments.io/en/openpayments-NextGenPSD2-1.3.3.html#operation/getConsentStatus" target="_blank">Endpoint details</a>

#### Endpoint

```javascript
GET /psd2/consent/v1/consents/{consentID}/status
```

#### Request headers
```javascript
Accept: "application/json",
Authorization: "Bearer " + accessToken,
Content-Type: "application/json",
PSU-IP-Address: psuIpAddress,
X-BicFi: bic,
X-Request-ID: xRequestID
```

#### Result
```javascript
consentStatus = response.body.consentStatus
```

When `consentStatus` == `"valid"`, the Consent is ready to use for AIS calls.

### 4b. Redirect

First you need to route the user to `redirectLinkToBank`. When the user has authenticated, the bank will route the user back to the URI you replaced `"[TPP_REDIRECT_URI]"` with. Once there, you extract the URL parameters `code` and `scope`.

To finalise the Consent, you make the following request:

#### Endpoint

```javscript
POST AUTH_URL
```

#### Request headers

```javascript
Content-Type: "application/x-www-form-urlencoded",
X-ConsentAuthorisationId: consentAuthorisationID, // from step 2
X-ConsentId: consentID,
```

#### Request body

```javascript
{
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: code,
    redirect_uri: redirectURI, // Will be the same value as what you replaced [TPP_REDIRECT_URI] with in the end of step 3.
    scope: scope, 
    grant_type: "authorization_code",
}
```

#### Result
```javascript
accessToken = response.data.access_token
```

If you receive an access token it means that the request was successful. We recommend that you also do a request to Get Consent Status like in the Decoupled flow to confirm the correct status of the Consent.