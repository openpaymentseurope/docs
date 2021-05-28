---
id: api
title: Good to know
sidebar_label: Good to know
---

Open Payments Platform uses OAuth2 (specifically OIDC) for authentication. In the following sections, we have provided step
by step instructions on how you will interact with the platform. Throughout this documentation we use brackets to denote variables that need to be replaced with corresponding values. The actual domains to access are two - one for handling auth and one for doing the actual calls. See list below for values in sandbox and production.

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

## Postman collection

You can download our [Postman Collection](/obp.postman_collection.json), [Postman Environment Settings for Sandbox](/sandbox.postman_environment.json) and [Postman Environment Settings for Production](/production.postman_environment.json) with ready made API calls and settings for our environments. After importing the Collection and the Environment Settings, you just need to set the values for variables "clientId", "clientSecret" and "redirectUri" to start using our API:s.

## General notes about requests

### Explicit scopes for Private and Corporate contexts
Your requests will operate in either a "private" or a "corporate" context in our platform. This is an abstraction layer provided by our platform so that you need to know less about how specific banks are implementing and separating private/corporate access to account information and payment operations.
The context is selected by specifying an additional "private" or "corporate" scope when requesting an access token from our auth endpoint. The examples in our tutorials shows how it can be done.
<br><br>
With this change we have also updated our [Postman Collection](/obp.postman_collection.json), [Postman Environment Settings for Sandbox](/sandbox.postman_environment.json) and [Postman Environment Settings for Production](/production.postman_environment.json), so if you are using an old version of these please download the latest to easily shift into using these new scopes when testing.

### X-Request-ID

All calls accept a header called `X-Request-ID` - this should be set to a newly generated guid. Denoted in the code with [GUID]. If your client is also a platform it would make sense to accept such an id from the client that calls you. This id is used to trace requests through our systems. Logging it somewhere together with the request will make troubleshooting much easier.
