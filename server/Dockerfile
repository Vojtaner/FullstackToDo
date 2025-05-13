FROM node:23-bullseye
WORKDIR /app
COPY package*.json ./
##same as npm install
RUN npm ci
RUN npx prisma generate
COPY . ./
RUN npm run build
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
