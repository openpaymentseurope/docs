FROM node:10.24

WORKDIR /app

EXPOSE 3000 35729

COPY ./website /app/
RUN npm install

COPY ./apiref /apiref
#remove old version
RUN rm -rf /app/pages/en/openpayments-NextGenPSD2-1.3.3.html
RUN npm install redoc-cli
RUN npx redoc-cli bundle /apiref/openpayments-NextGenPSD2-1.3.3.yaml --options.theme.rightPanel.backgroundColor=#1d2937 --options.theme.colors.primary.main=#1d2937 --options.scrollYOffset=50
RUN mv /app/redoc-static.html /app/pages/en/openpayments-NextGenPSD2-1.3.3.html
RUN rm -rf /apiref

COPY ./docs /docs

CMD ["yarn", "start"]