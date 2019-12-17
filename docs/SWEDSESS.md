---
id: swedsess
title: Swedbank (SWEDSESS)
sidebar_label: Swedbank
---

## Status Highlights

| Status | Product | Comment |
|:---|---|---|
|![](https://img.shields.io/badge/status-critical-critical.svg)| PIS | Currently not functional in both the Sandbox and Production environments because of ASPSP API defects. |
|![](https://img.shields.io/badge/status-important-important.svg)| Consent, PIS | HTTP header `PSU-ID` is required when starting authorisation process. |

## Supported SCA Methods
|Environment     |SCA Method | Authentication Method | Comment |
|----------------|----------|--------------|--------------|
|Sandbox         |OAuth Redirect | None   | Authentication can be done with any PSU id. |
|Production      |OAuth Redirect | Mobilt BankID |  |

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
|Start Consent Authorisation Process | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Consent Authorisation Sub-Resources | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Consent Authorisation SCA Status | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | **Currently non-functional at ASPSP** | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | **Currently non-functional at ASPSP** |
|Update PSU Data for Consent | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |

## Account Information Service

### Transaction Limits

| Transaction History (Private) | Transaction List (Private) | Transaction History (Corporate) | Transaction List (Corporate) |
|---|---|---|---|
| Max. 90 Days | Not disclosed by ASPSP | Not disclosed by ASPSP | Not disclosed by ASPSP |

### API Status

|Service  |Sandbox |Comment |Production |Comment |
|---------|:--------:|--------------|:-----------:|------------|
|Get Account List | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Account Details | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Balances | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Transaction List | ![](https://img.shields.io/badge/status-active-success.svg) | Parameters `dateFrom`, `dateTo` and `bookingStatus` are ignored by ASPSP | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Transaction Details | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |

## Payment Initiation Service

### Supported Payment Products

| Payment Product | Sandbox | Production |
|---------------------|---|---|
|domestic              | ![](https://img.shields.io/badge/status-active-success.svg) | ![](https://img.shields.io/badge/status-active-success.svg) |
|sepa-credit-transfers | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | ![](https://img.shields.io/badge/status-not_supported-critical.svg) |
|international         | ![](https://img.shields.io/badge/status-in_development-informational.svg)| ![](https://img.shields.io/badge/status-in_development-informational.svg) |

### API Status

|Service  |Sandbox | Comment |Production | Comment |
|---------|--------------------|---|--------------------|---|
|Create Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Cancel Payment Initiation | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Payment Initiation Status | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Start Payment Initiation Authorisation Process | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-ID` is required by the ASPSP and must be provided in the form `yyMMddNNNN` | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-ID` is required by the ASPSP and must be provided in the form `yyMMddNNNN` |
|Get Payment Initiation Authorisation Sub-Resources | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Payment Initiation Authorisation SCA Status | ![](https://img.shields.io/badge/status-active-success.svg) | **Currently non-functional at ASPSP** | ![](https://img.shields.io/badge/status-active-success.svg) | **Currently non-functional at ASPSP** |
|Update PSU Data for Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Start Payment Initiation Cancellation Authorisation Process | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Payment Initiation Cancellation Authorisation Sub-Resources | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Payment Initiation Cancellation Authorisation SCA Status | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Update PSU Data for Payment Initiation Cancellation | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
