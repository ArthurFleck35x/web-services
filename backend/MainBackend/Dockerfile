FROM node:18-alpine
WORKDIR /app

# Copy package.json and package-lock.json from two levels up
COPY ../../package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy all service-specific files into the container
COPY ./backend.js /app/backend.js

# Expose the required port (modify per service)
EXPOSE 3000

# Start the service
CMD ["node", "backend.js"]

