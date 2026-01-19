FROM node:22.15.0-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 5173

# Docker healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s CMD curl -f http://localhost:3000/health || exit 1

CMD ["npm", "run", "dev", "--", "--host"]
