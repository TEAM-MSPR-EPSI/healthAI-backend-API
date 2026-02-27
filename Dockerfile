FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

# Installer toutes les dépendances, y compris devDependencies
RUN npm install

COPY . .

EXPOSE 5000

# Utiliser nodemon en dev, npm start sinon
CMD ["npm", "start"]
# CMD ["sh", "-c", "if [ \"$NODE_ENV\" = 'development' ]; then npx nodemon app.js; else npm start; fi"]