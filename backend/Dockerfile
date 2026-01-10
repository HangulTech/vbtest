FROM node:20-slim

RUN apt-get update && apt-get install -y openssl

WORKDIR /app

# 1. Copy package files
COPY package*.json ./
RUN npm install --include=dev


# 2. Copy Prisma schema separately
COPY src/prisma ./src/prisma

# 3. Generate Prisma CLIENT INSIDE Docker
RUN npx prisma generate

# 4. Copy rest of the app
COPY . .

# 5. Build app
RUN npm run build

CMD ["npm", "run", "start:prod"]
