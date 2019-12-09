---
id: version-1.0.0-consent-ref
title: Consent API Reference
sidebar_label: Consent API Reference
original_id: consent-ref
---

Open Payments Europe, Open Banking Platform - Consent REST API.

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
|oauth2|*OAuth 2.0*|
|---|---|
|Authorization Endpoint|`[AUTH_HOST]`/connect/authorize|
|Token Endpoint|`[AUTH_HOST]`/connect/token|
|Flow|[Authorization Code Grant](https://tools.ietf.org/html/rfc6749#section-4.1)|
|Scopes|accountinformation|

### Decoupled
|decoupled|BankID|
|---|---|
|||

## Endpoints

### `[API_HOST]`/consents

#### POST
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |
| PSU-ID | header | Client ID of the PSU in the ASPSP client interface. | No | string |
| PSU-ID-Type | header | Type of the PSU-ID, needed in scenarios where PSUs have several PSU-IDs as access possibility. | No | string |
| PSU-Corporate-ID | header | Client ID of the PSU as a corporate in the ASPSP client interface. Only used in a corporate context. | No | string |
| PSU-Corporate-ID-Type | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context. | No | string |
| TPP-Redirect-Preferred | header | If it equals "true", the TPP prefers a redirect over an decoupled SCA approach. If it equals "false", the TPP prefers not to be redirected for SCA. If the parameter is not used, the ASPSP will choose the SCA approach to be applied depending on the SCA method chosen by the TPP/PSU. | No | string |
| TPP-Redirect-URI | header | URI of the TPP, where the transaction flow shall be redirected to after a Redirect. | No | string |
| TPP-Nok-Redirect-URI | header | If this URI is contained, the TPP is asking to redirect the transaction flow to this address instead of the TPP-Redirect-URI in case of a negative result of the redirect SCA method. This might be ignored by the ASPSP. | No | string |
| TPP-Explicit-Authorisation-Preferred | header | Not used. | No | string |
| PSU-IP-Address | header | The forwarded IP address of PSU. | No | string |
| PSU-IP-Port | header | The forwarded IP port of PSU. | No | string |
| PSU-Accept | header | The forwarded IP Accept header fields of PSU. | No | string |
| PSU-Accept-Charset | header | The forwarded IP Accept-Charset header fields of PSU. | No | string |
| PSU-Accept-Encoding | header | The forwarded IP Accept-Encoding header fields of PSU. | No | string |
| PSU-Accept-Language | header | The forwarded IP Accept-Language header fields of PSU. | No | string |
| PSU-User-Agent | header | The forwarded IP User-Agent header fields of PSU. | No | string |
| PSU-Http-Method | header | The forwarded IP Http-Method header fields of PSU. | No | string |
| PSU-Device-ID | header | UUID (Universally Unique Identifier) for a device, which is used by the PSU. | No | string |
| PSU-Geo-Location | header | The forwarded Geo Location of the corresponding http request between PSU and TPP. | No | string |

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
### `[API_HOST]`/consents/{consentId}

#### GET
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| consentId | path | Id of the consent. | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |
| PSU-IP-Address | header | The forwarded IP address of PSU. | No | string |
| PSU-IP-Port | header | The forwarded IP port of PSU. | No | string |
| PSU-Accept | header | The forwarded IP Accept header fields of PSU. | No | string |
| PSU-Accept-Charset | header | The forwarded IP Accept-Charset header fields of PSU. | No | string |
| PSU-Accept-Encoding | header | The forwarded IP Accept-Encoding header fields of PSU. | No | string |
| PSU-Accept-Language | header | The forwarded IP Accept-Language header fields of PSU. | No | string |
| PSU-User-Agent | header | The forwarded IP User-Agent header fields of PSU. | No | string |
| PSU-Http-Method | header | The forwarded IP Http-Method header fields of PSU. | No | string |
| PSU-Device-ID | header | UUID (Universally Unique Identifier) for a device, which is used by the PSU. | No | string |
| PSU-Geo-Location | header | The forwarded Geo Location of the corresponding http request between PSU and TPP. | No | string |

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

#### DELETE
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| consentId | path | Id of the consent. | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |
| PSU-IP-Address | header | The forwarded IP address of PSU. | No | string |
| PSU-IP-Port | header | The forwarded IP port of PSU. | No | string |
| PSU-Accept | header | The forwarded IP Accept header fields of PSU. | No | string |
| PSU-Accept-Charset | header | The forwarded IP Accept-Charset header fields of PSU. | No | string |
| PSU-Accept-Encoding | header | The forwarded IP Accept-Encoding header fields of PSU. | No | string |
| PSU-Accept-Language | header | The forwarded IP Accept-Language header fields of PSU. | No | string |
| PSU-User-Agent | header | The forwarded IP User-Agent header fields of PSU. | No | string |
| PSU-Http-Method | header | The forwarded IP Http-Method header fields of PSU. | No | string |
| PSU-Device-ID | header | UUID (Universally Unique Identifier) for a device, which is used by the PSU. | No | string |
| PSU-Geo-Location | header | The forwarded Geo Location of the corresponding http request between PSU and TPP. | No | string |

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
### `[API_HOST]`/consents/{consentId}/status

#### GET
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| consentId | path | Id of the consent. | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |
| PSU-IP-Address | header | The forwarded IP address of PSU. | No | string |
| PSU-IP-Port | header | The forwarded IP port of PSU. | No | string |
| PSU-Accept | header | The forwarded IP Accept header fields of PSU. | No | string |
| PSU-Accept-Charset | header | The forwarded IP Accept-Charset header fields of PSU. | No | string |
| PSU-Accept-Encoding | header | The forwarded IP Accept-Encoding header fields of PSU. | No | string |
| PSU-Accept-Language | header | The forwarded IP Accept-Language header fields of PSU. | No | string |
| PSU-User-Agent | header | The forwarded IP User-Agent header fields of PSU. | No | string |
| PSU-Http-Method | header | The forwarded IP Http-Method header fields of PSU. | No | string |
| PSU-Device-ID | header | UUID (Universally Unique Identifier) for a device, which is used by the PSU. | No | string |
| PSU-Geo-Location | header | The forwarded Geo Location of the corresponding http request between PSU and TPP. | No | string |

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
### `[API_HOST]`/consents/{consentId}/authorisations

#### POST
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| consentId | path | Id of the consent. | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |
| PSU-IP-Address | header | The forwarded IP address of PSU. | No | string |
| PSU-IP-Port | header | The forwarded IP port of PSU. | No | string |
| PSU-Accept | header | The forwarded IP Accept header fields of PSU. | No | string |
| PSU-Accept-Charset | header | The forwarded IP Accept-Charset header fields of PSU. | No | string |
| PSU-Accept-Encoding | header | The forwarded IP Accept-Encoding header fields of PSU. | No | string |
| PSU-Accept-Language | header | The forwarded IP Accept-Language header fields of PSU. | No | string |
| PSU-User-Agent | header | The forwarded IP User-Agent header fields of PSU. | No | string |
| PSU-Http-Method | header | The forwarded IP Http-Method header fields of PSU. | No | string |
| PSU-Device-ID | header | UUID (Universally Unique Identifier) for a device, which is used by the PSU. | No | string |
| PSU-Geo-Location | header | The forwarded Geo Location of the corresponding http request between PSU and TPP. | No | string |

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

#### GET
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| consentId | path | Id of the consent. | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |
| PSU-IP-Address | header | The forwarded IP address of PSU. | No | string |
| PSU-IP-Port | header | The forwarded IP port of PSU. | No | string |
| PSU-Accept | header | The forwarded IP Accept header fields of PSU. | No | string |
| PSU-Accept-Charset | header | The forwarded IP Accept-Charset header fields of PSU. | No | string |
| PSU-Accept-Encoding | header | The forwarded IP Accept-Encoding header fields of PSU. | No | string |
| PSU-Accept-Language | header | The forwarded IP Accept-Language header fields of PSU. | No | string |
| PSU-User-Agent | header | The forwarded IP User-Agent header fields of PSU. | No | string |
| PSU-Http-Method | header | The forwarded IP Http-Method header fields of PSU. | No | string |
| PSU-Device-ID | header | UUID (Universally Unique Identifier) for a device, which is used by the PSU. | No | string |
| PSU-Geo-Location | header | The forwarded Geo Location of the corresponding http request between PSU and TPP. | No | string |

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
### `[API_HOST]`/consents/{consentId}/authorisations/{authorisationId}

#### GET
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| consentId | path | Id of the consent. | Yes | string |
| authorisationId | path | Id of the authorisation. | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |
| PSU-IP-Address | header | The forwarded IP address of PSU. | No | string |
| PSU-IP-Port | header | The forwarded IP port of PSU. | No | string |
| PSU-Accept | header | The forwarded IP Accept header fields of PSU. | No | string |
| PSU-Accept-Charset | header | The forwarded IP Accept-Charset header fields of PSU. | No | string |
| PSU-Accept-Encoding | header | The forwarded IP Accept-Encoding header fields of PSU. | No | string |
| PSU-Accept-Language | header | The forwarded IP Accept-Language header fields of PSU. | No | string |
| PSU-User-Agent | header | The forwarded IP User-Agent header fields of PSU. | No | string |
| PSU-Http-Method | header | The forwarded IP Http-Method header fields of PSU. | No | string |
| PSU-Device-ID | header | UUID (Universally Unique Identifier) for a device, which is used by the PSU. | No | string |
| PSU-Geo-Location | header | The forwarded Geo Location of the corresponding http request between PSU and TPP. | No | string |

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

#### PUT
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| consentId | path | Id of the consent. | Yes | string |
| authorisationId | path | Id of the authorisation. | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |
| PSU-IP-Address | header | The forwarded IP address of PSU. | No | string |
| PSU-IP-Port | header | The forwarded IP port of PSU. | No | string |
| PSU-Accept | header | The forwarded IP Accept header fields of PSU. | No | string |
| PSU-Accept-Charset | header | The forwarded IP Accept-Charset header fields of PSU. | No | string |
| PSU-Accept-Encoding | header | The forwarded IP Accept-Encoding header fields of PSU. | No | string |
| PSU-Accept-Language | header | The forwarded IP Accept-Language header fields of PSU. | No | string |
| PSU-User-Agent | header | The forwarded IP User-Agent header fields of PSU. | No | string |
| PSU-Http-Method | header | The forwarded IP Http-Method header fields of PSU. | No | string |
| PSU-Device-ID | header | UUID (Universally Unique Identifier) for a device, which is used by the PSU. | No | string |
| PSU-Geo-Location | header | The forwarded Geo Location of the corresponding http request between PSU and TPP. | No | string |

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