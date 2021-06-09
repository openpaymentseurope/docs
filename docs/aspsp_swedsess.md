---
id: aspsp_swedsess
title: Swedbank and Sparbankerna (SWEDSESS)
sidebar_label: Swedbank
---

## Status Highlights

| Status | Product | Comment |
|:---|---|---|
|![](https://img.shields.io/badge/status-important-important.svg)| Consent, PIS | HTTP headers `PSU-IP-Address` and `PSU-User-Agent` are required for `Create Consent` and `Create Payment Initiation`. |
|![](https://img.shields.io/badge/status-important-important.svg)| Consent, PIS | **Decoupled Only** If PSU has engagement in several banks that belongs to Swedbank, the `X-AffiliatedASPSP-ID` header must be sent. Please see response from [Get ASPSP Details](aspsp.md) for potential values. |
|![](https://img.shields.io/badge/status-important-important.svg)| AIS, Consent, PIS | In order to use decoupled, please send the `TPP-Redirect-Preferred` header with the value `false` to all calls to AIS, Consent and PIS endpoints. Please do not mix usage of this header, if a consent or payment was created with it specified, all subsequent calls must include it with the same value. This also applies to AIS calls which are referencing consents via the `Consent-ID` header. |
|![](https://img.shields.io/badge/status-important-important.svg)| AIS | **Sandbox** Requesting transactions over 90 days might fail if the same `dateFrom` has been used by any API user recently, resulting in a 401 response with the text `Unauthorized, request not successful. Statement requires SCA`. Please change the parameter value or wait a while before trying again. |
|![](https://img.shields.io/badge/status-important-important.svg)| PIS | `remittanceInformationUnstructured` has different max lengths depending on payment product and the specified `creditorAgent` (`BICFI` of the creditor account). Payment product `domestic` allows for up to `35` characters when `creditorAgent` is `SWEDSESS`, otherwise `10` characters. Payment product `international` allows for up to `140` characters. |

## Supported SCA Methods
|Environment     |SCA Method | Authentication Method | Status | Comment |
|----------------|----------|--------------|--------------|--------------|
|Sandbox         |OAuth Redirect | None   | ![](https://img.shields.io/badge/status-active-success.svg) | Authentication can be done with any PSU id, but must be provided. |
|Sandbox         |Decoupled | None   | ![](https://img.shields.io/badge/status-active-success.svg) | Authentication can be done with any PSU id, but must be provided. |
|Production      |OAuth Redirect | Mobilt BankID | ![](https://img.shields.io/badge/status-active-success.svg) |  |
|Production      |Decoupled | Mobilt BankID | ![](https://img.shields.io/badge/status-active-success.svg) | |

### Sandbox Test Data

* No remarks

## Consent Service

### API Status

|Service  |Sandbox | Comment |Production | Comment |
|---------|:--------:|--------------|:-----------:|------------|
|Create Consent | ![](https://img.shields.io/badge/status-active-success.svg) | Headers `PSU-IP-Address` and `PSU-User-Agent` is required by the ASPSP and must be provided | ![](https://img.shields.io/badge/status-active-success.svg) | Headers `PSU-IP-Address` and `PSU-User-Agent` is required by the ASPSP and must be provided |
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
|Create Payment Initiation | ![](https://img.shields.io/badge/status-active-success.svg) | Headers `PSU-IP-Address` and `PSU-User-Agent` is required by the ASPSP and must be provided | ![](https://img.shields.io/badge/status-active-success.svg) | Headers `PSU-IP-Address` and `PSU-User-Agent` is required by the ASPSP and must be provided |
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
