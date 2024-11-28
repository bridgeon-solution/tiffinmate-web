# Step 1: Build the app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

# Copy the rest of the application
COPY . .

# Build the Vite app
RUN npm run build

# Step 2: Serve the app
FROM nginx:alpine

# Copy the build output from the previous step
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx server to serve the app
CMD ["nginx", "-g", "daemon off;"]
