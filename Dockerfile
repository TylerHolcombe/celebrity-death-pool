### build ###
FROM node:12.16.3 as build
WORKDIR /app

# Install all node_modules into working dir
COPY . /app
RUN npm install
RUN npm install -g @angular/cli@9.1.12
RUN ng build --prod=true --output-path=dist

### deploy ###
FROM nginx:1.18.0-alpine
# Copy build and configuration
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf
# Expose ports
EXPOSE 8080
# Start the server
CMD ["nginx", "-g", "daemon off;"]
