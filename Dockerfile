# Use a imagem oficial Node.js Alpine para um build leve
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas package.json e package-lock.json primeiro para aproveitar o cache do Docker
COPY package*.json ./

# Instala as dependências
RUN npm ci --only=production && npm cache clean --force

# Copia o código da aplicação
COPY . .

# Cria um usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001

# Muda a propriedade dos arquivos para o usuário não-root
RUN chown -R nodeuser:nodejs /app
USER nodeuser

# Expõe a porta 3000
EXPOSE 3000

# Define variáveis de ambiente para produção
ENV NODE_ENV=production
ENV PORT=3000

# Comando de saúde para verificar se a aplicação está funcionando
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Comando para iniciar a aplicação
CMD ["node", "index.js"] 