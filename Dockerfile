FROM node:lts

WORKDIR /app/website

EXPOSE 3000 35729
COPY ./docs /app/docs
COPY ./website /app/website
COPY ./apiref /app/apiref
RUN yarn install
RUN npx redoc-cli bundle /app/apiref/openpayments-NextGenPSD2-1.3.3.yaml --options.theme.rightPanel.backgroundColor=#1d2937 --options.theme.colors.primary.main=#1d2937 --options.scrollYOffset=50
RUN mv /app/website/redoc-static.html /app/website/pages/en/openpayments-NextGenPSD2-1.3.3.html


CMD ["yarn", "start"]
