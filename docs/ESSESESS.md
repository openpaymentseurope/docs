---
title: SEB
root: "/docs"
parents: ["Introduction"]
prio: 0
---

# Skandinaviska Enskilda Banken - SE<br>ESSESESS

## Status Highlights

* ##### The Payment Initiation Service flow is currently non-functional in both the sandbox and production environments of the ASPSP due to a defect in the systems.
* ##### HTTP header PSU-ID is required by the ASPSP when calling "Start the authorization process.." both for Payment and Consent.

## Supported SCA Methods
|Environment     |Supported SCA Method     | Authentication Method | Notes |
|----------------|---------------|--------------|--------------|
|Sandbox         |OAuth Redirect | None   | Authentication must be done with specific PSU id's. See Sandbox Test Data below.|
|Production      |Decoupled      | Mobilt BankID | - PSU must authenticate with Mobilt BankID app within 30 sec. or SCA will fail.<br> - Mobilt BankID autostarttoken is provided, but is not required to be used when initiating the Mobilt BankID app for the authentication. |


## Payment Initiation Service

#### Supported Payment Products

|Product               |Sandbox             |Production          |
|----------------------|:------------------:|:------------------:|
|domestic              | :white_check_mark: | :white_check_mark: |
|sepa-credit-transfers | :x:                | :x:                |
|international         | :x:                | :x:                |

#### API Compliance

|Service  |Sandbox |Sandbox Notes |Production |Production Notes |
|---------|:--------:|--------------|:-----------:|------------|
|Payment initiation request | :white_check_mark: |  | :white_check_mark: |  |
|Get Payment Information | :white_check_mark: |  | :white_check_mark: |  |
|Payment Cancellation Request | :x: | Not supported by ASPSP | :x: | Not supported by ASPSP |
|Payment initiation status request | :white_check_mark: |  | :white_check_mark: |  |
|Start the authorization process for a payment initiation | :white_check_mark: | Header **PSU-ID** is required by the ASPSP and must be provided in the form `yyMMddNNNN` | :white_check_mark: | Header **PSU-ID** is required by the ASPSP and must be provided in the form `yyMMddNNNN` |
|Get Payment Initiation authorization Sub-Resources Request | :white_check_mark: |  | :white_check_mark: |  |
|Get the SCA Status of the payment authorization | :white_check_mark: | :heavy_exclamation_mark:Currently non-functional at ASPSP | :white_check_mark: | :heavy_exclamation_mark:Currently non-functional at ASPSP |
|Update PSU data for payment initiation | :white_check_mark: |  | :white_check_mark: |  |
|Start the authorization process for the cancellation of the addressed payment | :x: | Not supported by ASPSP | :x: | Not supported by ASPSP |
|Get Cancellation authorizations | :x: | Not supported by ASPSP | :x: | Not supported by ASPSP |
|Get status of the payment cancellation's authorization | :x: | Not supported by ASPSP | :x: | Not supported by ASPSP |
|Update PSU Data for payment initiation cancellation | :x: | Not supported by ASPSP | :x: | Not supported by ASPSP |

## Consent Service

#### API Compliance

|Service  |Sandbox |Sandbox Notes |Production |Production Notes |
|---------|:--------:|--------------|:-----------:|------------|
|Create consent | :white_check_mark: |  | :white_check_mark: |  |
|Get Consent Request | :white_check_mark: |  | :white_check_mark: |  |
|Delete Consent | :white_check_mark: |  | :white_check_mark: |  |
|Consent status request | :white_check_mark: |  | :white_check_mark: |  |
|Start the authorisation process for a consent | :white_check_mark: | Header **PSU-ID** is required by the ASPSP and must be provided in the form `yyMMddNNNN` | :white_check_mark: | Header **PSU-ID** is required by the ASPSP and must be provided in the form `yyMMddNNNN` |
|Get Consent Authorisation Sub-Resources Request | :white_check_mark: |  | :white_check_mark: |  |
|Read the SCA status of the consent authorisation | :white_check_mark: |  | :white_check_mark: |  |
|Update PSU Data for consents | :white_check_mark: |  | :white_check_mark: |  |


## Account Information Service

#### API Compliance

|Service  |Sandbox |Sandbox Notes |Production |Production Notes |
|---------|:--------:|--------------|:-----------:|------------|
|Read Account List | :white_check_mark: |  | :white_check_mark: |  |
|Read Account Details | :white_check_mark: |  | :white_check_mark: |  |
|Read Balance | :white_check_mark: |  | :white_check_mark: |  |
|Read transaction list of an account | :white_check_mark: |  | :white_check_mark: |  |
|Read Transaction Details | :white_check_mark: | Transaction details work only for few transactions in the ASPSP sandbox environment and will return 404 for most of them. | :white_check_mark: |  |


## Data Access

| | |
|---------|------------|
|Transaction History Limits (Private) | Not disclosed by ASPSP |
|Transaction List Limits (Private) | Not disclosed by ASPSP |

## Sandbox Test Data

* All data will be reset each Sunday at midnight by the ASPSP in the sandbox environment.

* When performing SCA in the sandbox environment, one of the following PSU id's (personnummer) must be used for authentication:
  * 9311219639
  * 9311219589
  * 8811215477
  * 8811212862
  * 8311211356
* Transaction details work only for few transactions in the ASPSP sandbox environment and will return 404 for most of them.
