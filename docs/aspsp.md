---
id: aspsp
title: How to use the ASPSP API
sidebar_label: How to use the ASPSP API
---

This API is used to retreive information about supported Account Servicing Payment Service Providers (ASPSP) that Open Payments Platform currently support. You will also get information about the specific ASPSP that will be used to call the other APIs.

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

## Account Servicing Payment Service Provider (ASPSP) Flow
![PlantUML model](/img/aspsp.svg)

## Acquire an access token for ASPSP Information
```javascript
curl -X POST
    [AUTH_HOST]/connect/token
    -H 'Content-Type: application/x-www-form-urlencoded'
    -d 'client_id=[CLIENT_ID]&client_secret=[CLIENT_SECRET]&scope=aspspinformation private&grant_type=client_credentials'
```

This post will return a JSON object that looks like this:
```javascript
{
    "access_token": "[ACCESS_TOKEN]",
    "expires_in": 3600,
    "token_type": "Bearer",
    "scope": "aspspinformation private"
}
```

Bring the ACCESS_TOKEN forward to subsequent calls.

## Get Country List
```javascript
curl -X GET
    [API_HOST]/psd2/aspspinformation/v1/countries
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'X-Request-ID: [GUID]'
```

### Query parameters

- `isoCountryCodes` a comma separated list of countries to retrieve. Optional.

### Response
```javascript
{
    "countries": [
        {
            "isoCountryCode": "SE",
            "name": "Sweden"
        },
        {
            "isoCountryCode": "FI",
            "name": "Finland"
        }
    ]
}
```

Where the country code and name will be according to the ISO 3166-1 alpha-2 standard.

## Get Country Details
```javascript
curl -X GET \
    [API_HOST]/psd2/aspspinformation/v1/countries/[COUNTRY_CODE]
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'X-Request-ID: 6ff9e7ee-2ac2-42d3-a188-c7314d434b9c'
```

### Path parameter

The `COUNTRY_CODE` parameter should be one of the codes in the ISO 3166-1 alpha-2 standard.

### Response
```javascript
{
    "isoCountryCode": "SE",
    "name": "Sweden"
}
```

This is exactly the same as in the country list.

## Get City List
```javascript
curl -X GET
    [API_HOST]/psd2/aspspinformation/v1/cities
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'X-Request-ID: [GUID]'
```

### Query parameters

- `isoCountryCodes` a comma separated list of countries to retrieve cities for. Optional.
- `cityIds` a comma separated list of city ids to retrieve. Optional.

The service will return all matches for the queries. So querying for `SE` and `ba9dd929-1408-33a6-3ce2-bc45fcfaaa5c` will result in both Stockholm and Helsinki being returned.

### Response
```javascript
{
    "cities": [
        {
            "cityId": "37efa883-c8ad-4ff7-927b-b11b02beb923",
            "name": "Stockholm",
            "isoCountryCode": "SE"
        },
        {
            "cityId": "ba9dd929-1408-33a6-3ce2-bc45fcfaaa5c",
            "name": "Helsinki",
            "isoCountryCode": "FI"
        }
    ]
}
```

## Get City Details
```javascript
curl -X GET
    [API_HOST]/psd2/aspspinformation/v1/cities/[CITY_ID]
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'X-Request-ID: [GUID]'
```

### Path parameter

`CITY_ID` should be one of the ids returned from the "get cities" endpoint.

### Response
```javascript
{
    "cityId": "37efa883-c8ad-4ff7-927b-b11b02beb923",
    "name": "Stockholm",
    "isoCountryCode": "SE"
}
```

This is exactly as one item in the list returned from the "get cities" endpoint.

## Get ASPSP List
```javascript
curl -X GET
    [API_HOST]/psd2/aspspinformation/v1/aspsps
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'X-Request-ID: [GUID]'
```

### Query parameters

- `isoCountryCodes` a comma separated list of countries to retrieve ASPSPs for. Optional.
- `cityIds` a comma separated list of city ids to retrieve ASPSPs for. Optional.

The service will return all matches for the queries. So it is possible to get all ASPSPs in Sweden and Helsinki by sending in the country code for Sweden and the city id for Helsinki.

### Response
```javascript
{
    "aspsps": [
        {
            "bicFi": "ESSESESS",
            "name": "Skandinaviska Enskilda Banken AB ",
            "logoUrl": "https://openbankingplatform.blob.core.windows.net/image/ESSESESS.png"
        },
        {
            "bicFi": "NDEASESS",
            "name": "Nordea Bank AB",
            "logoUrl": "https://openbankingplatform.blob.core.windows.net/image/NDEASESS.png"
        },
        {
            "bicFi": "HANDSESS",
            "name": "Handelsbanken",
            "logoUrl": "https://openbankingplatform.blob.core.windows.net/image/HANDSESS.png"
        }
    ]
}
```

## Get ASPSP Details
```javascript
curl -X GET
    [API_HOST]/psd2/aspspinformation/v1/aspsps/[BICFI]
    -H 'Authorization: Bearer [ACCESS_TOKEN]'
    -H 'X-Request-ID: [GUID]'
```

### Path parameter

- `BICFI` ASPSP identifier. It can be known upfront or it can be picked from the previous response.

### Response
```javascript
{
    "city": "Stockholm",
    "country": "Sweden",
    "postalCode": "106 40",
    "streetAddress": "Kungsträdgårdsgatan 8",
    "companyNumber": "502032-9081",
    "phone": "+46-771 365 365",
    "websiteUrl": "https://seb.se/",
    "globalPaymentProducts": [
        "sepa-credit-transfers",
        "domestic",
        "international"
    ],
    "paymentProducts": [
        "swedish-domestic-private-own-accounts-transfers",
        "swedish-domestic-private-bankgiros",
        "swedish-domestic-private-plusgiros",
        "high-value-credit-transfers",
        "se-domestic-credit-transfers"
    ],
    "supportedAuthorizationMethods": [
        {
            "name": "OAuth2",
            "uri": "https://auth.sandbox.openbankingplatform.com/.well-known/openid-configuration"
        }
    ],
    "bicFi": "ESSESESS",
    "name": "Skandinaviska Enskilda Banken AB ",
    "logoUrl": "https://opeopenbanking.blob.core.windows.net/images/ESSESESS.jpg"
}
```

This result contains contact details for the bank and information about how to access its services through Open Payments API.

The list of **global payment products** is generic payments products that we support for all banks (where it makes sense). In this case the swedish bank SEB has support for domestic payments internally in Sweden and sepa payments on the European market. When using these we have a unified API for payments that work across banks. If you want a no hassle experience where the API towards us always is the same - this is the products to use.

The list of **payment products** is specifically for the bank at hand. When using one of these you have to send payment information in a format the bank will accept. 

Read more about the [payment initiation](pis.md) API.


## Flows of usage

The APIs in this product does not interface directly with the banks but provide information to be able to access banks dynamically. We will add banks continuously and if you get the list of banks from this API you will get access to these new banks automatically without the need to do any coding. 

A typical flow in the system may be like this:
1. the user is presented a list of supported countries
2. the user select a country
3. the system retrieves a list of banks for that country
4. the user selects its bank
5. the system moves on to one of the other APIs to get account information or to initiate a payment
