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
# Build the React app for production
# # Build the React app for production, passing environment variables
# ARG REACT_APP_URL
# ENV REACT_APP_URL=$REACT_APP_URL
# ARG REACT_APP_CLIENT_ID
# ENV REACT_APP_CLIENT_ID=$REACT_APP_CLIENT_ID
# ARG REACT_APP_SCOPE
# ENV REACT_APP_SCOPE=$REACT_APP_SCOPE
RUN npm run build
# Use Nginx as the production server
FROM nginx:alpine
# Copy the built React app to Nginx's web server directory
COPY --from=build /app/build /usr/share/nginx/html
# Expose port 80 for the Nginx server
EXPOSE 80
# Start Nginx when the container runs
#CMD ["nginx", "-g", "daemon off;"]