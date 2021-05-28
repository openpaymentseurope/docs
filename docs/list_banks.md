---
id: list_banks
title: List banks
sidebar_label: List banks
---

This guide demonstrates how to fetch all Swedish banks in the Open Banking Platform.
### Variables and constants used in the guide

| Name         | Description                                                                                                                                                                                                                                                             |
| ------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accessToken          | An access token with `scope` `"aspspinformation private"`.                                                                                                                                                                                                                |
| xRequestID   | Most requests require the header `X-Request-ID`, which is a uuid. This will be a unique identifier of your request and will be useful in case you need support. Make sure to create a new GUID for every individual request. In this guide, we assume that you store this value in the variable `xRequestID`. |



### Get ASPSP List
<a href="https://docs.openpayments.io/en/openpayments-NextGenPSD2-1.3.3.html#operation/getASPSPList" target="_blank">Endpoint details</a>

#### Endpoint

```javascript
GET /psd2/aspspinformation/v1/aspsps?isoCountryCodes=SE
```

#### Request headers

```javascript
Accept: "application/json",
Authorization: "Bearer " + accessToken,
Content-Type: "application/json",
X-Request-ID: xRequestID
```

#### Result
```javascript
banks = response.body.aspsps;
```

You now have a list of banks that you can use to create a UI that let your user select a bank to authenticate to.

