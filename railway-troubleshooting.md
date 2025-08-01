# 🚨 Correção de Crashes no Railway - Guia Completo

## ✅ **Problemas Corrigidos no Código:**

### 🔧 **1. Dockerfile Corrigido:**
- ❌ **Problema:** `--only=production` (comando deprecado)  
- ✅ **Correção:** `--omit=dev`
- ❌ **Problema:** HEALTHCHECK causando conflitos
- ✅ **Correção:** Removido HEALTHCHECK problemático
- ❌ **Problema:** Usuário não-root causando problemas de permissão
- ✅ **Correção:** Simplificado para usar usuário padrão

### 🔧 **2. Servidor Corrigido:**
- ❌ **Problema:** Servidor não fazia bind para `0.0.0.0` 
- ✅ **Correção:** `app.listen(PORT, '0.0.0.0')`
- ✅ **Adicionado:** Tratamento de erros não capturados
- ✅ **Adicionado:** Graceful shutdown
- ✅ **Adicionado:** Melhor tratamento de erros na conversão

## 🚀 **Como Resolver no Railway:**

### **Passo 1: Force um Novo Deploy**
1. Acesse [Railway.app](https://railway.app)
2. Entre no seu projeto `Api-webscrapping`
3. Vá na aba **"Deployments"**
4. Clique em **"Deploy Latest"** ou **"Redeploy"**

### **Passo 2: Verifique os Logs**
1. Na aba **"Deployments"**, clique no deploy mais recente
2. Vá na aba **"Build Logs"** para ver se o build foi bem-sucedido
3. Vá na aba **"Deploy Logs"** para ver se o app está rodando

### **Passo 3: Teste a API**
```bash
# Teste health check
curl https://api-webscrapping-production-d46a.up.railway.app/health

# Teste conversão
curl -X POST https://api-webscrapping-production-d46a.up.railway.app/convert \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

## 📋 **Logs que Indicam Sucesso:**

Você deve ver nos logs do Railway:
```
🚀 Servidor rodando na porta 3000
📝 Acesse http://localhost:3000 para ver informações da API
🔗 Use POST /convert para converter URLs em Markdown
```

## 🔍 **Se Ainda Houver Problemas:**

### **Verificar Variáveis de Ambiente:**
1. No Railway, vá em **"Variables"**
2. Certifique-se de que `PORT` está definida (geralmente é automática)

### **Verificar Build Logs:**
Se o build falhar, procure por:
- ❌ `npm ci` falhando → Problema no package-lock.json
- ❌ `COPY` falhando → Problema nos arquivos
- ❌ `CMD` falhando → Problema no comando de start

### **Verificar Deploy Logs:**
Se o deploy falhar, procure por:
- ❌ `Error: listen EADDRINUSE` → Porta já em uso (improvável no Railway)
- ❌ `Module not found` → Problema nas dependências
- ❌ `Cannot read property` → Erro no código

## 🛠️ **Comando para Testar Localmente:**

```bash
# Clone as correções
git pull origin main

# Teste local
npm install
npm start

# Teste Docker local
docker build -t api-test .
docker run -p 3000:3000 api-test
```

## 📞 **Se Precisar de Mais Ajuda:**

1. **Copie os logs de erro** do Railway
2. **Verifique se o GitHub está sincronizado** com as correções
3. **Force novo deploy** após confirmar que as correções estão no repositório

## ✅ **Checklist Final:**

- [ ] Código corrigido enviado para GitHub
- [ ] Railway fez novo deploy automaticamente ou foi forçado
- [ ] Logs mostram servidor rodando na porta 3000
- [ ] Health check responde com status 200
- [ ] Endpoint /convert funciona com URLs de teste

---

**🎯 Com essas correções, a API deve funcionar perfeitamente no Railway!** 