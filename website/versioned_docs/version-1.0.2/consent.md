---
id: version-1.0.2-consent
title: How to use the Consent API
sidebar_label: How to use the Consent API
original_id: consent
---

This API is used to retreive and manage consent for accessing account information on behalf of a banks customer. If you are new to Open Payments API it is probably best to read a bit about how the APIs work in the [ASPSP tutorial](aspsp.md).

## Hosts

Available `AUTH_HOST` values
| Environment | URL |
| --- | --- |
| Sandbox | https://auth.sandbox.openbankingplatform.com |
| Production | https://auth.openbankingplatform.com |

Available `API_HOST` values
| Environment | URL |
| --- | --- |
| Sandbox | https://api.sandbox.openbankingplatform.com |
| Production | https://api.openbankingplatform.com |

## Consent Flow
![PlantUML model](/img/consent.svg)

## Acquire an access token for Account Information
```javascript
curl -X POST
    [AUTH_HOST]/connect/token
    -H 'Content-Type: application/x-www-form-urlencoded'
    -d 'client_id=[CLIENT_ID]&client_secret=[CLIENT_SECRET]&scope=accountinformation&grant_type=client_credentials'
```

If you have looked at the ASPSP tutorial you will notice that this is similar. The only difference is the `scope` that you get the token for. Here it should be set to `accountinformation`.

This post will return a JSON object that looks like this:
```javascript
{
    "access_token": "[ACCESS_TOKEN]",
    "expires_in": 3600,
    "token_type": "Bearer",
    "scope": "accountinformation"
}
```

## Create Consent

This endpoint is used to initiate the consent process with a request for consent.
```javascript
curl -X POST
    [API_HOST]/psd2/consent/v1/consents
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'Content-Type: application/json'
    -H 'PSU-IP-Address: [PSU_IP_Address]'
    -H 'X-BicFi: [BICFI]'
    -H 'X-Request-ID: [GUID]'
    -d '{
        "access": {
            "accounts": [
                {
                    "iban": "[CONSENT_IBAN]",
                    "currency": "[CONSENT_CURRENCY]"
                },
                {
                    "iban": "[OTHER_CONSENT_IBAN]",
                    "currency": "[CONSENT_CURRENCY]"
                }
            ],
            "balances": [
                {
                    "iban": "[CONSENT_IBAN]",
                    "currency": "[CONSENT_CURRENCY]"
                }
            ],
            "transactions": [
                {
                    "iban": "[CONSENT_IBAN]",
                    "currency": "[CONSENT_CURRENCY]"
                }
            ]
        },
        "recurringIndicator": [CONSENT_RECURRING_INDICATOR],
        "validUntil": "[yyyy-MM-dd]",
        "frequencyPerDay": [CONSENT_FREQUENCY_PER_DAY],
        "combinedServiceIndicator": [CONSENT_COMBINED_SERVICE_INDICATOR]
    }'
```

### Headers

- `PSU-IP-Address` is the IP address of the end user.
- `X-BicFi` the BICFI for the user's ASPSP. Find it in [the ASPSP API](aspsp.md).
- `X-Request-ID` used to verify that the response matches the request.

### Body description

`access` is a list of data items that consent need to be acquired for. There are three possible things to get consent from:

- `accounts` this is a consent to get access to an account list with some account details needed.
- `balances` this is a consent to get access to balances for accounts.
- `transactions` this is a consent to see all the transactions for accounts.

Each consent request contains `iban` and `currency` (optional). Each consent request can be a list of account ids (ibans).
The `balances` and `transactions` consent request must contain a subset of the accounts listed in `accounts`.

`recurringIndicator` is a boolean that indicates if the consent can be used multiple times or not.
`validUntil` is a date in `yyyy-MM-dd` format.
`frequencyPerDay` is a number indicating the number of usages per day for this consent.
`combinedServiceIndicator` if true this indicates that the session will be used to initate a payment also. It has no practical meaning at this time.

### Response
```javascript
{
    "consentStatus": "received",
    "consentId": "[CONSENT_ID]",
    "scaMethods": [
        {
            "authenticationType": "PUSH_OTP",
            "authenticationMethodId": "[AUTHENTICATION_METHOD_ID]"
        }
    ],
    "_links": {
        "self": {
            "href": "/psd2/consent/v1/consents/[CONSENT_ID]"
        },
        "status": {
            "href": "/psd2/consent/v1/consents/[CONSENT_ID]/status"
        },
        "startAuthorisation": {
            "href": "/psd2/consent/v1/consents/[CONSENT_ID]/authorisations"
        }
    }
}
```

At this point the returned status should always be `received`. All possible values are listed [below](#consent-status).

The list at `scaMethods` typically contains one entry. But in the future it is possible that banks - or our platform here - will support multiple methods.

Authentication type will always be `PUSH_OTP` since that is what the banks we integrate with support. In the future it may change. See [below](#authentication-type) for a list of possible types.

The list of links can be used for further actions on the consent. The `self` one is obviously to retreive the created consent request. The `status` is for accessing the status of the request. And `startAuthorisation`is the next step in the sequence of calls that is needed to get a consent.


### Response headers

- `ASPSP-SCA-Approach` see below for different values.
- `X-Request-ID`


## Get Consent

Once you have a consent you can use the id for that consent to get information about the consent.
```javascript
curl -X GET
    [API_HOST]/psd2/consent/v1/consents/[CONSENT_ID]
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'PSU-IP-Address: [PSU_IP_Address]'
    -H 'X-BicFi: [BICFI]'
    -H 'X-Request-ID: [GUID]'
```

### Headers

See Create consent.

### Path parameter

- `CONSENT_ID` - the id that was returned when the consent was created.

### Response
```javascript
{
    "consentId": "[CONSENT_ID]",
    "access": {
        "accounts": [
            {
                "iban": "[CONSENT_IBAN]",
                "currency": "[CONSENT_CURRENCY]"
            }
        ],
        "balances": [
            {
                "iban": "[CONSENT_IBAN]",
                "currency": "[CONSENT_CURRENCY]"
            }
        ],
        "transactions": [
            {
                "iban": "[CONSENT_IBAN]",
                "currency": "[CONSENT_CURRENCY]"
            }
        ]
    },
    "recurringIndicator": false,
    "validUntil": "2019-10-01",
    "frequencyPerDay": 100,
    "lastActionDate": "2019-05-16",
    "consentStatus": "received"
}
```

This is the exact same body as the one sent in to the create consent request endpoint except that the current status is added.

### Response headers

- `X-Request-ID`

## Delete Consent

A consent request can be deleted with a `DELETE` call.
```javascript
curl -X DELETE
    [API_HOST]/psd2/consent/v1/consents/[CONSENT_ID]
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'PSU-IP-Address: [PSU_IP_Address]'
    -H 'X-BicFi: [BICFI]'
    -H 'X-Request-ID: [GUID]'
```

### Status code

`204 No content`

### Response headers

- `X-Request-ID`


## Get Consent Status

The consent request status is returned as part of the "get consent request" endpoint but it is also possible to use this endpoint to get only the status and nothing else. It is basaically the same call with `status` added at the end to the path.
```javascript
curl -X GET
    [API_HOST]/psd2/consent/v1/consents/[CONSENT_ID]/status
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'PSU-IP-Address: [PSU_IP_Address]'
    -H 'X-BicFi: [BICFI]'
    -H 'X-Request-ID: [GUID]'
```

### Headers

See Create consent.

### Path parameter

- `CONSENT_ID`

### Response
```javascript
{
    "consentStatus": "received"
}
```

See possible values for status [further down](#consent-status).

### Response headers

- `X-Request-ID`

## Start Consent Authorisation Process
```javascript
curl -X POST
    [API_HOST]/psd2/consent/v1/consents/[CONSENT_ID]/authorisations
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'Content-Type: application/json'
    -H 'PSU-IP-Address: [PSU_IP_Address]'
    -H 'X-BicFi: [BICFI]'
    -H 'X-Request-ID: [GUID]'
    -d ''
```

Note that this call does not need a body despite being a `POST`.

### Headers

See Create consent.

### Path parameter

- `CONSENT_ID`

### Response
```javascript
{
    "authorisationId": "[CONSENT_AUTH_ID]",
    "scaMethods": [
        {
            "authenticationType": "PUSH_OTP",
            "authenticationMethodId": "[AUTHENTICATION_METHOD_ID]"
        }
    ],
    "_links": {
        "scaStatus": {
            "href": "/psd2/consent/v1/consents/[CONSENT_ID]/authorisations/[CONSENT_AUTH_ID]"
        },
        "selectAuthenticationMethod": {
            "href": "/psd2/consent/v1/consents/[CONSENT_ID]/authorisations/[CONSENT_AUTH_ID]"
        }
    },
    "scaStatus": "started"
}
```

### Response headers

- `ASPSP-SCA-Approach` - see below for different values.
- `X-Request-ID`

## Get Consent Authorisation Sub-Resources
```javascript
curl -X GET
    [API_HOST]/psd2/consent/v1/consents/[CONSENT_ID]/authorisations
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'PSU-IP-Address: [PSU_IP_Address]'
    -H 'X-BicFi: [BICFI]'
    -H 'X-Request-ID: [GUID]'
```

### Headers

See Create consent.

### Path parameter

- `CONSENT_ID`

### Response
```javascript
{
    "authorisationIds": [
        "[CONSENT_AUTH_ID]"
    ]
}
```

### Response headers

- `X-Request-ID`

## Get Consent Authorisation SCA Status
```javascript
curl -X GET
    [API_HOST]/psd2/consent/v1/consents/[CONSENT_ID]/authorisations/[CONSENT_AUTH_ID]
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'PSU-IP-Address: [PSU_IP_Address]'
    -H 'X-BicFi: [BICFI]'
    -H 'X-Request-ID: [GUID]'
```

### Headers

See Create consent.

### Path parameter

- `CONSENT_ID`
- `CONSENT_AUTH_ID`

### Response
```javascript
{
    "scaStatus": "received"
}
```

### Response headers

`X-Request-ID`

## Update PSU Data for Consent

```javascript
curl -X PUT
    [API_HOST]/psd2/consent/v1/consents/[CONSENT_ID]/authorisations/[CONSENT_AUTH_ID]
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'Content-Type: application/json'
    -H 'PSU-IP-Address: [PSU_IP_Address]'
    -H 'X-BicFi: [BICFI]'
    -H 'X-Request-ID: [GUID]'
    -d '{
        "authenticationMethodId": "[AUTHENTICATION_METHOD_ID]"
    }'
```

### Headers

See Create consent.

### Path parameter

- `CONSENT_ID`
- `CONSENT_AUTH_ID`

### Response headers

- `ASPSP-SCA-Approach` see below for different values.
- `X-Request-ID`

### Response
```javascript
{
    "chosenScaMethod": {
        "authenticationType": "PUSH_OTP",
        "authenticationMethodId": "[AUTHENTICATION_METHOD_ID]"
    },
    "_links": {
        "scaStatus": {
            "href": "/psd2/consent/v1/consents/[CONSENT_ID]/authorisations/[CONSENT_AUTH_ID]"
        },
        "scaOAuth": {
            "href": "[AUTH_HOST]/connect/authorize?client_id=[CLIENT_ID]&scope=accountinformation&response_type=code&redirect_uri=[TPP_REDIRECT_URI]&state=[TPP_STATE]&acr_values=idp:[BICFI]%20consentId:[CONSENT_ID]%20consentAuthorisationId:[CONSENT_AUTH_ID]"
        }
    },
    "psuMessage": "Please confirm with your bank app",
    "scaStatus": "scaMethodSelected"
}
```

### Test procedure

If the ASPSP uses OAuth:
- The above endpoint returns an OAuth authorize URL in the `scoOAuth` field. 
- Replace all the bracketed fields with real values. In your code you will have to replace only the two TPP values.
    - `TPP_REDIRECT_URI` should be the URL to redirect to after auth is completed.
    - `TPP_STATE` can be anything the TPP wants.
    - `BICIFI`
- Run it in a browser. In this case you will get to a page at the ESSESESS sandbox. It may differ for different banks.
- In the page you get to you can use one of the following fake personal numbers:
    - 9311219639
    - 9311219589
    - 8811215477
    - 8811212862
    - 8311211356
- When you submit the data you will be redirected to the `[TPP_REDIRECT_URI]`
- On this URI a `code` param will be added. 
- Use this `code` in the subsequent call when getting the account information token.

Call the OAuth token endpoint to finalize consent flow.

    curl -X POST
        [AUTH_HOST]/connect/token
        -H 'Content-Type: application/x-www-form-urlencoded'
        -H 'X-ConsentAuthorisationId: [CONSENT_AUTH_ID]'
        -H 'X-ConsentId: [CONSENT_ID]'
        -d 'client_id=[CLIENT_ID]&client_secret=[CLIENT_SECRET]&code=[CODE]&redirect_uri=[TPP_REDIRECT_URI]&scope=accountinformation&grant_type=authorization_code'

At this point you are ready to call the account service. Read more in the [account service tutorial](ais.md).


## Schemas

### Consent status

`consentStatus` for a consent can be one of the following values:

- received
- rejected
- valid
- revokedByPsu
- expired
- terminatedByTpp

### Consent authorisation status

`scaStatus` for a consent authorisation can be one of the following values:

- received
- psuIdentified
- psuAuthenticated
- scaMethodSelected
- started
- finalised
- failed
- exempted

### ASPSP-SCA-Approach

This is a response header that describes how to proceed with authentication. 
Can be one of the following values. See the NextGen specs for more details.

- EMBEDDED
- DECOUPLED
- REDIRECT

### Authentication type

`authenticationType` for a consent authorisation can be one of the following values:

- SMS_OTP
- CHIP_OTP
- PHOTO_OTP
- PUSH_OTP

At this point the only type supported by banks are `PUSH_OTP` and how that works is covered by this tutorial. As we move into more markets and cover more different banks this will change and the documentation will be updated.