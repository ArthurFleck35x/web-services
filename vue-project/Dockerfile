# Build Stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Serve Stage
FROM node:18-alpine

WORKDIR /app

# Copy the built files from the build stage
COPY --from=build /app/dist /app

# Install the 'serve' package globally
RUN npm install -g serve

# Expose port 5000 (default for serve)
EXPOSE 5000

# Command to run serve with fallback for history mode
CMD ["serve", "-s", ".", "-l", "5000", "--single"]
