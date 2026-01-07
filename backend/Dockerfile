FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy source
COPY backend/ ./

# Generate Prisma client
RUN npx prisma generate

# Build NestJS (this will create dist/)
RUN npx nest build

EXPOSE 3000

CMD ["node", "dist/main.js"]
