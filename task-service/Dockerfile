# user-service/Dockerfile
FROM node:24-alpine

# Crée le dossier de travail
WORKDIR /app

# Copie package.json et package-lock.json (si existants)
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste du code source
COPY . .

# Expose le port utilisé par Express
EXPOSE 3001

# Démarre ton app
CMD ["node", "index.js"]
