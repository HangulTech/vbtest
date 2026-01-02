FROM node:20-slim

# Install OpenSSL (required by Prisma)
RUN apt-get update -y && apt-get install -y openssl

# App directory
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy backend source
COPY backend/ ./

# Generate Prisma client INSIDE container
RUN npx prisma generate

# Build NestJS
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
