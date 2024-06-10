# Use a Node.js image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Expose port 3000 to the outside world
EXPOSE 5173

# Command to run the application
CMD ["npm", "run", "dev","--","--host","0.0.0.0"]
