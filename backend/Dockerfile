# syntax=docker/dockerfile:1.4

# Update This Line To Specific Node Version For Deployment
FROM node:lts AS development

# Docker Image Default Production
# Docker Compose Default Development
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Node Port 80
# Test/Debug Ports 9229 and 9230
ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT 9229 9230

# Setup Dist Folder
# Install `package-lock.json` Modules
WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm ci

# Set 30s Health Check
# Checks For Response Code 200
HEALTHCHECK --interval=30s \
  CMD node healthcheck.js

# Copy Project To Dist Folder
COPY . /code

# To Catch Shutdown Docker Signals 
# Use `docker run --init in production` Instead Of `npm start`
# Notes: `--init` Throws Startup Code Which Properly Passes Kernel Signals
CMD [ "node", "src/index.js" ]

FROM development as dev-envs
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF

# Install Docker Tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /