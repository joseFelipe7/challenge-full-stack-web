# Use a imagem de Node.js como base
FROM node:20.14-alpine AS base

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependência do projeto e instale as dependências
COPY package*.json ./
RUN npm install

# Instale o ts-node-dev globalmente (se necessário)
RUN npm install -g ts-node-dev

# Exponha a porta necessária pelo servidor (se necessário)
EXPOSE 3030

# Comando padrão para iniciar o servidor usando ts-node-dev
CMD ["npm", "run", "dev"]
