FROM node:23-bullseye
WORKDIR /app
COPY package*.json ./
##same as npm install
RUN npm ci
COPY . ./
RUN npx prisma generate
RUN npm run build
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
