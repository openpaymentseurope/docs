---
id: ndeasess
title: Nordea (NDEASESS)
sidebar_label: Nordea
---

## Status Highlights

| Status | Product | Comment |
|:---|---|---|
|![](https://img.shields.io/badge/status-important-important.svg)| PIS | For domestic payment, ASPSP requires that `debtorAccount` is BBAN, `creditorAccount` is IBAN and all currencies must be "SEK".|
|![](https://img.shields.io/badge/status-important-important.svg)| PIS | Once the authentication/authorization process for a Payment is completed, the Payment is created and confirmed at the ASPSP. It may take up to several minutes before the payment gets the status "ACSC", this is normal and caused by delays at the ASPSP. |
|![](https://img.shields.io/badge/status-important-important.svg)| Consent, PIS | HTTP header `PSU-ID` is required by ASPSP when starting authorisation process. |
|![](https://img.shields.io/badge/status-important-important.svg)| AIS | "Read Transaction Details" not supported by ASPSP. |

## Supported SCA Methods
|Environment     |SCA Method | Authentication Method | Comment |
|----------------|----------|--------------|--------------|
|Sandbox         |Decoupled | None   | - Authentication can be done with any PSU id.<br>- Authentication is automatically approved and finalized by ASPSP directly after call to "Start the authorization process.." endpoint has been done. |
|Production      |Decoupled      | Mobilt BankID | - Mobilt BankID autostarttoken is provided, but is not required to be used when initiating the Mobilt BankID app for the authentication. |

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
|Update PSU Data for Consent | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |

## Account Information Service

### Transaction Limits

| Transaction History (Private) | Transaction List (Private) | Transaction History (Corporate) | Transaction List (Corporate) |
|---|---|---|---|
| Not disclosed by ASPSP | Not disclosed by ASPSP | Not disclosed by ASPSP | Not disclosed by ASPSP |

### API Status

|Service  |Sandbox |Comment |Production |Comment |
|---------|:--------:|--------------|:-----------:|------------|
|Get Account List | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Account Details | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Balances | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Transaction List | ![](https://img.shields.io/badge/status-active-success.svg) | Date filters are ignored and all transactions are returned. Known issue with ASPSP. | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Transaction Details | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |

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
|Create Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) | - Payments can only be done between accounts owned by same PSU.<br>- For domestic payment ASPSP requires that `debtorAccount` is BBAN, `creditorAccount` is IBAN and all currencies must be "SEK". | ![](https://img.shields.io/badge/status-active-success.svg) | For domestic payment ASPSP requires that `debtorAccount` is BBAN, `creditorAccount` is IBAN and all currencies must be "SEK". |
|Get Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Cancel Payment Initiation | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Payment Initiation Status | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Start Payment Initiation Authorisation Process | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-ID` is required by the ASPSP and must be provided in the form `yyyyMMddNNNN` | ![](https://img.shields.io/badge/status-active-success.svg) | Header `PSU-ID` is required by the ASPSP and must be provided in the form `yyyyMMddNNNN` |
|Get Payment Initiation Authorisation Sub-Resources | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Get Payment Initiation Authorisation SCA Status | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Update PSU Data for Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) |  | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Start Payment Initiation Cancellation Authorisation Process | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Payment Initiation Cancellation Authorisation Sub-Resources | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Get Payment Initiation Cancellation Authorisation SCA Status | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |
|Update PSU Data for Payment Initiation Cancellation | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP | ![](https://img.shields.io/badge/status-not_supported-critical.svg) | Not supported by ASPSP |