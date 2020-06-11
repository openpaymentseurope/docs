---
id: swedsess
title: Swedbank (SWEDSESS)
sidebar_label: Swedbank
---

## Status Highlights

| Status | Product | Comment |
|:---|---|---|
|![](https://img.shields.io/badge/status-defect-red.svg)| Consent | Creating consent for Corporate accounts is currenly non-functional at ASPSP. |
|![](https://img.shields.io/badge/status-important-important.svg)| Consent, PIS | HTTP headers `PSU-IP-Address`, `PSU-User-Agent` and `PSU-Http-Method` are required for `Create Consent` and `Create Payment Initiation`. |

## Supported SCA Methods
|Environment     |SCA Method | Authentication Method | Status | Comment |
|----------------|----------|--------------|--------------|--------------|
|Sandbox         |OAuth Redirect | None   | ![](https://img.shields.io/badge/status-active-success.svg) | Authentication can be done with any PSU id. |
|Production      |OAuth Redirect | Mobilt BankID | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Production      |Decoupled | Mobilt BankID | ![](https://img.shields.io/badge/status-backlog-inactive.svg) | ASPSP plan to have this available in Q1 2020. |

### Sandbox Test Data

* No remarks

## Consent Service

### API Status

|Service  |Sandbox | Comment |Production | Comment |
|---------|:--------:|--------------|:-----------:|------------|
|Create Consent | ![](https://img.shields.io/badge/status-active-success.svg) | Headers `PSU-IP-Address`, `PSU-User-Agent` and `PSU-Http-Method` is required by the ASPSP and must be provided | ![](https://img.shields.io/badge/status-active-success.svg) | Headers `PSU-IP-Address`, `PSU-User-Agent` and `PSU-Http-Method` is required by the ASPSP and must be provided |
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
|swedish-giro          | ![](https://img.shields.io/badge/status-active-success.svg) | ![](https://img.shields.io/badge/status-active-success.svg) |
|sepa-credit-transfers | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | ![](https://img.shields.io/badge/status-not_supported-critical.svg) |
|international         | ![](https://img.shields.io/badge/status-in_development-yellow.svg)| ![](https://img.shields.io/badge/status-in_development-yellow.svg) |

### API Status

|Service  |Sandbox | Comment |Production | Comment |
|---------|--------------------|---|--------------------|---|
|Create Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) | Headers `PSU-IP-Address`, `PSU-User-Agent` and `PSU-Http-Method` is required by the ASPSP and must be provided | ![](https://img.shields.io/badge/status-active-success.svg) | Headers `PSU-IP-Address`, `PSU-User-Agent` and `PSU-Http-Method` is required by the ASPSP and must be provided |
|Get Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Cancel Payment Initiation | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Payment Initiation Status | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Start Payment Initiation Authorisation Process | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Payment Initiation Authorisation Sub-Resources | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Payment Initiation Authorisation SCA Status | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Update PSU Data for Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Start Payment Initiation Cancellation Authorisation Process | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Payment Initiation Cancellation Authorisation Sub-Resources | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Payment Initiation Cancellation Authorisation SCA Status | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Update PSU Data for Payment Initiation Cancellation | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
