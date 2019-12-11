---
id: version-1.0.0-swedsess
title: Swedbank (SWEDSESS)
sidebar_label: Swedbank
original_id: swedsess
---

## Status Highlights

| Status | Product | Comment |
|:---|---|---|
|![](https://img.shields.io/badge/status-critical-critical.svg)| PIS | Currently not functional in both the Sandbox and Production environments because of ASPSP API defects. |
|![](https://img.shields.io/badge/status-important-important.svg)| Consent, PIS | HTTP header `PSU-ID` is required when starting auhtorisation process. |

## Supported SCA Methods
|Environment     |SCA Method | Authentication Method | Comment |
|----------------|----------|--------------|--------------|
|Sandbox         |OAuth Redirect | None   | Authentication must be done with [specific PSU id's](#sandbox-test-data).|
|Production      |Decoupled      | Mobilt BankID | - PSU must authenticate with Mobilt BankID within 30 sec. or SCA will fail.<br> - Mobilt BankID autostarttoken is provided, but is not required. |

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
|Create consent | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Consent Request | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Delete Consent | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Consent Status Request | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Start Consent Authorisation Process | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-ID` is required by the ASPSP and must be provided in the form `yyMMddNNNN` | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-ID` is required by the ASPSP and must be provided in the form `yyMMddNNNN` |
|Get Consent Authorisation Sub-Resources Request | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Read Consent Authorisation SCA Status | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Update PSU Data | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |

## Account Information Service

### Transaction Limits

| Transaction History (Private) | Transaction List (Private) | Transaction History (Corporate) | Transaction List (Corporate) |
|---|---|---|---|
| Not disclosed by ASPSP | Not disclosed by ASPSP | Not disclosed by ASPSP | Not disclosed by ASPSP |

### API Status

|Service  |Sandbox |Sandbox Notes |Production |Production Notes |
|---------|:--------:|--------------|:-----------:|------------|
|Read Account List | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Read Account Details | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Read Balances | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Read transaction List | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Read Transaction Details | ![](https://img.shields.io/badge/status-warning-yellow.svg) | Transaction details work only for few transactions in the ASPSP sandbox environment and will return 404 for most of them. | ![](https://img.shields.io/badge/status-warning-yellow.svg) | Transaction details work only for few transactions in the ASPSP sandbox environment and will return 404 for most of them. |

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
|Payment Initiation Request | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Payment Initiation Request Information | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Payment Initiation Cancellation Request | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Payment Initiation Status Request | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Start Payment Initiation Authorisation Process | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-ID` is required by the ASPSP and must be provided in the form `yyMMddNNNN` | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-ID` is required by the ASPSP and must be provided in the form `yyMMddNNNN` |
|Get Payment Initiation Authorisation Sub-Resources Request | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Payment Initiation Authorisation SCA Status | ![](https://img.shields.io/badge/status-active-success.svg) | **Currently non-functional at ASPSP** | ![](https://img.shields.io/badge/status-active-success.svg) | **Currently non-functional at ASPSP** |
|Update PSU Data for Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Start Cancellation Authorisation Process | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Cancellation Authorisations | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Cancellation Authorisation Status | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Update PSU Data for Payment Initiation Cancellation | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |