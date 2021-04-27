---
id: getstarted
title: Get started
sidebar_label: Get started
---

To integrate to Open Payments's API you need to do the following steps. If you only want to test the sandbox environment, step 1-3 is enough.

### 1. Sign up in the Developer Portal

Click [this link](https://developer.openpayments.io/) and follow the instructions.

### 2. Get credentials to access Sandbox

Access our API in our test envorinment by creating an application in Sandbox. You will then acquire credentials for the sandbox API so that you can try out our API with test data. There are some limitations in Sandbox but you will get a good picture of what you can do with our API’s to build the scope for your solution.

### 3. Request production access

To access the production environment, you need to provide additional information about your company. This is done by clicking
Request Production access in the Developer Portal. Go through every step and supply the requested information. We will process
your request within a day. Once your company is approved, you will receive an email.

### 4. Download your client certificate

All requests you make to the Open Payments production API need to include a client certificate that is unique to your organisation.
Once you have production access you can download your certificate in the Developer Portal.

### 5. Get credentials to access Production

First, make sure the switch "View sandbox data" in the menu is unchecked.
Create a new application by clicking "Applications" in the Developer Portal and then press "Create your first application".
An application represents the credentials you'll use to access our API as well as which parts of our API you have access to.

1. Enter a name for your application in "Application name". This field is just visible to your organisation internally and will never show up
   for your customers.
2. In "API products" you choose what scope of our API this application should have access to.
3. In "Redirect URI whitelist" you add the redirect URIs that are valid for your application. Some banks use redirect flow for authentication, meaning that the user will be redirected to the bank’s external page. Once the user has authenticated, the bank will redirect back to your application by a URI you supply. This URI needs to be whitelisted in “Redirect URI whitelist”.

Click “Create application” to create your application. You will now see a confirmation screen that holds your client secret. Save this secret somewhere safe. Once you close this dialogue you will be unable to retrieve it again, in which case you need to create a new application.

You’re now ready to integrate to our production API. Check out our guides on how to get started.

[Account information](ais)

[Payment initiation](pis)
