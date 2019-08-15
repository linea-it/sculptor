FROM node:8.10 as builder
COPY . /src/app
WORKDIR /src/app
RUN yarn -v
RUN yarn --ignore-optional
RUN yarn run build
FROM nginx:latest
RUN chgrp nginx /var/cache/nginx/
RUN chmod -R g+w /var/cache/nginx/
RUN sed --regexp-extended --in-place=.bak 's%^pid\s+/var/run/nginx.pid;%pid /var/tmp/nginx.pid;%' /etc/nginx/nginx.conf
COPY --from=builder /src/app/build /var/www/science-products
RUN chgrp nginx /var/www/science-products
RUN chmod -R g+w /var/www/science-products
COPY nginx-proxy.conf /etc/nginx/conf.d/default.conf

# RUNTIME ENV
COPY env.sh /var/www/science-products/
COPY .env.template /var/www/science-products/.env
RUN chmod +x /var/www/science-products/env.sh
WORKDIR /var/www/science-products

# Start Nginx server recreating env-config.js
CMD ["/bin/bash", "-c", "/var/www/science-products/env.sh && nginx -g \"daemon off;\""]
