---
id: api
title: Getting Started with the API
sidebar_label: Getting started with the API
---


## Introduction

Skriva några rader om vad APIet kan göra på en högre nivå. Finns det några tekniska detaljer som behöver finnas med redan här? Skriva vilka olika produkter som finns i APIet, dvs ASPSP, Accout, Payment, Consent(vilket måste förtydligas att det bara rör Accounts).

## About this guide
Skriv några rader om hur guiden är uppbyggd. Den visar de anrop man behöver göra för att uppnå en viss sak. Den visar de headers som behöver följa med, samt exempel-request-bodys, samt det response man behöver för att fortsätta.



## Prerequisites

Follow the [Get started](getstarted) guide to set up an account and create an application.

### ASPSP
The terms "ASPSP" (Account Servicing Payment Service Provider) and "bank" will be used interchangeably in this guide.

### Certificate
If you use the production environment, you should attach the certificate you downloaded from the Developer Portal when making API requests. Vad mer skriva?


### Consent
A Consent is an object that holds information about what permissions a user has given you to get its account information from a particular bank.

### Explicit scopes for Private and Corporate contexts
Your requests will operate in either a "private" or a "corporate" context in our platform. This is an abstraction layer provided by our platform so that you need to know less about how specific banks are implementing and separating private/corporate access to account information and payment operations.
The context is selected by specifying an additional "private" or "corporate" scope when requesting an access token from our auth endpoint. The examples in our tutorials shows how it can be done.

### SCA approaches

SCA stands for Strong customer authentication. Required by end user (account holder) every time a consent is created, or a payment is initiated. There are two SCA approaches that the application needs to implement in order to support all banks: Decoupled and Redirect.

In the **Redirect** approach, you route the user to the chosen bank where the user authenticates, and once that’s done the bank will route the user back to your application.

In the **Decoupled** approach, the user stays in your application where you generate a QR code or a link for Mobile Bank ID.

### X-Request-ID

All calls accept a header called `X-Request-ID` - this should be set to a newly generated guid. Denoted in the code with [GUID]. If your client is also a platform it would make sense to accept such an id from the client that calls you. This id is used to trace requests through our systems. Logging it somewhere together with the request will make troubleshooting much easier.
