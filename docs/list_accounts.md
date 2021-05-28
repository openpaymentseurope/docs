---
id: list_accounts
title: List accounts
sidebar_label: List accounts
---

This guide show how to list accounts for a user. It assumes that you have previously created a Consent that the user has authorised. See the [Create Consent](create_consent) guide on how to implement this.

### Variables and constants used in the guide

| Name         | Description                                                                                                                                                                                                                                                             |
| ------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accessToken          | An access token with `scope` `"accountinformation private"`.                                                                                                                                                                                                                |
| bic          | The BIC code for the bank.                                                                                                                                                                                                                |
| consentID          |      The id of the Consent.                                                                                                                                                                                                         |
| psuUserAgent | The User-Agent from the user's request.                                                                                                                                                                                                                                 |
| psuIpAddress | The user's IP address                                                                                                                                                                                                                                                   |
| xRequestID   | Most requests require the header `X-Request-ID`, which is a uuid. This will be a unique identifier of your request and will be useful in case you need support. Make sure to create a new GUID for every individual request. In this guide, we assume that you store this value in the variable `xRequestID`. |


### Get Account List

<a href="https://docs.openpayments.io/en/openpayments-NextGenPSD2-1.3.3.html#operation/getAccountList" target="_blank">Endpoint details</a>

#### Endpoint

```javascript
GET /psd2/accountinformation/v1/accounts
```

#### Request headers

```javascript
Accept: "application/json",
Authorization: "Bearer " + accessToken,
Consent-ID: consentID,
Content-Type: "application/json",
X-BicFi: bic,
X-Request-ID: xRequestID,
PSU-IP-Address: psuIpAddress,
```

#### Result

```javascript
accounts = result.body.accounts
```