# Use official Node.js image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build the app
COPY . .
RUN npm run build

# Cloud Run defines the PORT environment variable (default 8080)
ENV PORT 8080
EXPOSE 8080

# Start the Node.js server
CMD ["npm", "start"]
