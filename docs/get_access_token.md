---
id: get_access_token
title: Create access token
sidebar_label: Create access token
---

All requests made to the Open Banking API requires an access token. The access token is valid only for a scope you specify in the request body. The scope is a combination of private/corporate scope and API scope, separated with a space. For example, an access token for making requests to the AIS API for private accounts has `scope` set to `"aisinformation private"`.

#### Endpoint

```javascript
POST AUTH_HOST
```
#### Headers

```javascript
Content-Type: "application/x-www-form-urlencoded"
```

#### Body

```javascript
{
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: ”client_credentials”,
    scope: scope
}
```

Note: `scope`contains information about what part of the API the access token should be valid for.
#### Result
```javascript
accessToken = response.data.access_token;
```