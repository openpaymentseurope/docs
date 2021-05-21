---
id: version-1.0.18-pis
title: How to use the PIS API
sidebar_label: How to use the PIS API
original_id: pis
---

This API is used to get consent for and initiating payments. Note that the consent from the consent API is only used to access the account information API and that this API has its own consent procedure. (Very similar to the one in the [consent API](consent.md).)

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

## Payment Initiation Services (PIS) Flow
![PlantUML model](/img/pis.svg)

## Acquire an access token for Payment Initiation

Get a token to use for subsequent calls to the API. The scope should be set to `paymentinitiation private` to perform payments from private accounts and `paymentinitiation corporate` for payments originating from corporate accounts.
```javascript
curl -X POST
    [AUTH_HOST]/connect/token
    -H 'Content-Type: application/x-www-form-urlencoded'
    -d 'client_id=[CLIENT_ID]&client_secret=[CLIENT_SECRET]&scope=paymentinitiation private&grant_type=client_credentials'
```

This post will return a JSON object that looks like this:
```javascript
{
    "access_token": "[ACCESS_TOKEN]",
    "expires_in": 3600,
    "token_type": "Bearer"
}
```

## Create Payment Initiation
```javascript
curl -X POST
    [API_HOST]/psd2/paymentinitiation/v1/payments/[PAYMENT_PRODUCT]
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'Content-Type: application/json'
    -H 'PSU-IP-Address: [PSU_IP_ADDRESS]'
    -H 'X-BicFi: [BICFI]'
    -H 'X-Request-ID: [GUID]'
    -d '{
        "instructedAmount":
        {
            "currency": "SEK",
            "amount": "142.66"
        },
        "debtorAccount":
        {
            "iban": "[DEBTOR_IBAN]",
            "currency": "SEK"
        },
        "creditorName": "Enterprise Inc",
        "creditorAccount":
        {
            "iban": "[CREDITOR_IBAN]",
            "currency": "SEK"
        },
        "remittanceInformationUnstructured": "[MESSAGE]"
    }'
```

### Headers

- `PSU-IP-Address` is the IP address of the end user.
- `X-BicFi` the BICFI for the user's ASPSP. Find it in [the ASPSP API](/en/openpayments-NextGenPSD2-1.3.3.html#tag/ASPSP-Information-Service-(ASPSPIS)).
- `X-Request-ID` used to verify that the response matches the request.

### Path parameters

`PAYMENT_PRODUCT` can be one of:

- `domestic` - this is a non-euro payment within one country.
- `sepa-credit-transfers` - this is a EURO payment from one EURO ASPSP to another
- `international` - this is an international payment

The [Get ASPSP Details endpoint](/en/openpayments-NextGenPSD2-1.3.3.html#operation/getASPSPDetails) will tell you what payment products that are availalbe for that ASPSP.

### Response
```javascript
{
    "transactionStatus": "ACTC",
    "paymentId": "[PAYMENT_ID]",
    "_links": {
        "startAuthorisationWithTransactionAuthorisation": {
            "href": "/psd2/paymentinitiation/v1/payments/[PAYMENT_PRODUCT]/[PAYMENT_ID]/authorisations"
        },
        "self": {
            "href": "/psd2/paymentinitiation/v1/payments/[PAYMENT_PRODUCT]/[PAYMENT_ID]"
        },
        "status": {
            "href": "/psd2/paymentinitiation/v1/payments/[PAYMENT_PRODUCT]/[PAYMENT_ID]/status"
        }
    },
    "psuMessage": "Please confirm payment [PAYMENT_ID]"
}
```

### Response headers

`X-Request-ID`

## Get Payment Initiation
```javascript
curl -X GET
    [API_HOST]/psd2/paymentinitiation/v1/payments/[PAYMENT_PRODUCT]/[PAYMENT_ID]
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'PSU-IP-Address: [PSU_IP_ADDRESS]'
    -H 'X-BicFi: [BICFI]'
    -H 'X-Request-ID: [GUID]'
```

### Headers

See [Create Payment Initiation](#create-payment-initiation)

### Path parameters

`PAYMENT_ID` that was returned from the initiation request.

### Response
```javascript
{
    "creditorAgent": "[BICFI]",
    "remittanceInformationUnstructured": "[MESSAGE]",
    "transactionStatus": "ACTC",
    "creditorAccount": {
        "iban": "[CREDITOR_IBAN]",
        "currency": "SEK"
    },
    "creditorName": "Enterprise Inc",
    "debtorAccount": {
        "iban": "[DEBTOR_IBAN]",
        "currency": "SEK"
    },
    "instructedAmount": {
        "currency": "SEK",
        "amount": "142.66"
    }
}
```

### Response headers

`X-Request-ID`


## Cancel Payment Initiation

Not implemented yet.


## Get Payment Initiation Status
```javascript
curl -X GET
    [API_HOST]/psd2/paymentinitiation/v1/payments/[PAYMENT_PRODUCT]/[PAYMENT_ID]/status
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'PSU-IP-Address: [PSU_IP_ADDRESS]'
    -H 'X-BicFi: [BICFI]'
    -H 'X-Request-ID: [GUID]'
```

### Headers

See [Create Payment Initiation](#create-payment-initiation)

### Path parameters

`PAYMENT_ID` that was returned from the initiation request.

### Response
```javascript
{
    "transactionStatus": "ACTC"
}
```

### Response headers

`X-Request-ID`


## Start Payment Initiation Authorisation Process
```javascript
curl -X POST
    [API_HOST]/psd2/paymentinitiation/v1/payments/[PAYMENT_PRODUCT]/[PAYMENT_ID]/authorisations
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'Content-Type: application/json'
    -H 'PSU-IP-Address: [PSU_IP_ADDRESS]'
    -H 'X-BicFi: [BICFI]'
    -H 'X-Request-ID: [GUID]'
    -d ''
```

Note that this call does not need a body.

### Headers

See [Create Payment Initiation](#create-payment-initiation)

### Path parameters

`PAYMENT_ID` that was returned from the initiation request.

### Response
```javascript
{
    "authorisationId": "[PAYMENT_AUTH_ID]",
    "scaStatus": "received",
    "scaMethods": [
        {
            "authenticationType": "PUSH_OTP",
            "authenticationMethodId": "[AUTHENTICATION_METHOD_ID]"
        }
    ],
    "_links": {
        "authoriseTransaction": {
            "href": "/psd2/paymentinitiation/v1/payments/[PAYMENT_PRODUCT]/[PAYMENT_ID]/authorisations/[PAYMENT_AUTH_ID]"
        }
    }
}
```

### Response headers

- `ASPSP-SCA-Approach` - see [below](#aspsp\-sca\-approach) for different values.
- `X-Request-ID`


## Get Payment Initiation Authorisation Sub-Resources

    curl -X GET
        [API_HOST]/psd2/paymentinitiation/v1/payments/[PAYMENT_PRODUCT]/[PAYMENT_ID]/authorisations
        -H 'Authorization: Bearer [ACCESS_TOKEN]'
        -H 'PSU-IP-Address: [PSU_IP_ADDRESS]'
        -H 'X-BicFi: [BICFI]'
        -H 'X-Request-ID: [GUID]'

### Headers

See [Create Payment Initiation](#create-payment-initiation)

### Path parameters

`PAYMENT_ID` that was returned from the initiation request.

### Response
```javascript
{
    "authorisationIds": [
        "[PAYMENT_AUTH_ID"
    ]
}
```

### Response headers

- `X-Request-ID`


## Get Payment Initiation Authorisation SCA Status
```javascript
curl -X GET
    [API_HOST]/psd2/paymentinitiation/v1/payments/[PAYMENT_PRODUCT]/[PAYMENT_ID]/authorisations/[PAYMENT_AUTH_ID]
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'PSU-IP-Address: [PSU_IP_ADDRESS]'
    -H 'X-BicFi: [BICFI]'
    -H 'X-Request-ID: [GUID]'
```

### Headers

See [Create Payment Initiation](#create-payment-initiation)

### Path parameters

`PAYMENT_ID` that was returned from the initiation request.

### Response
```javascript
{
    "scaStatus": "received"
}
```

### Response headers

- `X-Request-ID`

## Update PSU Data for Payment Initiation
```javascript
curl -X PUT
    [API_HOST]/psd2/paymentinitiation/v1/payments/[PAYMENT_PRODUCT]/[PAYMENT_ID]/authorisations/[PAYMENT_AUTH_ID]
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'Content-Type: application/json'
    -H 'PSU-IP-Address: [PSU_IP_ADDRESS]'
    -H 'X-BicFi: [BICFI]'
    -H 'X-Request-ID: [GUID]'
    -d '{
        "authenticationMethodId": "[AUTHENTICATION_METHOD_ID]"
    }'
```

### Headers

See [Create Payment Initiation](#create-payment-initiation)

### Path parameters

`PAYMENT_ID` that was returned from the initiation request.

### Response
```javascript
{
    "chosenScaMethod": {
        "authenticationType": "PUSH_OTP",
        "authenticationMethodId": "[AUTHENTICATION_METHOD_ID]"
    },
    "_links": {
        "scaOAuth": {
            "href": "[AUTH_HOST]/connect/authorize?client_id=[CLIENT_ID]&scope=paymentinitiation%20private&response_type=code&redirect_uri=[TPP_REDIRECT_URI]&state=[TPP_STATE]&acr_values=idp:[BICFI]%20paymentId:[PAYMENT_ID]%20paymentAuthorisationId:[PAYMENT_AUTH_ID]"
        }
    },
    "scaStatus": "scaMethodSelected"
}
```

### Response headers

- `X-Request-ID`
- `ASPSP-SCA-Approach` - see [below](#aspsp\-sca\-approach) for different values.

### Test procedure

If the ASPSP uses OAuth:
- The above endpoint returns an OAuth authorize URL in the `scoOAuth` field. 
- Replace all the bracketed fields with real values. In your code you will have to replace only the two TPP values.
    - `TPP_REDIRECT_URI` should be the URL to redirect to after auth is completed.
    - `TPP_STATE` can be anything the TPP wants.
    - `BICIFI`
- Run it in a browser. Test data may differ for different banks, please see individual docs at [supported banks](banks.md).
- When you submit the data you will be redirected to the `[TPP_REDIRECT_URI]`
- On this URI a `code` param will be added. 
- Use this `code` in the subsequent call when getting the account information token.

Call the OAuth token endpoint to finalize payment.
```javascript
curl -X POST
    [AUTH_HOST]/connect/token
    -H 'Content-Type: application/x-www-form-urlencoded'
    -H 'X-PaymentAuthorisationId: [PAYMENT_AUTH_ID]'
    -H 'X-PaymentId: [PAYMENT_ID]'
    -d 'client_id=[CLIENT_ID]&client_secret=[CLIENT_SECRET]&code=[CODE]&redirect_uri=[TPP_REDIRECT_URI]&scope=paymentinitiation&grant_type=authorization_code'
```

## Schemas

### Transaction status

Read more about the potential values in the NextGen specification.

### ASPSP-SCA-Approach

This is a response header that describes how to proceed with authentication. 
Can be one of the following values. See the NextGen specs for more details.

- EMBEDDED
- DECOUPLED
- REDIRECT

### Payment authorisation status

`scaStatus` for a pyament authorisation can be one of the following values:

- received
- psuIdentified
- psuAuthenticated
- scaMethodSelected
- started
- finalised
- failed
- exempted

### Authentication type

`authenticationType` for a pyament authorisation can be one of the following values:

- SMS_OTP
- CHIP_OTP
- PHOTO_OTP
- PUSH_OTP
