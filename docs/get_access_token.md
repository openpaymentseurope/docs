---
id: get_access_token
title: Create access token
sidebar_label: Create access token
---

All requests made to the Open Banking API requires an access token. The access token is valid for one hour. [Något mer här?]

### Variables and constants used in the guide

| Name         | Description                                                                                                                                                                                                                                                             |
| ------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AUTH_HOST      | The token URL. For production, use `https://auth.openbankingplatform.com/connect/token`                                                                                                                                                                                 |
| CLIENT_ID     | The Client ID of the application you created in the Developer Portal.                                                                                                                                                                                                   |
| CLIENT_SECRET | The secret that was generated when you created an application. If you did not save that value, you need to generate a new secret.                                                                                                                                    |
| scope | The scope is a combination of private/corporate scope and API scope, separated with a space. For example, an access token for making requests to the AIS API for private accounts has `scope` set to `"accountinformation private"`.                                                                                                                                    |


#### Endpoint

```javascript
POST AUTH_HOST
```
#### Request headers

```javascript
Content-Type: "application/x-www-form-urlencoded"
```

#### Request body

```javascript
client_id: CLIENT_ID,
client_secret: CLIENT_SECRET,
grant_type: ”client_credentials”,
scope: scope
```

#### Result
```javascript
accessToken = response.data.access_token;
```