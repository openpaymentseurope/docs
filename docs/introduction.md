---
id: introduction
title: Introduction
sidebar_label: Introduction
---

## Presenting Open Payments Platform 1.0

After hard work the team at Open Payment proudly presenting our first version in production. This releases 1.0 marks a milestone as we now can offer our customer the full scope of PSD2, covering private accounts for all [supported banks](banks.md). This release allows you to access your consumer’s account information data or initiate transfers. 

The documentation cover general information on our platform as well as specific information you will need to successful integrate your solution and your customer journey with our rest API. We welcome developers to dig in and start making revolutionary new solutions, tools and services using our unified API.

Whether you are building a FinTech or accounting app, E-commerce business, ERP software, or managing a subscription service of any kind, Open Payments connects you to banks in Europe through one unified API.

### What’s the difference?

In our previous releases we only offered integration with the sandbox environment for banks. From now and going forward you will be able to, if you are a customer of ours, initiate payments, transfer of funds and collect payment data for your clients – with their approval off course. In this release you will be able to work with accounts owned by private individuals

### What can you do?

We have integrated our platform with the bank’s APIs, and no matter their version or standard of API we present a unified API to you. The service is white labeled, meaning you own your customers journey. You integrate with our unified rest API providing you with access to the payment rails. How you decide to present the customer-journey to your client is your choice and your brand. We provide a way to handle all required consumer interaction, e.g. the selection of the bank or the authorization of a payment from behind the scene. 

### How can you learn?

We have included tutorials and API references for you on how you can get started using our services and continuing use it. Those include a step by step instructions on how you will interact with the platform.

## Overview

Open Payments provides three building blocks on which you can build you bank aware application. 

The first is called [ASPSP](glossary.md) after Account Servicing Payment Service Providers. Most of these would be called banks in everyday language. This set of APIs makes it possible to discover what banks that are available for a certain country and what capabilities those banks have in the Open Payments ecosystem. Here is a [tutorial to get started](aspsp.md) with ASPSP.

Then we have Account Information where it is possible to list all accounts for a [PSU](glossary.md) (Payment Service User) and also account details like list of transactions, different identification schemes and so on. The account APIs work together with the consent API to form a building block in your application. Read more in the [consents tutorial](consent.md) and [accounts tutorial](ais.md).

Finally there is Payment Initiation where actual payments are initiated. This API uses its own idea about consent in concordance with the NextGen specification. So it is not possible to get a consent for payments from the consent APIs. Read more about how to initiate a payment in the [payment initiation tutorial](pis.md).

## Standards

The first generation of Open Payments API is based on the [Berlin Groups NextGen specification](https://www.berlin-group.org/psd2-access-to-bank-accounts). This common API standard was developed to create a uniform and interoperable communications between banks and TPPs. A client already aware of NextGen should be able to work with our platform with no or little hassle. 

For practical purposes we have broken the specification up in 4 different parts corresponding to the building stones described above. OAS3 specifications are available:

- [ASPSP](aspsp-ref.md)
- [Account Information](ais-ref.md)
- [Consent](consent-ref.md)
- [Payment Initiation](pis-ref.md)

We plan to support other standards in this field in the future - let us know your needs and we can have a dialogue about how to make it happen.
