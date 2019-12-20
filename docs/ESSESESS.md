---
id: essesess
title: SEB (ESSESESS)
sidebar_label: SEB
---

## Status Highlights

| Status | Product | Comment |
|:---|---|---|
|![](https://img.shields.io/badge/status-critical-critical.svg)| PIS | Currently not functional in both the Sandbox and Production environments because of ASPSP API defects. |
|![](https://img.shields.io/badge/status-important-important.svg)| Consent, PIS | HTTP header `PSU-ID` is required when starting auhtorisation process. |

## Supported SCA Methods
|Environment     |SCA Method | Authentication Method | Status | Comment |
|----------------|----------|--------------|--------------|--------------|
|Sandbox         |OAuth Redirect | None   | ![](https://img.shields.io/badge/status-active-success.svg) | Authentication must be done with [specific PSU id's](#sandbox-test-data).|
|Production      |Decoupled      | Mobilt BankID | ![](https://img.shields.io/badge/status-active-success.svg) | - PSU must authenticate with Mobilt BankID within 30 sec. or SCA will fail.<br> - Mobilt BankID autostarttoken is provided, but is not required. |
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
|Start Consent Authorisation Process | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-ID` is required by the ASPSP and must be provided in the form `yyMMddNNNN` | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-ID` is required by the ASPSP and must be provided in the form `yyMMddNNNN` |
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
|sepa-credit-transfers | ![](https://img.shields.io/badge/status-in_development-yellow.svg) | ![](https://img.shields.io/badge/status-in_development-yellow.svg) |
|international         | ![](https://img.shields.io/badge/status-in_development-yellow.svg)| ![](https://img.shields.io/badge/status-in_development-yellow.svg) |

### API Status

|Service  |Sandbox | Comment |Production | Comment |
|---------|--------------------|---|--------------------|---|
|Create Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-defect-critical.svg) | **Currently non-functional with creditor IBAN:s belonging to other banks than SEB** |
|Get Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Cancel Payment Initiation | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Payment Initiation Status | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Start Payment Initiation Authorisation Process | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-ID` is required by the ASPSP and must be provided in the form `yyMMddNNNN` | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-ID` is required by the ASPSP and must be provided in the form `yyMMddNNNN` |
|Get Payment Initiation Authorisation Sub-Resources | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Payment Initiation Authorisation SCA Status | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Update PSU Data for Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Start Payment Initiation Cancellation Authorisation Process | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Payment Initiation Cancellation Authorisation Sub-Resources | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Payment Initiation Cancellation Authorisation SCA Status | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Update PSU Data for Payment Initiation Cancellation | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |