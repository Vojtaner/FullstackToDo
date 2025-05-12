FROM node:23-bullseye-slim
ENV PORT=8080
ENV host=0.0.0.0
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run","dev"]