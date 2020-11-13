# Description
Public documentation of OpenPayments API based on NextGet PSD2 1.3.3
# How to run locally
## Manual
* Install npm
```shell script
> brew install npm
```
* Install yarn
```shell script
> brew install yarn
```
* Install ReDoc
```shell script
> npm install redoc --save
> npm install -g npx
```
* Install npm packages
```shell script
> cd docs/website/
> npm install
```
* Generate Redoc html doc from OAS3 yaml file
```shell script
> cd docs/apiref/
> npx redoc-cli bundle ./openpayments-NextGenPSD2-1.3.3.yaml --options.theme.rightPanel.backgroundColor=#1d2937 --options.theme.colors.primary.main=#1d2937 --options.scrollYOffset=50
> mv ./redoc-static.html ../website/pages/en/openpayments-NextGenPSD2-1.3.3.html
```
* Browse and review the documentation
```shell script
> yarn start
```
## Docker
Just build and run container:
```shell script
> docker build --force-rm --no-cache -t docs .
> docker run -it -p 3000:3000 docs
```
# Deploy documentation to Azure App Service
Build and package documentation
```shell script
> yarn build
> cd build/
> zip -r docs.zip docs
```
Go to Azure Portal and access subscription "Open Banking Platform - Sandbox"

Select App Service resource "openbankingplatform-docs"

Select "Advanced Tools"->"Go"

From top menu, select "Debug console->CMD"

Drag and drop your local `docs.zip` file from Finder to the browser window (which will display an area to drop: "Drag here to upload and unzip")

In the browser App Service shell window:
```shell script
> mv docs site/
> cd site
> mv wwwroot wwwroot_x
> mv docs wwwroot
> cp web.config wwwroot/
```