---
id: pis-ref
title: Payment Initiation Services (PIS) API Reference
sidebar_label: PIS API Reference
---

Open Payments Europe, Open Banking Platform - Payment Initiation REST API.

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
|Scopes|paymentinitiation|

### Decoupled
|Country|SCA Method Id|
|---|---|
|Sweden|mbid|

## Endpoints
### Payment Services
Any of the following `{payment-service}` can be used in the URL of the endpoint:
|Payment Service|Description|
|---|---|
|payments| A single payment initiation request. |
|periodic-payments| Create a standing order initiation resource for recurrent i.e. periodic payments. *`Not yet implemented`*|
|bulk-paments|A collection of several payment iniatiation requests. *`Not yet implemented`*|

### Payment Products
Any of the following `{payment-product}` can be used in the URL of the endpoint:
|Payment Product|Description|
|---|---|
|sepa-credit-transfers| SEPA credit transfer. |
|instant-sepa-credit-transfers| Instant SEPA credit transfer. *`Not yet implemented`*|
|cross-border-credit-transfers| International credit transder. *`Not yet implemented`*|

---
### `[API_HOST]`/{payment-service}/{payment-product}

#### POST
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| payment-service | path | See [Payment Services](#payment-services). | Yes | string |
| payment-product | path | See [Payment Products](#payment-products). | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Consent-ID | header | Id if the created consent. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |
| PSU-ID | header | Client ID of the PSU in the ASPSP client interface. | No | string |
| PSU-ID-Type | header | Type of the PSU-ID, needed in scenarios where PSUs have several PSU-IDs as access possibility. | No | string |
| PSU-Corporate-ID | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context.Client ID of the PSU as a corporate in the ASPSP client interface. Only used in a corporate context. | No | string |
| PSU-Corporate-ID-Type | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context. | No | string |
| PSU-IP-Address | header | The forwarded IP address of PSU. | Yes | string |
| TPP-Redirect-Preferred | header | If it equals "true", the TPP prefers a redirect over an decoupled SCA approach. If it equals "false", the TPP prefers not to be redirected for SCA. If the parameter is not used, the ASPSP will choose the SCA approach to be applied depending on the SCA method chosen by the TPP/PSU. | No | string |
| TPP-Redirect-URI | header | URI of the TPP, where the transaction flow shall be redirected to after a Redirect. | No | string |
| TPP-Nok-Redirect-URI | header | If this URI is contained, the TPP is asking to redirect the transaction flow to this address instead of the TPP-Redirect-URI in case of a negative result of the redirect SCA method. This might be ignored by the ASPSP. | No | string |
| TPP-Explicit-Authorisation-Preferred | header | Not used. | No | string |
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
| 201 |  Created |
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
### `[API_HOST]`/{payment-service}/{payment-product}/{paymentId}

#### GET
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| payment-service | path | See [Payment Services](#payment-services). | Yes | string |
| payment-product | path | See [Payment Products](#payment-products). | Yes | string |
| paymentId | path | Id of the payment. | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Consent-ID | header | Id if the created consent. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |
| PSU-ID | header | Client ID of the PSU in the ASPSP client interface. | No | string |
| PSU-ID-Type | header | Type of the PSU-ID, needed in scenarios where PSUs have several PSU-IDs as access possibility. | No | string |
| PSU-Corporate-ID | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context.Client ID of the PSU as a corporate in the ASPSP client interface. Only used in a corporate context. | No | string |
| PSU-Corporate-ID-Type | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context. | No | string |
| PSU-IP-Address | header | The forwarded IP address of PSU. | No | string |
| TPP-Redirect-Preferred | header | If it equals "true", the TPP prefers a redirect over an decoupled SCA approach. If it equals "false", the TPP prefers not to be redirected for SCA. If the parameter is not used, the ASPSP will choose the SCA approach to be applied depending on the SCA method chosen by the TPP/PSU. | No | string |
| TPP-Redirect-URI | header | URI of the TPP, where the transaction flow shall be redirected to after a Redirect. | No | string |
| TPP-Nok-Redirect-URI | header | If this URI is contained, the TPP is asking to redirect the transaction flow to this address instead of the TPP-Redirect-URI in case of a negative result of the redirect SCA method. This might be ignored by the ASPSP. | No | string |
| TPP-Explicit-Authorisation-Preferred | header | Not used. | No | string |
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
| 200 | Ok |
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
| payment-service | path | See [Payment Services](#payment-services). | Yes | string |
| payment-product | path | See [Payment Products](#payment-products). | Yes | string |
| paymentId | path | Id of the payment. | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Consent-ID | header | Id if the created consent. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |
| PSU-ID | header | Client ID of the PSU in the ASPSP client interface. | No | string |
| PSU-ID-Type | header | Type of the PSU-ID, needed in scenarios where PSUs have several PSU-IDs as access possibility. | No | string |
| PSU-Corporate-ID | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context.Client ID of the PSU as a corporate in the ASPSP client interface. Only used in a corporate context. | No | string |
| PSU-Corporate-ID-Type | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context. | No | string |
| PSU-IP-Address | header | The forwarded IP address of PSU. | No | string |
| TPP-Redirect-Preferred | header | If it equals "true", the TPP prefers a redirect over an decoupled SCA approach. If it equals "false", the TPP prefers not to be redirected for SCA. If the parameter is not used, the ASPSP will choose the SCA approach to be applied depending on the SCA method chosen by the TPP/PSU. | No | string |
| TPP-Redirect-URI | header | URI of the TPP, where the transaction flow shall be redirected to after a Redirect. | No | string |
| TPP-Nok-Redirect-URI | header | If this URI is contained, the TPP is asking to redirect the transaction flow to this address instead of the TPP-Redirect-URI in case of a negative result of the redirect SCA method. This might be ignored by the ASPSP. | No | string |
| TPP-Explicit-Authorisation-Preferred | header | Not used. | No | string |
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
| 200 | Ok |
| 202 | Received |
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
### `[API_HOST]`/{payment-service}/{payment-product}/{paymentId}/status

#### GET
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| payment-service | path | See [Payment Services](#payment-services). | Yes | string |
| payment-product | path | See [Payment Products](#payment-products). | Yes | string |
| paymentId | path | Id of the payment. | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Consent-ID | header | Id if the created consent. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |
| PSU-ID | header | Client ID of the PSU in the ASPSP client interface. | No | string |
| PSU-ID-Type | header | Type of the PSU-ID, needed in scenarios where PSUs have several PSU-IDs as access possibility. | No | string |
| PSU-Corporate-ID | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context.Client ID of the PSU as a corporate in the ASPSP client interface. Only used in a corporate context. | No | string |
| PSU-Corporate-ID-Type | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context. | No | string |
| PSU-IP-Address | header | The forwarded IP address of PSU. | No | string |
| TPP-Redirect-Preferred | header | If it equals "true", the TPP prefers a redirect over an decoupled SCA approach. If it equals "false", the TPP prefers not to be redirected for SCA. If the parameter is not used, the ASPSP will choose the SCA approach to be applied depending on the SCA method chosen by the TPP/PSU. | No | string |
| TPP-Redirect-URI | header | URI of the TPP, where the transaction flow shall be redirected to after a Redirect. | No | string |
| TPP-Nok-Redirect-URI | header | If this URI is contained, the TPP is asking to redirect the transaction flow to this address instead of the TPP-Redirect-URI in case of a negative result of the redirect SCA method. This might be ignored by the ASPSP. | No | string |
| TPP-Explicit-Authorisation-Preferred | header | Not used. | No | string |
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
| 200 | Ok |
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
### `[API_HOST]`/{payment-service}/{payment-product}/{paymentId}/authorisations

#### POST
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| payment-service | path | See [Payment Services](#payment-services). | Yes | string |
| payment-product | path | See [Payment Products](#payment-products). | Yes | string |
| paymentId | path | Id of the payment. | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Consent-ID | header | Id if the created consent.Id if the created consent. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |
| PSU-ID | header | Client ID of the PSU in the ASPSP client interface. | No | string |
| PSU-ID-Type | header | Type of the PSU-ID, needed in scenarios where PSUs have several PSU-IDs as access possibility. | No | string |
| PSU-Corporate-ID | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context.Client ID of the PSU as a corporate in the ASPSP client interface. Only used in a corporate context. | No | string |
| PSU-Corporate-ID-Type | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context. | No | string |
| PSU-IP-Address | header | The forwarded IP address of PSU. | No | string |
| TPP-Redirect-Preferred | header | If it equals "true", the TPP prefers a redirect over an decoupled SCA approach. If it equals "false", the TPP prefers not to be redirected for SCA. If the parameter is not used, the ASPSP will choose the SCA approach to be applied depending on the SCA method chosen by the TPP/PSU. | No | string |
| TPP-Redirect-URI | header | URI of the TPP, where the transaction flow shall be redirected to after a Redirect. | No | string |
| TPP-Nok-Redirect-URI | header | If this URI is contained, the TPP is asking to redirect the transaction flow to this address instead of the TPP-Redirect-URI in case of a negative result of the redirect SCA method. This might be ignored by the ASPSP. | No | string |
| TPP-Explicit-Authorisation-Preferred | header | Not used. | No | string |
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
| 201 | Created |
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
| payment-service | path | See [Payment Services](#payment-services). | Yes | string |
| payment-product | path | See [Payment Products](#payment-products). | Yes | string |
| paymentId | path | Id of the payment. | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Consent-ID | header | Id if the created consent. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |
| PSU-ID | header | Client ID of the PSU in the ASPSP client interface. | No | string |
| PSU-ID-Type | header | Type of the PSU-ID, needed in scenarios where PSUs have several PSU-IDs as access possibility. | No | string |
| PSU-Corporate-ID | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context.Client ID of the PSU as a corporate in the ASPSP client interface. Only used in a corporate context. | No | string |
| PSU-Corporate-ID-Type | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context. | No | string |
| PSU-IP-Address | header | The forwarded IP address of PSU. | No | string |
| TPP-Redirect-Preferred | header | If it equals "true", the TPP prefers a redirect over an decoupled SCA approach. If it equals "false", the TPP prefers not to be redirected for SCA. If the parameter is not used, the ASPSP will choose the SCA approach to be applied depending on the SCA method chosen by the TPP/PSU. | No | string |
| TPP-Redirect-URI | header | URI of the TPP, where the transaction flow shall be redirected to after a Redirect. | No | string |
| TPP-Nok-Redirect-URI | header | If this URI is contained, the TPP is asking to redirect the transaction flow to this address instead of the TPP-Redirect-URI in case of a negative result of the redirect SCA method. This might be ignored by the ASPSP. | No | string |
| TPP-Explicit-Authorisation-Preferred | header | Not used. | No | string |
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
| 200 | Ok |
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
### `[API_HOST]`/{payment-service}/{payment-product}/{paymentId}/authorisations/{authorisationId}

#### GET
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| payment-service | path | See [Payment Services](#payment-services). | Yes | string |
| payment-product | path | See [Payment Products](#payment-products). | Yes | string |
| paymentId | path | Id of the payment. | Yes | string |
| authorisationId | path | Id of the authorisation. | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Consent-ID | header | Id if the created consent. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |
| PSU-ID | header | Client ID of the PSU in the ASPSP client interface. | No | string |
| PSU-ID-Type | header | Type of the PSU-ID, needed in scenarios where PSUs have several PSU-IDs as access possibility. | No | string |
| PSU-Corporate-ID | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context.Client ID of the PSU as a corporate in the ASPSP client interface. Only used in a corporate context. | No | string |
| PSU-Corporate-ID-Type | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context. | No | string |
| PSU-IP-Address | header | The forwarded IP address of PSU. | No | string |
| TPP-Redirect-Preferred | header | If it equals "true", the TPP prefers a redirect over an decoupled SCA approach. If it equals "false", the TPP prefers not to be redirected for SCA. If the parameter is not used, the ASPSP will choose the SCA approach to be applied depending on the SCA method chosen by the TPP/PSU. | No | string |
| TPP-Redirect-URI | header | URI of the TPP, where the transaction flow shall be redirected to after a Redirect. | No | string |
| TPP-Nok-Redirect-URI | header | If this URI is contained, the TPP is asking to redirect the transaction flow to this address instead of the TPP-Redirect-URI in case of a negative result of the redirect SCA method. This might be ignored by the ASPSP. | No | string |
| TPP-Explicit-Authorisation-Preferred | header | Not used. | No | string |
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
| 200 | Ok |
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
| payment-service | path | See [Payment Services](#payment-services). | Yes | string |
| payment-product | path | See [Payment Products](#payment-products). | Yes | string |
| paymentId | path | Id of the payment. | Yes | string |
| authorisationId | path | Id of the authorisation. | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Consent-ID | header | Id if the created consent. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |
| PSU-ID | header | Client ID of the PSU in the ASPSP client interface. | No | string |
| PSU-ID-Type | header | Type of the PSU-ID, needed in scenarios where PSUs have several PSU-IDs as access possibility. | No | string |
| PSU-Corporate-ID | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context.Client ID of the PSU as a corporate in the ASPSP client interface. Only used in a corporate context. | No | string |
| PSU-Corporate-ID-Type | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context. | No | string |
| PSU-IP-Address | header | The forwarded IP address of PSU. | No | string |
| TPP-Redirect-Preferred | header | If it equals "true", the TPP prefers a redirect over an decoupled SCA approach. If it equals "false", the TPP prefers not to be redirected for SCA. If the parameter is not used, the ASPSP will choose the SCA approach to be applied depending on the SCA method chosen by the TPP/PSU. | No | string |
| TPP-Redirect-URI | header | URI of the TPP, where the transaction flow shall be redirected to after a Redirect. | No | string |
| TPP-Nok-Redirect-URI | header | If this URI is contained, the TPP is asking to redirect the transaction flow to this address instead of the TPP-Redirect-URI in case of a negative result of the redirect SCA method. This might be ignored by the ASPSP. | No | string |
| TPP-Explicit-Authorisation-Preferred | header | Not used. | No | string |
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
| 200 | Ok |
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
### `[API_HOST]`/{payment-service}/{payment-product}/{paymentId}/cancellation-authorisations

#### POST
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| payment-service | path | See [Payment Services](#payment-services). | Yes | string |
| payment-product | path | See [Payment Products](#payment-products). | Yes | string |
| paymentId | path | Id of the payment. | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Consent-ID | header | Id if the created consent. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |
| PSU-ID | header | Client ID of the PSU in the ASPSP client interface. | No | string |
| PSU-ID-Type | header | Type of the PSU-ID, needed in scenarios where PSUs have several PSU-IDs as access possibility. | No | string |
| PSU-Corporate-ID | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context.Client ID of the PSU as a corporate in the ASPSP client interface. Only used in a corporate context. | No | string |
| PSU-Corporate-ID-Type | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context. | No | string |
| PSU-IP-Address | header | The forwarded IP address of PSU. | No | string |
| TPP-Redirect-Preferred | header | If it equals "true", the TPP prefers a redirect over an decoupled SCA approach. If it equals "false", the TPP prefers not to be redirected for SCA. If the parameter is not used, the ASPSP will choose the SCA approach to be applied depending on the SCA method chosen by the TPP/PSU. | No | string |
| TPP-Redirect-URI | header | URI of the TPP, where the transaction flow shall be redirected to after a Redirect. | No | string |
| TPP-Nok-Redirect-URI | header | If this URI is contained, the TPP is asking to redirect the transaction flow to this address instead of the TPP-Redirect-URI in case of a negative result of the redirect SCA method. This might be ignored by the ASPSP. | No | string |
| TPP-Explicit-Authorisation-Preferred | header | Not used. | No | string |
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
| 201 | Ok |
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
| payment-service | path | See [Payment Services](#payment-services). | Yes | string |
| payment-product | path | See [Payment Products](#payment-products). | Yes | string |
| paymentId | path | Id of the payment. | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Consent-ID | header | Id if the created consent. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |
| PSU-ID | header | Client ID of the PSU in the ASPSP client interface. | No | string |
| PSU-ID-Type | header | Type of the PSU-ID, needed in scenarios where PSUs have several PSU-IDs as access possibility. | No | string |
| PSU-Corporate-ID | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context.Client ID of the PSU as a corporate in the ASPSP client interface. Only used in a corporate context. | No | string |
| PSU-Corporate-ID-Type | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context. | No | string |
| PSU-IP-Address | header | The forwarded IP address of PSU. | No | string |
| TPP-Redirect-Preferred | header | If it equals "true", the TPP prefers a redirect over an decoupled SCA approach. If it equals "false", the TPP prefers not to be redirected for SCA. If the parameter is not used, the ASPSP will choose the SCA approach to be applied depending on the SCA method chosen by the TPP/PSU. | No | string |
| TPP-Redirect-URI | header | URI of the TPP, where the transaction flow shall be redirected to after a Redirect. | No | string |
| TPP-Nok-Redirect-URI | header | If this URI is contained, the TPP is asking to redirect the transaction flow to this address instead of the TPP-Redirect-URI in case of a negative result of the redirect SCA method. This might be ignored by the ASPSP. | No | string |
| TPP-Explicit-Authorisation-Preferred | header | Not used. | No | string |
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
| 200 | Ok |
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
### `[API_HOST]`/{payment-service}/{payment-product}/{paymentId}/cancellation-authorisations/{cancellationId}

#### GET
##### Parameters

| Name | Location | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| payment-service | path | See [Payment Services](#payment-services). | Yes | string |
| payment-product | path | See [Payment Products](#payment-products). | Yes | string |
| paymentId | path | Id of the payment. | Yes | string |
| cancellationId | path | Id of cancellation. | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Consent-ID | header | Id if the created consent. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |
| PSU-ID | header | Client ID of the PSU in the ASPSP client interface. | No | string |
| PSU-ID-Type | header | Type of the PSU-ID, needed in scenarios where PSUs have several PSU-IDs as access possibility. | No | string |
| PSU-Corporate-ID | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context.Client ID of the PSU as a corporate in the ASPSP client interface. Only used in a corporate context. | No | string |
| PSU-Corporate-ID-Type | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context. | No | string |
| PSU-IP-Address | header | The forwarded IP address of PSU. | No | string |
| TPP-Redirect-Preferred | header | If it equals "true", the TPP prefers a redirect over an decoupled SCA approach. If it equals "false", the TPP prefers not to be redirected for SCA. If the parameter is not used, the ASPSP will choose the SCA approach to be applied depending on the SCA method chosen by the TPP/PSU. | No | string |
| TPP-Redirect-URI | header | URI of the TPP, where the transaction flow shall be redirected to after a Redirect. | No | string |
| TPP-Nok-Redirect-URI | header | If this URI is contained, the TPP is asking to redirect the transaction flow to this address instead of the TPP-Redirect-URI in case of a negative result of the redirect SCA method. This might be ignored by the ASPSP. | No | string |
| TPP-Explicit-Authorisation-Preferred | header | Not used. | No | string |
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
| 200 | Ok |
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
| payment-service | path | See [Payment Services](#payment-services). | Yes | string |
| payment-product | path | See [Payment Products](#payment-products). | Yes | string |
| paymentId | path | Id of the payment. | Yes | string |
| cancellationId | path | Id of cancellation. | Yes | string |
| X-BicFi | header | Bank Identifier Code. | Yes | string |
| X-Request-ID | header | ID of the request, unique to the call, as determined by the initiating party. | Yes | string (uuid) |
| Consent-ID | header | Id if the created consent. | Yes | string (uuid) |
| Digest | header | Is contained if and only if the "Signature" element is contained in the header of the request. | No | string |
| Signature | header | A signature of the request on application level. | No | string |
| TPP-Signature-Certificate | header | The certificate used for signing the request, in base64 encoding. Must be contained if a signature is contained. | No | string |
| PSU-ID | header | Client ID of the PSU in the ASPSP client interface. | No | string |
| PSU-ID-Type | header | Type of the PSU-ID, needed in scenarios where PSUs have several PSU-IDs as access possibility. | No | string |
| PSU-Corporate-ID | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context.Client ID of the PSU as a corporate in the ASPSP client interface. Only used in a corporate context. | No | string |
| PSU-Corporate-ID-Type | header | Type of the PSU-ID as a corporate, needed in scenarios where PSUs have several PSU-IDs as access possibility. Only used in a corporate context. | No | string |
| PSU-IP-Address | header | The forwarded IP address of PSU. | No | string |
| TPP-Redirect-Preferred | header | If it equals "true", the TPP prefers a redirect over an decoupled SCA approach. If it equals "false", the TPP prefers not to be redirected for SCA. If the parameter is not used, the ASPSP will choose the SCA approach to be applied depending on the SCA method chosen by the TPP/PSU. | No | string |
| TPP-Redirect-URI | header | URI of the TPP, where the transaction flow shall be redirected to after a Redirect. | No | string |
| TPP-Nok-Redirect-URI | header | If this URI is contained, the TPP is asking to redirect the transaction flow to this address instead of the TPP-Redirect-URI in case of a negative result of the redirect SCA method. This might be ignored by the ASPSP. | No | string |
| TPP-Explicit-Authorisation-Preferred | header | Not used. | No | string |
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
| 200 | Ok |
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
