---
id: api
title: Getting Started with the API
sidebar_label: Getting started with the API
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

## Register a client

[Register a client](https://developer.openpayments.io) by creating a developer account at our [Developer Portal](https://developer.openpayments.io) to acquire client credentials.

Decide what parts of the API you want access to for your new client. At this point you can choose one or several of ASPSP Information, Account Information and Payment Initiation.

You will get a `client_id` and a `client_secret` that you can use to authenticate with the platform. The secret will not be stored on our end so it is iportant that you keep track of it. Otherwise you'll have to obtain new credentials in the portal.

## Postman collection

You can download our [Postman Collection](/obp.postman_collection.json) and [Postman Environment Settings](/sandbox.postman_environment.json) with ready made API calls and settings for our sandbox environment. After importing the Collection and the Environment Settings, you just need to set the values for variables "clientId", "clientSecret" and "redirectUri" to start using our API:s in the sandbox environment.

## General notes about requests

### Explicit scopes for Private and Corporate contexts
Your requests will operate in either a "private" or a "corporate" context in our platform. This is an abstraction layer provided by our platform so that you need to know less about how specific banks are implementing and separating private/corporate access to account information and payment operations.
The context is selected by specifying an additional "private" or "corporate" scope when requesting an access token from our auth endpoint. The examples in our tutorials shows how it can be done.
<br><br>
With this change we have also updated our [Postman Collection](/obp.postman_collection.json) and [Postman Environment Settings](/sandbox.postman_environment.json), so if you are using an old version of these please download the latest to easily shift into using these new scopes when testing.

### X-Request-ID

All calls accept a header called `X-Request-ID` - this should be set to a newly generated guid. Denoted in the code with [GUID]. If your client is also a platform it would make sense to accept such an id from the client that calls you. This id is used to trace requests through our systems. Logging it somewhere together with the request will make troubleshooting much easier.
