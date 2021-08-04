FROM node:14.17-buster-slim

# Install dependencies
RUN apt-get update \
    && mkdir -p /usr/share/man/man1 \
    && apt-get install -y default-jre \
    && rm -rf /var/lib/apt/lists/*

# Install the Firebase tools
RUN npm install -g firebase-tools

# Create the necessary folders
WORKDIR /app
RUN mkdir functions

# Install the dependencies
COPY ./functions/package*.json ./functions/
RUN npm ci --no-optional --prefix functions

# Coppy the application files into the container
COPY . .

# Add an entrypoint to be executed every time the container starts
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Start the main process
CMD ["firebase", "emulators:start", "--project", "demo-num"]
