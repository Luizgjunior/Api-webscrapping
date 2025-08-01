# Use a imagem oficial Node.js Alpine para um build leve (versão específica estável)
FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas package.json e package-lock.json primeiro para aproveitar o cache do Docker
COPY package*.json ./

# Instala as dependências (corrigido comando deprecado)
RUN npm ci --omit=dev && npm cache clean --force

# Copia o código da aplicação
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Define variáveis de ambiente para produção
ENV NODE_ENV=production
ENV PORT=3000
ENV NODE_OPTIONS="--no-deprecation --max-old-space-size=512"

# Comando para iniciar a aplicação
CMD ["node", "--no-deprecation", "index.js"] 