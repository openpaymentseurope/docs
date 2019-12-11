---
id: ndeasess
title: Nordea (NDEASESS)
sidebar_label: Nordea
---

## Status Highlights

* HTTP header PSU-ID is required by the ASPSP in the form `yyyyMMddNNNN` when calling "Start the authorization process.." or "Update PSU Data.." both for Payment and Consent.

* Once the authentication/authorization process for a Payment is completed, the Payment is created and confirmed at the ASPSP. It may take up to several minutes before the payment gets the status "ACSC", this is normal and caused by delays at the ASPSP.

* "Read Transaction Details" not supported by ASPSP.

## Supported SCA Methods
|Environment     |Supported SCA Method     | Authentication Method | Notes |
|----------------|---------------|--------------|--------------|
|Sandbox         |Decoupled      | None   | Authentication is automatically approved and finalized by ASPSP directly after call to "Start the authorization process.." endpoint has been done.|
|Production      |Decoupled      | Mobilt BankID | Mobilt BankID autostarttoken is provided, but is not required to be used when initiating the Mobilt BankID app for the authentication. |


## Payment Initiation Service

### Supported Payment Products

|Product               |Sandbox             |Production          |
|----------------------|:------------------:|:------------------:|
|domestic              | :white_check_mark: | :white_check_mark: |
|sepa-credit-transfers | :x:                | :x:                |
|international         | :x:                | :x:                |

### API Compliance

|Service  |Sandbox |Sandbox Notes |Production |Production Notes |
|---------|:--------:|--------------|:-----------:|------------|
|Payment initiation request | :white_check_mark: | Payments can only be done between accounts owned by same PSU | :white_check_mark: | For domestic payment ASPSP requires that `debtorAccount` is BBAN, `creditorAccount` is IBAN and all currencies must be "SEK" |
|Get Payment Information | :white_check_mark: |  | :white_check_mark: |  |
|Payment Cancellation Request | :x: | Not supported by ASPSP | :x: | Not supported by ASPSP |
|Payment initiation status request | :white_check_mark: |  | :white_check_mark: |  |
|Start the authorization process for a payment initiation | :white_check_mark: | Header **PSU-ID** is required by the ASPSP and must be provided in the form `yyyyMMddNNNN` | :white_check_mark: | Header **PSU-ID** is required by the ASPSP and must be provided in the form `yyyyMMddNNNN` |
|Get Payment Initiation authorization Sub-Resources Request | :white_check_mark: |  | :white_check_mark: |  |
|Get the SCA Status of the payment authorization | :white_check_mark: |  | :white_check_mark: |  |
|Update PSU data for payment initiation | :white_check_mark: | Header **PSU-ID** is required by the ASPSP and must be provided in the form `yyyyMMddNNNN` | :white_check_mark: | Header **PSU-ID** is required by the ASPSP and must be provided in the form `yyyyMMddNNNN` |
|Start the authorization process for the cancellation of the addressed payment | :x: | Not supported by ASPSP | :x: | Not supported by ASPSP |
|Get Cancellation authorizations | :x: | Not supported by ASPSP | :x: | Not supported by ASPSP |
|Get status of the payment cancellation's authorization | :x: | Not supported by ASPSP | :x: | Not supported by ASPSP |
|Update PSU Data for payment initiation cancellation | :x: | Not supported by ASPSP | :x: | Not supported by ASPSP |

## Consent Service

### API Compliance

|Service  |Sandbox |Sandbox Notes |Production |Production Notes |
|---------|:--------:|--------------|:-----------:|------------|
|Create consent | :white_check_mark: |  | :white_check_mark: |  |
|Get Consent Request | :white_check_mark: |  | :white_check_mark: |  |
|Delete Consent | :white_check_mark: |  | :white_check_mark: |  |
|Consent status request | :white_check_mark: |  | :white_check_mark: |  |
|Start the authorisation process for a consent | :white_check_mark: | Header **PSU-ID** is required by the ASPSP and must be provided in the form `yyyyMMddNNNN` | :white_check_mark: | Header **PSU-ID** is required by the ASPSP and must be provided in the form `yyyyMMddNNNN` |
|Get Consent Authorisation Sub-Resources Request | :white_check_mark: |  | :white_check_mark: |  |
|Read the SCA status of the consent authorisation | :white_check_mark: |  | :white_check_mark: |  |
|Update PSU Data for consents | :white_check_mark: | Header **PSU-ID** is required by the ASPSP and must be provided in the form `yyyyMMddNNNN` | :white_check_mark: | Header **PSU-ID** is required by the ASPSP and must be provided in the form `yyyyMMddNNNN` |


## Account Information Service

### API Compliance

|Service  |Sandbox |Sandbox Notes |Production |Production Notes |
|---------|:--------:|--------------|:-----------:|------------|
|Read Account List | :white_check_mark: |  | :white_check_mark: |  |
|Read Account Details | :white_check_mark: |  | :white_check_mark: |  |
|Read Balance | :white_check_mark: |  | :white_check_mark: |  |
|Read transaction list of an account | :white_check_mark: | Date filters are ignored and all transactions are returned. Known issue with ASPSP. | :white_check_mark: |  |
|Read Transaction Details | :x: | Not supported by ASPSP | :x: | Not supported by ASPSP |


## Data Access

| | |
|---------|------------|
|Transaction History Limits (Private) | Not disclosed by ASPSP |
|Transaction List Limits (Private) | Not disclosed by ASPSP |

## Sandbox Test Data

* No remarks
