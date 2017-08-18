FROM nginx:alpine
MAINTAINER zbcjackson <zbcjackson@gmail.com>

COPY nginx/bbuddy.conf /etc/nginx/conf.d/bbuddy.conf
COPY dist/ /srv/www/
