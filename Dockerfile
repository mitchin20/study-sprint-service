# Use a smaller base image for production
FROM node:16-alpine

# Set default build argument to 'production'
ARG NODE_ENV=production

# Set environment variable based on the build argument
ENV NODE_ENV=$NODE_ENV

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Conditionally install dependencies based on the environment
# Install all dependencies (dev + prod) if NODE_ENV is 'development' or 'staging'
RUN if [ "$NODE_ENV" = "development" ] || [ "$NODE_ENV" = "staging" ]; then \
      npm install; \
    else \
      npm ci --only=production; \
    fi

# Copy the rest of the application code to the container
COPY . .

# Conditionally run build command if necessary for development or staging
RUN if [ "$NODE_ENV" = "development" ] || [ "$NODE_ENV" = "staging" ]; then \
      npm run build; \
    fi

# Expose the application port (3000)
EXPOSE 3000

# Start the application using node
CMD ["node", "src/app.js"]