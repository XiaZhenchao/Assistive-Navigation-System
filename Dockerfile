# Use the official Node.js image to build the React app
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app
ENV HOST 0.0.0.0
# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .
EXPOSE 4173
# Start the application
# CMD ["npm", "run", "dev"] --bind 0.0.0.0:$PORT
CMD ["npm", "run", "preview"]