FROM node:18-alpine
WORKDIR /app

# Copy package.json and package-lock.json from two levels up
COPY ../../package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy all service-specific files into the container
COPY ./fetchRates.js /app/fetchRates.js

# Expose the required port (modify per service)
EXPOSE 5001

# Start the service
CMD ["node", "fetchRates.js"]

