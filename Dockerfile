# Use the official Node.js runtime as the base image
FROM node:22 as build
# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the entire application code to the container
COPY . .

RUN npm run build
# Use Nginx as the production server
FROM nginx:alpine
# Copy the built React app to Nginx's web server directory
COPY --from=build /app/dist /usr/share/nginx/html
# Copy the custom nginx.conf into the container
COPY nginx/nginx.conf /etc/nginx/nginx.conf
# Expose port 80 for the Nginx server
EXPOSE 80
# Start Nginx when the container runs
#CMD ["nginx", "-g", "daemon off;"]