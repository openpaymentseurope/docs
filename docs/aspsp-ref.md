---
id: aspsp-ref
title: Account Servicing Payment Service Providers (ASPSP) API Reference
sidebar_label: ASPSP API Reference
---

Open Payments Europe, Open Banking Platform - ASPSP Information REST API.

## Environments
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

## Security
|oauth2|OAuth 2.0|
|---|---|
|Token Endpoint|`[AUTH_HOST]`/connect/token|
|Flow|[Client Credentials Grant](https://tools.ietf.org/html/rfc6749#section-4.4)|
|Scopes|aspspinformation|

## Endpoints

### `[API_HOST]`/aspsps

#### GET
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| isoCountryCodes | query | ISO 3166 ALPHA2 country code. | No | [ string (csv) ] |
| cityIds | query | Comma separated list of cityIDs. | No | [ string (csv) ] |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party.ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 405 | Method not allowed |
| 406 | Not acceptable |
| 408 | Request timeout |
| 409 | Conflict |
| 412 | Precondition Failed |
| 415 | Unsupported media type |
| 429 | Too many requests |
| 500 | Internal server error |
| 503 | Service unavailable |

---
### `[API_HOST]`/aspsps/{bicFi}

#### GET
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| bicFi | path | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party.ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 405 | Method not allowed |
| 406 | Not acceptable |
| 408 | Request timeout |
| 409 | Conflict |
| 412 | Precondition Failed |
| 415 | Unsupported media type |
| 429 | Too many requests |
| 500 | Internal server error |
| 503 | Service unavailable |

---
### `[API_HOST]`/cities

#### GET
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| isoCountryCodes | query | ISO 3166 ALPHA2 country code. | No | [ string (csv) ] |
| cityIds | query | Comma separated list of cityIDs. | No | [ string (csv) ] |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 405 | Method not allowed |
| 406 | Not acceptable |
| 408 | Request timeout |
| 409 | Conflict |
| 412 | Precondition Failed |
| 415 | Unsupported media type |
| 429 | Too many requests |
| 500 | Internal server error |
| 503 | Service unavailable |

---
### `[API_HOST]`/cities/{cityId}

#### GET
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| cityId | path | Id of the city. | Yes | string (uuid) |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party.ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 405 | Method not allowed |
| 406 | Not acceptable |
| 408 | Request timeout |
| 409 | Conflict |
| 412 | Precondition Failed |
| 415 | Unsupported media type |
| 429 | Too many requests |
| 500 | Internal server error |
| 503 | Service unavailable |

---
### `[API_HOST]`/countries

#### GET
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| isoCountryCodes | query | ISO 3166 ALPHA2 country code. | No | [ string (csv) ] |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 405 | Method not allowed |
| 406 | Not acceptable |
| 408 | Request timeout |
| 409 | Conflict |
| 412 | Precondition Failed |
| 415 | Unsupported media type |
| 429 | Too many requests |
| 500 | Internal server error |
| 503 | Service unavailable |

---
### `[API_HOST]`/countries/{isoCountryCode}

#### GET
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| isoCountryCode | path | ISO 3166 ALPHA2 country code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party.ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 405 | Method not allowed |
| 406 | Not acceptable |
| 408 | Request timeout |
| 409 | Conflict |
| 412 | Precondition Failed |
| 415 | Unsupported media type |
| 429 | Too many requests |
| 500 | Internal server error |
| 503 | Service unavailable |