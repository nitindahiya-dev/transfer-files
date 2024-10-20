# Use the official Node.js image as a base
FROM node:18-alpine

# Set the working directory to /app inside the container
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the frontend code to the container
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port that the Next.js app runs on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
