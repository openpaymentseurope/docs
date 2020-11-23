---
id: version-1.0.5-essesess
title: SEB (ESSESESS)
sidebar_label: SEB
original_id: essesess
---

## Status Highlights

| Status | Product | Comment |
|:---|---|---|
|![](https://img.shields.io/badge/status-important-important.svg)| PIS |`Get Payment Initiation Authorisation SCA Status` currently returns 400 code after SCA flow has finished so that SCA result cannot be determined. Workaround is to check the payment status with `Get Payment Initiation Status` after this error occurs, and verify that the payment succeeded |
|![](https://img.shields.io/badge/status-important-important.svg)| Consent, PIS | `PSU-ID` not used anymore in Decoupled SCA, instead PSU must open Mobilt BankID with an autostart token given in response body from `Update PSU Data for Consent` and `Update PSU Data for Payment Initiation`|

## Supported SCA Methods
|Environment     |SCA Method | Authentication Method | Status | Comment |
|----------------|----------|--------------|--------------|--------------|
|Sandbox         |OAuth Redirect | None   | ![](https://img.shields.io/badge/status-active-success.svg) | Authentication must be done with [specific PSU id's](#sandbox-test-data).|
|Production      |Decoupled      | Mobilt BankID | ![](https://img.shields.io/badge/status-active-success.svg) | - PSU must authenticate with Mobilt BankID within 30 sec. or SCA will fail.<br> - To properly initiate the Mobilt BankID app, the TPP must construct a link with the the format: `bankid:///?autostarttoken={AUTO_START_TOKEN}&redirect={ANY_REDIRECT_URI}`, where `{AUTO_START_TOKEN}` is the value of `challengeData.data` given in response body from `Update PSU Data for Consent` and `Update PSU Data for Payment Initiation`. The redirect query is mandatory for iOS and optional for Android. The TPP must then have the PSU to open this link on its mobile device or generate a QR code for it and ask the PSU to scan it with the Mobilt BankID app. |
|Production      |OAuth Redirect | Mobilt BankID | ![](https://img.shields.io/badge/status-backlog-inactive.svg) | Supported by ASPSP, but not yet implemented. |

### Sandbox Test Data

* All data will be reset each Sunday at midnight by the ASPSP in the sandbox environment.

* When performing SCA in the sandbox environment, one of the following PSU id's (personnummer) must be used for authentication:
  * 9311219639
  * 9311219589
  * 8811215477
  * 8811212862
  * 8311211356

* Transaction details work only for few transactions in the ASPSP sandbox environment and will return 404 for most of them.

## Consent Service

### API Status

|Service  |Sandbox | Comment |Production | Comment |
|---------|:--------:|--------------|:-----------:|------------|
|Create Consent | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Consent | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Delete Consent | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Consent Status | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Start Consent Authorisation Process | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Consent Authorisation Sub-Resources | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Consent Authorisation SCA Status | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Update PSU Data for Consent | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |

## Account Information Service

### Transaction Limits

| Transaction History (Private) | Transaction List (Private) | Transaction History (Corporate) | Transaction List (Corporate) |
|---|---|---|---|
| Not disclosed by ASPSP | Not disclosed by ASPSP | Not disclosed by ASPSP | Not disclosed by ASPSP |

### API Status

|Service  |Sandbox |Sandbox Notes |Production |Production Notes |
|---------|:--------:|--------------|:-----------:|------------|
|Get Account List | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Account Details | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Balances | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Transaction List | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Transaction Details | ![](https://img.shields.io/badge/status-warning-yellow.svg) | Transaction details work only for few transactions in the ASPSP sandbox environment and will return 404 for most of them. | ![](https://img.shields.io/badge/status-warning-yellow.svg) | Transaction details work only for few transactions in the ASPSP sandbox environment and will return 404 for most of them. |

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
|Create Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Cancel Payment Initiation | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Payment Initiation Status | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Start Payment Initiation Authorisation Process | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Payment Initiation Authorisation Sub-Resources | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Payment Initiation Authorisation SCA Status | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-defect-critical.svg) | Currently returns 400 code after SCA flow has finished so that SCA result cannot be determined |
|Update PSU Data for Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Start Payment Initiation Cancellation Authorisation Process | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Payment Initiation Cancellation Authorisation Sub-Resources | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |    
|Get Payment Initiation Cancellation Authorisation SCA Status | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Update PSU Data for Payment Initiation Cancellation | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |