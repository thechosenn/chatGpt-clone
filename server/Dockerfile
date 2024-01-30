# Stage 1: Build the application

# Use an official Node runtime as a parent image
FROM node:18-alpine as builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock if you use yarn)
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Your app might build some files, uncomment if so
# RUN npm run build

# Stage 2: Run the application

# Use a smaller node image to run the app
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy the node modules and build from the previous stage
COPY --from=builder /usr/src/app .

# Your app binds to port 8080 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 8080

# Define command to run the app
CMD [ "npm", "start" ]
