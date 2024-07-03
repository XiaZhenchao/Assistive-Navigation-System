# Use the official Node.js image to build the React app
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
# RUN npm run build

# Use a smaller base image to serve the built files
# FROM node:16-alpine

# Set the working directory inside the container
# WORKDIR /app

# Install 'serve' globally to serve the static files
# RUN npm install -g serve

# Copy the built files from the previous stage
# COPY --from=build /app/build /app/build

# Set environment variables
# ENV NODE_ENV=production
# ENV PORT=3000

# Expose the port the app runs on
# EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
