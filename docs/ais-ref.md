---
id: ais-ref
title: Account Information Services (AIS) API Reference
sidebar_label: AIS API Reference
---

Open Payments Europe, Open Banking Platform - Account Information REST API.

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
### Redirect
|oauth2|OAuth 2.0|
|---|---|
|Authorization Endpoint|`[AUTH_HOST]`/connect/authorize|
|Token Endpoint|`[AUTH_HOST]`/connect/token|
|Flow|[Authorization Code Grant](https://tools.ietf.org/html/rfc6749#section-4.1)|
|Scopes|accountinformation|

### Decoupled
|Country|SCA Method Id|
|---|---|
|Sweden|mbid|

## Endpoints

### `[API_HOST]`/accounts

#### GET
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party.ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Consent-ID | header | Id if the created consent. | Yes | string (uuid) |

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
### `[API_HOST]`/accounts/{account-id}

#### GET
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| account-id | path | This identification is denoting the addressed account. The account-id is retrieved by using a "Read Account List" call. | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Consent-ID | header | Id if the created consent. | Yes | string (uuid) |

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
### `[API_HOST]`/accounts/{account-id}/balances

#### GET
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| account-id | path | This identification is denoting the addressed account. The account-id is retrieved by using a "Read Account List" call.| Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Consent-ID | header | Id if the created consent. | Yes | string (uuid) |

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
### `[API_HOST]`/accounts/{account-id}/transactions

#### GET
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| account-id | path | This identification is denoting the addressed account. The account-id is retrieved by using a "Read Account List" call. | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party.ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Consent-ID | header | Id if the created consent. | Yes | string (uuid) |

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
### `[API_HOST]`/accounts/{account-id}/transactions/{resourceId}

#### GET
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| account-id | path | This identification is denoting the addressed account. The account-id is retrieved by using a "Read Account List" call. | Yes | string |
| resourceId | path | Id of the resource. | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party.ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Consent-ID | header | Id if the created consent. | Yes | string (uuid) |

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
