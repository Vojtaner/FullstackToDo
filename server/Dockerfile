FROM node:23-bullseye
WORKDIR /app
COPY package*.json ./
ENV PORT=8080
##same as npm install
RUN npm ci
COPY . ./
# RUN npx prisma generate
RUN npm run build
CMD ["sh", "-c", "echo Running migrations... && npx prisma migrate deploy && echo Starting server... && npm run start:deploy"]

