---
id: version-1.0.11-handsess
title: Handelsbanken (HANDSESS)
sidebar_label: Handelsbanken
original_id: handsess
---

## Status Highlights

| Status | Product | Comment |
|:---|---|---|
|![](https://img.shields.io/badge/status-important-important.svg)| PIS | For domestic payment, ASPSP require that BBAN is used for both debtor and creditor account and clearing number is given separately|
|![](https://img.shields.io/badge/status-important-important.svg)| Consent, AIS, PIS | HTTP header `PSU-IP-Address` is required by ASPSP on a number of services, please see API status comments below |

## Supported SCA Methods
|Environment     |SCA Method | Authentication Method | Status | Comment |
|----------------|----------|--------------|--------------|--------------|
|Sandbox         |Decoupled | None   | ![](https://img.shields.io/badge/status-active-success.svg) | - Authentication is automatically approved and finalized by ASPSP directly when calling "Start the authorization process.." endpoint. |
|Production      |Decoupled      | Mobilt BankID | ![](https://img.shields.io/badge/status-active-success.svg) | - PSU must start the Mobilt BankID app with returned autostarttoken within 30 sec. from when "Start the authorization process.." service was called or SCA will fail.<br>- To properly initiate the Mobilt BankID app, the TPP must construct a link with the the format: `bankid:///?autostarttoken={AUTO_START_TOKEN}&redirect={ANY_REDIRECT_URI}`, where `{AUTO_START_TOKEN}` is the value of `challengeData.data` given in response body from `Update PSU Data for Consent` and `Update PSU Data for Payment Initiation`. The redirect query is mandatory for iOS and optional for Android. The TPP must then have the PSU to open this link on its mobile device or generate a QR code for it and ask the PSU to scan it with the Mobilt BankID app. |
|Production      |OAuth Redirect | Mobilt BankID | ![](https://img.shields.io/badge/status-backlog-inactive.svg) | Supported by ASPSP, but not yet implemented. |

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
|Start Consent Authorisation Process | ![](https://img.shields.io/badge/status-active-success.svg) | | ![](https://img.shields.io/badge/status-active-success.svg) | |
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
|Get Account List | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP |
|Get Account Details | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP |
|Get Balances | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP |
|Get Transaction List | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP |
|Get Transaction Details | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |

## Payment Initiation Service

### Supported Payment Products

| Payment Product | Sandbox | Production |
|---------------------|---|---|
|domestic              | ![](https://img.shields.io/badge/status-active-success.svg) | ![](https://img.shields.io/badge/status-active-success.svg) |
|swedish-giro          | ![](https://img.shields.io/badge/status-active-success.svg) | ![](https://img.shields.io/badge/status-active-success.svg) |
|sepa-credit-transfers | ![](https://img.shields.io/badge/status-in_development-yellow.svg) | ![](https://img.shields.io/badge/status-in_development-yellow.svg) |
|international         | ![](https://img.shields.io/badge/status-in_development-yellow.svg)| ![](https://img.shields.io/badge/status-in_development-yellow.svg) |

### API Status

|Service  |Sandbox | Comment |Production | Comment |
|---------|--------------------|---|--------------------|---|
|Create Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) | - For domestic payments BBAN without clearing number must be used for the `debtorAccount`<br>- For domestic payments BBAN without clearing number must be used for the `creditorAccount`, while specifying the clearing number in its own field `creditorAccount.clearingNumber` | ![](https://img.shields.io/badge/status-active-success.svg) | - For domestic payments BBAN without clearing number must be used for the `debtorAccount`<br>- For domestic payments BBAN without clearing number must be used for the `creditorAccount`, while specifying the clearing number in its own field `creditorAccount.clearingNumber` |
|Get Payment Initiation | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Cancel Payment Initiation | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Payment Initiation Status | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP |
|Start Payment Initiation Authorisation Process | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP |
|Get Payment Initiation Authorisation Sub-Resources | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP |
|Get Payment Initiation Authorisation SCA Status | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP |
|Update PSU Data for Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-IP-Address` is required by the ASPSP |
|Start Payment Initiation Cancellation Authorisation Process | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Payment Initiation Cancellation Authorisation Sub-Resources | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Payment Initiation Cancellation Authorisation SCA Status | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Update PSU Data for Payment Initiation Cancellation | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
