---
id: introduction
title: Introduction
sidebar_label: Introduction
---

Whether you are building a FinTech or accounting app, E-commerce business, ERP software, or managing a subscription service of any kind, Open Payments connects you to banks in Europe through one single unified API.

The Open Payments Platform provides a PSD2 compliant API for aggregated use for all [supported banks](banks.md).
We take care of the hassle of bank integration so you can focus on your core business.

## Overview

Open Payments provides three building blocks on which you can build you bank aware application. 

The first is called ASPSP after Account Servicing Payment Service Providers. Most of these would be called banks in everyday language. This set of APIs makes it possible to discover what banks that are available for a certain country and what capabilities those banks have in the Open Payments ecosystem. Here is a [tutorial to get started](aspsp.md) with ASPSP.

Then we have Account Information where it is possible to list all accounts for a PSU (Payment Service User) and also account details like list of transactions, different identification schemes and so on. The account APIs work together with the consent API to form a building block in your application. Read more in the [consents tutorial](consent.md) and [accounts tutorial](ais.md).

Finally there is Payment Initiation where actual payments are initiated. This API uses its own idea about consent in concordance with the NextGen specification. So it is not possible to get a consent for payments from the consent APIs. Read more about how to initiate a payment in the [payment initiation tutorial](pis.md).

## Standards

The first generation of Open Payments API is based on the Berlin Groups NextGen specification. This common API standard was developed to create a uniform and interoperable communications between banks and TPPs. A client already aware of NextGen should be able to work with our platform with no or little hassle. 

For practical purposes we have broken the specification up in 4 different parts corresponding to the building stones described above. OAS3 specifications are available:

- [ASPSP](aspsp-ref.md)
- [Account Information](ais-ref.md)
- [Consent](consent-ref.md)
- [Payment Initiation](pis-ref.md)

We plan to support other standards in this field in the future - let us know your needs and we can have a dialogue about how to make it happen.
