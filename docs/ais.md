---
id: ais
title: How to use the AIS API
sidebar_label: How to use the AIS API
---

This API is used to access information about accounts. Lists of accounts with an ASPSP and the actual transactions for one account. In order to be able to access this API first a consent needs to be acquired. See the [consent tutorial](consent.md) for how that is done.

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


## Acquire an access token for Account Information

Get a token to use for subsequent calls to the API. The scope should be set to `accountinformation`.
```javascript
curl -X POST
    [AUTH_HOST]/connect/token
    -H 'Content-Type: application/x-www-form-urlencoded'
    -d 'client_id=[CLIENT_ID]&client_secret=[CLIENT_SECRET]&scope=accountinformation&grant_type=client_credentials'
```

This post will return a JSON object that looks like this:
```javascript
{
    "access_token": "[ACCESS_TOKEN]",
    "expires_in": 3600,
    "token_type": "Bearer",
    "scope": "accountinformation"
}
```

## Acquire a consent

You'll need a valid consent for the ASPSP you want to interact with.
Follow instructions in [the Consent API](consent.md).

## Read account list
```javascript
curl -X GET
    [API_HOST]/psd2/accountinformation/v1/accounts
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'Content-Type: application/json'
    -H 'PSU-IP-Address: [PSU_IP_Address]'
    -H 'X-BicFi: [BICFI]'
    -H 'X-Request-ID: [GUID]'
    -H 'Consent-ID: [CONSENT_ID]'
```

### Headers

- `PSU-IP-Address` is the IP address of the end user.
- `X-BicFi` the BICFI for the user's ASPSP. Find it in [the ASPSP API](aspsp.md).
- `X-Request-ID` used to verify that the response matches the request.
- `Consent-ID` identification of the corresponding consent as granted by the PSU.

### Response
```javascript
{
    "accounts": [
        {
            "resourceId": "[ACCOUNT_ID]",
            "iban": "[IBAN]",
            "bban": "[BBAN]",
            "currency": "SEK",
            "bic": "[BICFI]"
        }
    ]
}
```

### Response headers

- `X-Request-ID`

## Read account details

Use one of the [ACCOUNT_ID]s to get more information about a specific account.
```javascript
curl -X GET
    [API_HOST]/psd2/accountinformation/v1/accounts/[ACCOUNT_ID]
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'Content-Type: application/json'
    -H 'PSU-IP-Address: [PSU_IP_Address]'
    -H 'X-BicFi: [BICFI]'
    -H 'X-Request-ID: [GUID]'
    -H 'Consent-ID: [CONSENT_ID]'
```

### Headers

See Read account list.

### Path parameter

- `ACCOUNT_ID` Refers to `resourceId` in the response from [Read account list](#read-account-list).

### Query parameters

- `withBalance` Boolean, include balances in response. Optional.

### Response
```javascript
{
    "resourceId": "[ACCOUNT_ID]",
    "iban": "[IBAN]",
    "bban": "[BBAN]",
    "currency": "SEK",
    "cashAccountType": "[CASH_ACCOUNT_TYPE]",
    "status": "enabled",
    "bic": "[BICFI]",
    "usage": "PRIV",
    "balances": [
        {
            "balanceAmount": {
                "currency": "SEK",
                "amount": "33633.25"
            },
            "balanceType": "closingBooked",
            "creditLimitIncluded": false
        },
        {
            "balanceAmount": {
                "currency": "SEK",
                "amount": "33528.25"
            },
            "balanceType": "interimAvailable",
            "creditLimitIncluded": false
        }
    ]
}
```

### Response headers

- `X-Request-ID`

## Read balance

Retreive balances for a given [ACCOUNT_ID].
```javascript
curl -X GET
    [API_HOST]/psd2/accountinformation/v1/accounts/[ACCOUNT_ID]/balances
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'Content-Type: application/json'
    -H 'PSU-IP-Address: [PSU_IP_Address]'
    -H 'X-BicFi: [BICFI]'
    -H 'X-Request-ID: [GUID]'
    -H 'Consent-ID: [CONSENT_ID]'
```

### Headers

See Read account list.

### Path parameter

- `ACCOUNT_ID` refers to `resourceId` in the response from [Read account list](#read-account-list).

### Response
```javascript
{
    "balances": [
        {
            "balanceAmount": {
                "currency": "SEK",
                "amount": "33633.25"
            },
            "balanceType": "closingBooked",
            "creditLimitIncluded": false
        },
        {
            "balanceAmount": {
                "currency": "SEK",
                "amount": "33528.25"
            },
            "balanceType": "interimAvailable",
            "creditLimitIncluded": false
        }
    ]
}
```

### Response headers

- `X-Request-ID`

## Read transaction list

Retreive transactions for a given [ACCOUNT_ID].
```javascript
curl -X GET
    [API_HOST]/psd2/accountinformation/v1/accounts/[ACCOUNT_ID]/transactions?bookingStatus=[BOOKING_STATUS]&dateFrom=[DATE_FROM]
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'Content-Type: application/json'
    -H 'PSU-IP-Address: [PSU_IP_Address]'
    -H 'X-BicFi: [BICFI]'
    -H 'X-Request-ID: [GUID]'
    -H 'Consent-ID: [CONSENT_ID]'
```

### Headers

See Read account list.

### Path parameter

- `ACCOUNT_ID` refers to `resourceId` in the response from [Read account list](#read-account-list).

### Query parameters

- `bookingStatus` booked, pending, both.
- `dateFrom` is a date in `yyyy-MM-dd` format.
- `dateTo` is a date in `yyyy-MM-dd` format. Optional.

### Response
```javascript
{
    "transactions": {
        "booked": [
            {
                "transactionId": "[TRANSACTION_ID]",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "4101.24"
                }
            }
        ],
        "pending": [
            {
                "transactionId": "[TRANSACTION_ID]",
                "transactionAmount": {
                    "currency": "SEK",
                    "amount": "105"
                }
            }
        ],
        "_links": {
            "account": "/psd2/accountinformation/v1/accounts/[ACCOUNT_ID]"
        }
    },
    "balances": []
}
```

### Response headers

- `X-Request-ID`

## Read transaction details

Retreive transaction details for a given [ACCOUNT_ID] and [TRANSACTIONID].
```javascript
curl -X GET
    [API_HOST]/psd2/accountinformation/v1/accounts/[ACCOUNT_ID]/transactions/[TRANSACTIONID]
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'Content-Type: application/json'
    -H 'PSU-IP-Address: [PSU_IP_Address]'
    -H 'X-BicFi: [BICFI]'
    -H 'X-Request-ID: [GUID]'
    -H 'Consent-ID: [CONSENT_ID]'
```

### Headers

See Read account list.

### Path parameter

- `ACCOUNT_ID` refers to `resourceId` in the response from [Read account list](#read-account-list).
- `TRANSACTION_ID` refers to `TRANSACTION_ID` in the response from [Read transaction list of an account](#read-transaction-list).

### Response
```javascript
{
    "transactionId": "[TRANSACTION_ID]",
    "transactionAmount": {
        "currency": "SEK",
        "amount": "4101.24"
    },
    "creditorAccount": {
        "iban": "[CREDITOR_IBAN]",
        "bban": "[CREDITOR_BBAN]"
    },
    "debtorAccount": {
        "iban": "[DEBTOR_IBAN]",
        "bban": "[DEBTOR_BBAN]"
    },
    "remittanceInformationUnstructured": "Short msg",
    "purposeCode": "OTHR"
}
```

### Response headers

- `X-Request-ID`

## Schemas

### Account status

`status` for an account can be one of the following values:

- enabled
- deleted
- blocked

### Account usage

`usage` for an acounnt Can be one of the following values:

- PRIV
- ORGA

### Balance type

`balanceType` can be one of the following values:

- closingBooked
- expected
- authorised
- openingBooked
- interimAvailable
- interimBooked
- forwardAvailable
- nonInvoiced

### Purpose code

`purposeCode` values for transactions can be found in the ISO 20022 External Code List ExternalCodeSets_1Q2018 June 2018.