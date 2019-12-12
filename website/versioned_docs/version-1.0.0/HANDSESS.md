---
id: version-1.0.0-handsess
title: Handelsbanken (HANDSESS)
sidebar_label: Handelsbanken
original_id: handsess
---

## Status Highlights

| Status | Product | Comment |
|:---|---|---|
|![](https://img.shields.io/badge/status-important-important.svg)| PIS | For domestic payment, ASPSP require that BBAN is used for both debtor and creditor account and clearing number is given separately|
|![](https://img.shields.io/badge/status-important-important.svg)| Consent, PIS | HTTP header `PSU-ID` is required by ASPSP when starting authorisation process. |
|![](https://img.shields.io/badge/status-important-important.svg)| Consent, AIS, PIS | HTTP header `PSU-IP-Address` is required by ASPSP on a number of services, please see API status comments below |

## Supported SCA Methods
|Environment     |SCA Method | Authentication Method | Comment |
|----------------|----------|--------------|--------------|
|Sandbox         |Decoupled | None   | - Authentication can be done with any PSU id.<br>- Authentication is automatically approved and finalized by ASPSP directly when calling "Start the authorization process.." endpoint. |
|Production      |Decoupled      | Mobilt BankID | - PSU must start the Mobilt BankID app with returned autostarttoken within 30 sec. from when "Start the authorization process.." service was called or SCA will fail.<br>- To properly initiate the Mobilt BankID app, the TPP must construct a link with the the format: `bankid:///?autostarttoken={AUTO_START_TOKEN}&redirect={ANY_REDIRECT_URI}`. The redirect query is mandatory for iOS and optional for Android. The TPP must then tell the PSU to open this link on its mobile or generate a QR code for it and ask the PSU to scan it with the Mobilt BankID app. |

### Sandbox Test Data

* No remarks

## Consent Service

### API Status

|Service  |Sandbox | Comment |Production | Comment |
|---------|:--------:|--------------|:-----------:|------------|
|Create Consent | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Consent | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Delete Consent | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Consent Status | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Start Consent Authorisation Process | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-ID` is required by the ASPSP and must be provided in the form `yyyyMMddNNNN` | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-ID` is required by the ASPSP and must be provided in the form `yyyyMMddNNNN` |
|Get Consent Authorisation Sub-Resources | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Consent Authorisation SCA Status | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Update PSU Data for Consent | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP | ![](https://img.shields.io/badge/status-active-success.svg) | - Header `PSU-IP-Address` is required by the ASPSP |

## Account Information Service

### Transaction Limits

| Transaction History (Private) | Transaction List (Private) | Transaction History (Corporate) | Transaction List (Corporate) |
|---|---|---|---|
| SEK Max. 15 months | Max. 600 transactions delivered in one search | Max. 14 months | For period <= 1 day, Max. 2900 transactions delivered in one search |
| Other currencies Max. 13 months |  |  |  |

### API Status

|Service  |Sandbox |Comment |Production |Comment |
|---------|:--------:|--------------|:-----------:|------------|
|Read Account List | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP |
|Read Account Details | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP |
|Read Balances | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP |
|Read Transaction List | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP |
|Read Transaction Details | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |

## Payment Initiation Service

### Supported Payment Products

| Payment Product | Sandbox | Production |
|---------------------|---|---|
|domestic              | ![](https://img.shields.io/badge/status-active-success.svg) | ![](https://img.shields.io/badge/status-active-success.svg) |
|sepa-credit-transfers | ![](https://img.shields.io/badge/status-in_development-informational.svg) | ![](https://img.shields.io/badge/status-in_development-informational.svg) |
|international         | ![](https://img.shields.io/badge/status-in_development-informational.svg)| ![](https://img.shields.io/badge/status-in_development-informational.svg) |

### API Status

|Service  |Sandbox | Comment |Production | Comment |
|---------|--------------------|---|--------------------|---|
|Create Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) | - For domestic payments BBAN without clearing number must be used for the `debtorAccount`<br>- For domestic payments BBAN without clearing number must be used for the `creditorAccount`, while specifying the clearing number in its own field `creditorAccount.clearingNumber` | ![](https://img.shields.io/badge/status-active-success.svg) | - For domestic payments BBAN without clearing number must be used for the `debtorAccount`<br>- For domestic payments BBAN without clearing number must be used for the `creditorAccount`, while specifying the clearing number in its own field `creditorAccount.clearingNumber` |
|Get Payment Initiation | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Cancel Payment Initiation | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Payment Initiation Status | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP |
|Start Payment Initiation Authorisation Process | ![](https://img.shields.io/badge/status-active-success.svg) | - Header `PSU-IP-Address` is required by the ASPSP<br>- Header `PSU-ID` is required by the ASPSP and must be provided in the form `yyyyMMddNNNN` | ![](https://img.shields.io/badge/status-active-success.svg) | - Header `PSU-IP-Address` is required by the ASPSP<br>- Header `PSU-ID` is required by the ASPSP and must be provided in the form `yyyyMMddNNNN` |
|Get Payment Initiation Authorisation Sub-Resources | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP |
|Get Payment Initiation Authorisation SCA Status | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP |
|Update PSU Data for Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP |
|Start Payment Cancellation Authorisation Process | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Payment Cancellation Authorisations | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Payment Cancellation Authorisation Status | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Update PSU Data for Payment Cancellation | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |

## Consent Sample Requests


<!--DOCUSAURUS_CODE_TABS-->
<!--Sandbox-->
<br>
**Create Consent**
```http
POST /psd2/consent/v1/consents HTTP/1.1
Accept: application/json
Content-Type: application/json
X-BicFi: HANDSESS
X-Request-ID: 4b9814f8-99f1-43d4-aa67-321f45ecea8d
Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkJFN0NCQ0FFMjQ3NDY0QkQxODE0OTBDN0NBN0EwMThFRTJCNEZDNTIiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJ2bnk4cmlSMFpMMFlGSkRIeW5vQmp1SzBfRkkifQ.eyJuYmYiOjE1NzYxNzk0MTIsImV4cCI6MTU3NjE4MzAxMiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnNhbmRib3gub3BlbmJhbmtpbmdwbGF0Zm9ybS5jb20iLCJhdWQiOlsiaHR0cHM6Ly9hdXRoLnNhbmRib3gub3BlbmJhbmtpbmdwbGF0Zm9ybS5jb20vcmVzb3VyY2VzIiwiYXNwc3BpbmZvcm1hdGlvbiJdLCJjbGllbnRfaWQiOiI1ZDliODczMy01NmY0LTQ2MDktODQ1Zi1iNjMzMzExMjA3Y2YiLCJzY29wZSI6WyJhY2NvdW50aW5mb3JtYXRpb24iXX0.nOGygBE2I9eBhqS87SPB_dyojiT96WGpRJ6O5Djy-48oyBH4YYhk_merP_vOeB0phecChG02ci6TIQakMelXtdVgZXZqDRCHXmHAKz8borQ8GFI8vqj9X5VLuPDWSaEBNclJmW6o8QyXM5ZmE-X_Qf66vHCt4W3-FnA0AO-G4hThQP1ElG1tSOiEYZtXQXCMdVlEW3yKRsWDqIUwnSfvYyPfukP5irFvPrRFPmZzt-C5mBNvIF-nJbSZFxjKjdRUbD7p4R4X_6hwrBnzyfmhHePM7O0ypjPMYlysBacOwY6jrQWkFzVwhRh6KGQEJS1L3Z9sneFX285oK-Oh3fC6mg
User-Agent: PostmanRuntime/7.20.1
Cache-Control: no-cache
Host: api.sandbox.openbankingplatform.com
Accept-Encoding: gzip, deflate
Content-Length: 142
Connection: keep-alive

{ "access": { }, "recurringIndicator": false, "validUntil": "2019-12-16", "frequencyPerDay": 4, "combinedServiceIndicator": false}

HTTP/1.1 201 Created
Transfer-Encoding: chunked
Content-Type: application/json; charset=utf-8
Location: https://api.sandbox.openbankingplatform.com/psd2/consent/v1/consents/7f06dcaa-d401-4f9f-999a-9eb162dd3ef1
request-context: appId=cid-v1:87d0b255-7f09-486c-a92a-81fe53aa3b71
aspsp-sca-approach: DECOUPLED
X-Request-ID: 4b9814f8-99f1-43d4-aa67-321f45ecea8d
Date: Thu, 12 Dec 2019 19:37:07 GMT
{"consentStatus":"received","consentId":"7f06dcaa-d401-4f9f-999a-9eb162dd3ef1","scaMethods":[{"authenticationType":"PUSH_OTP","authenticationMethodId":"mbid","name":"Mobilt BankID"}],"_links":{"self":{"href":"/psd2/consent/v1/consents/7f06dcaa-d401-4f9f-999a-9eb162dd3ef1"},"status":{"href":"/psd2/consent/v1/consents/7f06dcaa-d401-4f9f-999a-9eb162dd3ef1/status"},"startAuthorisation":{"href":"/psd2/consent/v1/consents/7f06dcaa-d401-4f9f-999a-9eb162dd3ef1/authorisations"}}}
```

**Get Consent**
```http
GET /psd2/consent/v1/consents/7f06dcaa-d401-4f9f-999a-9eb162dd3ef1 HTTP/1.1
Accept: application/json
Content-Type: application/json
X-BicFi: HANDSESS
X-Request-ID: 5dded914-23c8-4bf6-a58a-56162aa6a46a
Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkJFN0NCQ0FFMjQ3NDY0QkQxODE0OTBDN0NBN0EwMThFRTJCNEZDNTIiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJ2bnk4cmlSMFpMMFlGSkRIeW5vQmp1SzBfRkkifQ.eyJuYmYiOjE1NzYxNzk0MTIsImV4cCI6MTU3NjE4MzAxMiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnNhbmRib3gub3BlbmJhbmtpbmdwbGF0Zm9ybS5jb20iLCJhdWQiOlsiaHR0cHM6Ly9hdXRoLnNhbmRib3gub3BlbmJhbmtpbmdwbGF0Zm9ybS5jb20vcmVzb3VyY2VzIiwiYXNwc3BpbmZvcm1hdGlvbiJdLCJjbGllbnRfaWQiOiI1ZDliODczMy01NmY0LTQ2MDktODQ1Zi1iNjMzMzExMjA3Y2YiLCJzY29wZSI6WyJhY2NvdW50aW5mb3JtYXRpb24iXX0.nOGygBE2I9eBhqS87SPB_dyojiT96WGpRJ6O5Djy-48oyBH4YYhk_merP_vOeB0phecChG02ci6TIQakMelXtdVgZXZqDRCHXmHAKz8borQ8GFI8vqj9X5VLuPDWSaEBNclJmW6o8QyXM5ZmE-X_Qf66vHCt4W3-FnA0AO-G4hThQP1ElG1tSOiEYZtXQXCMdVlEW3yKRsWDqIUwnSfvYyPfukP5irFvPrRFPmZzt-C5mBNvIF-nJbSZFxjKjdRUbD7p4R4X_6hwrBnzyfmhHePM7O0ypjPMYlysBacOwY6jrQWkFzVwhRh6KGQEJS1L3Z9sneFX285oK-Oh3fC6mg
User-Agent: PostmanRuntime/7.20.1
Cache-Control: no-cache
Host: api.sandbox.openbankingplatform.com
Accept-Encoding: gzip, deflate
Connection: keep-alive

HTTP/1.1 200 OK
Transfer-Encoding: chunked
Content-Type: application/json; charset=utf-8
request-context: appId=cid-v1:87d0b255-7f09-486c-a92a-81fe53aa3b71
X-Request-ID: 5dded914-23c8-4bf6-a58a-56162aa6a46a
Date: Thu, 12 Dec 2019 19:49:34 GMT
{"consentId":"7f06dcaa-d401-4f9f-999a-9eb162dd3ef1","access":{"accounts":[],"balances":[],"transactions":[]},"recurringIndicator":false,"validUntil":"2019-12-16","frequencyPerDay":4,"lastActionDate":"2019-12-12","consentStatus":"received"}
```
**Delete Consent**

```http
DELETE /psd2/consent/v1/consents/7f06dcaa-d401-4f9f-999a-9eb162dd3ef1 HTTP/1.1
Accept: application/json
Content-Type: application/json
X-BicFi: HANDSESS
X-Request-ID: e3910e3e-b49c-49f0-b3b5-15242c46ace6
Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkJFN0NCQ0FFMjQ3NDY0QkQxODE0OTBDN0NBN0EwMThFRTJCNEZDNTIiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJ2bnk4cmlSMFpMMFlGSkRIeW5vQmp1SzBfRkkifQ.eyJuYmYiOjE1NzYxNzk0MTIsImV4cCI6MTU3NjE4MzAxMiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnNhbmRib3gub3BlbmJhbmtpbmdwbGF0Zm9ybS5jb20iLCJhdWQiOlsiaHR0cHM6Ly9hdXRoLnNhbmRib3gub3BlbmJhbmtpbmdwbGF0Zm9ybS5jb20vcmVzb3VyY2VzIiwiYXNwc3BpbmZvcm1hdGlvbiJdLCJjbGllbnRfaWQiOiI1ZDliODczMy01NmY0LTQ2MDktODQ1Zi1iNjMzMzExMjA3Y2YiLCJzY29wZSI6WyJhY2NvdW50aW5mb3JtYXRpb24iXX0.nOGygBE2I9eBhqS87SPB_dyojiT96WGpRJ6O5Djy-48oyBH4YYhk_merP_vOeB0phecChG02ci6TIQakMelXtdVgZXZqDRCHXmHAKz8borQ8GFI8vqj9X5VLuPDWSaEBNclJmW6o8QyXM5ZmE-X_Qf66vHCt4W3-FnA0AO-G4hThQP1ElG1tSOiEYZtXQXCMdVlEW3yKRsWDqIUwnSfvYyPfukP5irFvPrRFPmZzt-C5mBNvIF-nJbSZFxjKjdRUbD7p4R4X_6hwrBnzyfmhHePM7O0ypjPMYlysBacOwY6jrQWkFzVwhRh6KGQEJS1L3Z9sneFX285oK-Oh3fC6mg
User-Agent: PostmanRuntime/7.20.1
Cache-Control: no-cache
Host: api.sandbox.openbankingplatform.com
Accept-Encoding: gzip, deflate
Content-Length: 0
Connection: keep-alive

HTTP/1.1 204 No Content
Content-Length: 0
request-context: appId=cid-v1:87d0b255-7f09-486c-a92a-81fe53aa3b71
X-Request-ID: e3910e3e-b49c-49f0-b3b5-15242c46ace6
Date: Thu, 12 Dec 2019 19:53:24 GMT
```

<!--Production-->

<br>
**Create Consent**
```http
POST /psd2/consent/v1/consents HTTP/1.1
Accept: application/json
Content-Type: application/json
X-BicFi: HANDSESS
X-Request-ID: 4b9814f8-99f1-43d4-aa67-321f45ecea8d
Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkJFN0NCQ0FFMjQ3NDY0QkQxODE0OTBDN0NBN0EwMThFRTJCNEZDNTIiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJ2bnk4cmlSMFpMMFlGSkRIeW5vQmp1SzBfRkkifQ.eyJuYmYiOjE1NzYxNzk0MTIsImV4cCI6MTU3NjE4MzAxMiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnNhbmRib3gub3BlbmJhbmtpbmdwbGF0Zm9ybS5jb20iLCJhdWQiOlsiaHR0cHM6Ly9hdXRoLnNhbmRib3gub3BlbmJhbmtpbmdwbGF0Zm9ybS5jb20vcmVzb3VyY2VzIiwiYXNwc3BpbmZvcm1hdGlvbiJdLCJjbGllbnRfaWQiOiI1ZDliODczMy01NmY0LTQ2MDktODQ1Zi1iNjMzMzExMjA3Y2YiLCJzY29wZSI6WyJhY2NvdW50aW5mb3JtYXRpb24iXX0.nOGygBE2I9eBhqS87SPB_dyojiT96WGpRJ6O5Djy-48oyBH4YYhk_merP_vOeB0phecChG02ci6TIQakMelXtdVgZXZqDRCHXmHAKz8borQ8GFI8vqj9X5VLuPDWSaEBNclJmW6o8QyXM5ZmE-X_Qf66vHCt4W3-FnA0AO-G4hThQP1ElG1tSOiEYZtXQXCMdVlEW3yKRsWDqIUwnSfvYyPfukP5irFvPrRFPmZzt-C5mBNvIF-nJbSZFxjKjdRUbD7p4R4X_6hwrBnzyfmhHePM7O0ypjPMYlysBacOwY6jrQWkFzVwhRh6KGQEJS1L3Z9sneFX285oK-Oh3fC6mg
User-Agent: PostmanRuntime/7.20.1
Cache-Control: no-cache
Host: api.openbankingplatform.com
Accept-Encoding: gzip, deflate
Content-Length: 142
Connection: keep-alive

{ "access": { }, "recurringIndicator": false, "validUntil": "2019-12-16", "frequencyPerDay": 4, "combinedServiceIndicator": false}

HTTP/1.1 201 Created
Transfer-Encoding: chunked
Content-Type: application/json; charset=utf-8
Location: https://api.sandbox.openbankingplatform.com/psd2/consent/v1/consents/7f06dcaa-d401-4f9f-999a-9eb162dd3ef1
request-context: appId=cid-v1:87d0b255-7f09-486c-a92a-81fe53aa3b71
aspsp-sca-approach: DECOUPLED
X-Request-ID: 4b9814f8-99f1-43d4-aa67-321f45ecea8d
Date: Thu, 12 Dec 2019 19:37:07 GMT
{"consentStatus":"received","consentId":"7f06dcaa-d401-4f9f-999a-9eb162dd3ef1","scaMethods":[{"authenticationType":"PUSH_OTP","authenticationMethodId":"mbid","name":"Mobilt BankID"}],"_links":{"self":{"href":"/psd2/consent/v1/consents/7f06dcaa-d401-4f9f-999a-9eb162dd3ef1"},"status":{"href":"/psd2/consent/v1/consents/7f06dcaa-d401-4f9f-999a-9eb162dd3ef1/status"},"startAuthorisation":{"href":"/psd2/consent/v1/consents/7f06dcaa-d401-4f9f-999a-9eb162dd3ef1/authorisations"}}}
```

**Get Consent**
```http
GET /psd2/consent/v1/consents/7f06dcaa-d401-4f9f-999a-9eb162dd3ef1 HTTP/1.1
Accept: application/json
Content-Type: application/json
X-BicFi: HANDSESS
X-Request-ID: 5dded914-23c8-4bf6-a58a-56162aa6a46a
Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkJFN0NCQ0FFMjQ3NDY0QkQxODE0OTBDN0NBN0EwMThFRTJCNEZDNTIiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJ2bnk4cmlSMFpMMFlGSkRIeW5vQmp1SzBfRkkifQ.eyJuYmYiOjE1NzYxNzk0MTIsImV4cCI6MTU3NjE4MzAxMiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnNhbmRib3gub3BlbmJhbmtpbmdwbGF0Zm9ybS5jb20iLCJhdWQiOlsiaHR0cHM6Ly9hdXRoLnNhbmRib3gub3BlbmJhbmtpbmdwbGF0Zm9ybS5jb20vcmVzb3VyY2VzIiwiYXNwc3BpbmZvcm1hdGlvbiJdLCJjbGllbnRfaWQiOiI1ZDliODczMy01NmY0LTQ2MDktODQ1Zi1iNjMzMzExMjA3Y2YiLCJzY29wZSI6WyJhY2NvdW50aW5mb3JtYXRpb24iXX0.nOGygBE2I9eBhqS87SPB_dyojiT96WGpRJ6O5Djy-48oyBH4YYhk_merP_vOeB0phecChG02ci6TIQakMelXtdVgZXZqDRCHXmHAKz8borQ8GFI8vqj9X5VLuPDWSaEBNclJmW6o8QyXM5ZmE-X_Qf66vHCt4W3-FnA0AO-G4hThQP1ElG1tSOiEYZtXQXCMdVlEW3yKRsWDqIUwnSfvYyPfukP5irFvPrRFPmZzt-C5mBNvIF-nJbSZFxjKjdRUbD7p4R4X_6hwrBnzyfmhHePM7O0ypjPMYlysBacOwY6jrQWkFzVwhRh6KGQEJS1L3Z9sneFX285oK-Oh3fC6mg
User-Agent: PostmanRuntime/7.20.1
Cache-Control: no-cache
Host: api.openbankingplatform.com
Accept-Encoding: gzip, deflate
Connection: keep-alive

HTTP/1.1 200 OK
Transfer-Encoding: chunked
Content-Type: application/json; charset=utf-8
request-context: appId=cid-v1:87d0b255-7f09-486c-a92a-81fe53aa3b71
X-Request-ID: 5dded914-23c8-4bf6-a58a-56162aa6a46a
Date: Thu, 12 Dec 2019 19:49:34 GMT
{"consentId":"7f06dcaa-d401-4f9f-999a-9eb162dd3ef1","access":{"accounts":[],"balances":[],"transactions":[]},"recurringIndicator":false,"validUntil":"2019-12-16","frequencyPerDay":4,"lastActionDate":"2019-12-12","consentStatus":"received"}
```
**Delete Consent**

```http
DELETE /psd2/consent/v1/consents/7f06dcaa-d401-4f9f-999a-9eb162dd3ef1 HTTP/1.1
Accept: application/json
Content-Type: application/json
X-BicFi: HANDSESS
X-Request-ID: e3910e3e-b49c-49f0-b3b5-15242c46ace6
Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkJFN0NCQ0FFMjQ3NDY0QkQxODE0OTBDN0NBN0EwMThFRTJCNEZDNTIiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJ2bnk4cmlSMFpMMFlGSkRIeW5vQmp1SzBfRkkifQ.eyJuYmYiOjE1NzYxNzk0MTIsImV4cCI6MTU3NjE4MzAxMiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnNhbmRib3gub3BlbmJhbmtpbmdwbGF0Zm9ybS5jb20iLCJhdWQiOlsiaHR0cHM6Ly9hdXRoLnNhbmRib3gub3BlbmJhbmtpbmdwbGF0Zm9ybS5jb20vcmVzb3VyY2VzIiwiYXNwc3BpbmZvcm1hdGlvbiJdLCJjbGllbnRfaWQiOiI1ZDliODczMy01NmY0LTQ2MDktODQ1Zi1iNjMzMzExMjA3Y2YiLCJzY29wZSI6WyJhY2NvdW50aW5mb3JtYXRpb24iXX0.nOGygBE2I9eBhqS87SPB_dyojiT96WGpRJ6O5Djy-48oyBH4YYhk_merP_vOeB0phecChG02ci6TIQakMelXtdVgZXZqDRCHXmHAKz8borQ8GFI8vqj9X5VLuPDWSaEBNclJmW6o8QyXM5ZmE-X_Qf66vHCt4W3-FnA0AO-G4hThQP1ElG1tSOiEYZtXQXCMdVlEW3yKRsWDqIUwnSfvYyPfukP5irFvPrRFPmZzt-C5mBNvIF-nJbSZFxjKjdRUbD7p4R4X_6hwrBnzyfmhHePM7O0ypjPMYlysBacOwY6jrQWkFzVwhRh6KGQEJS1L3Z9sneFX285oK-Oh3fC6mg
User-Agent: PostmanRuntime/7.20.1
Cache-Control: no-cache
Host: api.openbankingplatform.com
Accept-Encoding: gzip, deflate
Content-Length: 0
Connection: keep-alive

HTTP/1.1 204 No Content
Content-Length: 0
request-context: appId=cid-v1:87d0b255-7f09-486c-a92a-81fe53aa3b71
X-Request-ID: e3910e3e-b49c-49f0-b3b5-15242c46ace6
Date: Thu, 12 Dec 2019 19:53:24 GMT
```


<!--END_DOCUSAURUS_CODE_TABS-->