### build ###
FROM node:12.16.3 as build
WORKDIR /app

# Install all node_modules into working dir
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@9.1.12

# Copy full app over and build as prod
COPY . /app
RUN ng build --prod=true --output-path=dist

### deploy ###
FROM nginx:1.18.0-alpine
# Remove default page
RUN rm -rf /usr/share/nginx/html/*
# Copy build and configuration
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf
# Expose ports
EXPOSE 80
# Start the server
CMD ["nginx", "-g", "daemon off;"]
