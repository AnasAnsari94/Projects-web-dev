# Use a lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better Docker caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the app
COPY . .

# Expose port 5000 (make sure this matches server.js)
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]

