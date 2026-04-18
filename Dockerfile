# Use an official Node.js runtime as a base image
FROM node:alpine3.23
# Set the working directory in the container
WORKDIR /app
# Copy the application code to the container
COPY . /app
# Install the application dependencies
RUN npm install
# Expose the port that the application will run on
EXPOSE 3000
# Define the command to run the application
CMD ["node", "server.js"]