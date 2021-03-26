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
> docker run -it --rm -p 3000:3000 docs
```

## Create new docs version

### On your local machine
```shell script
> yarn run version 1.0.15
```
### Via docker integration
```shell script
> docker run -it --rm -p 3000:3000 -v /Users/nikolaykrondev/Desktop/Projects/github/openpaymentseurope/docs/website:/src node sh
> cd /src
> npm install
> yarn run version 1.0.15
```