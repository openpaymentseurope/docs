---
id: handsess
title: Handelsbanken (HANDSESS)
sidebar_label: Handelsbanken
---

## Status Highlights

| Status | Product | Comment |
|:---|---|---|
|![](https://img.shields.io/badge/status-critical-critical.svg)| PIS | Currently not functional in both the Sandbox and Production environments because of ASPSP API defects. |
|![](https://img.shields.io/badge/status-important-important.svg)| Consent, PIS | HTTP header `PSU-ID` is required when starting authorisation process. |
|![](https://img.shields.io/badge/status-important-important.svg)| Consent, AIS, PIS | HTTP header `PSU-IP-Address` is required on a number of services, please see API status comments below |

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
|Create Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) | - IBAN not supported by ASPSP for `debtorAccount`<br>- For domestic payments BBAN without clearing number must be used for the `creditorAccount` as well, while specifying the clearing number in its own field | ![](https://img.shields.io/badge/status-active-success.svg) | - IBAN not supported by ASPSP for `debtorAccount`<br>- For domestic payments BBAN without clearing number must be used for the `creditorAccount` as well, while specifying the clearing number in its own field |
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