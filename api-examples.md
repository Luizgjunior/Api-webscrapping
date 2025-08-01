# 🌐 API Web Scraping - Exemplos de Uso em Produção

**URL de Produção:** `https://api-webscrapping-production-d46a.up.railway.app`

## 🚀 Endpoints Disponíveis

### 1. **Health Check**
```bash
curl https://api-webscrapping-production-d46a.up.railway.app/health
```

**Resposta:**
```json
{
  "status": "OK",
  "message": "API de Web Scraping funcionando",
  "timestamp": "2025-01-08T17:30:00.000Z"
}
```

### 2. **Informações da API**
```bash
curl https://api-webscrapping-production-d46a.up.railway.app/
```

**Resposta:**
```json
{
  "name": "API Web Scraping para Markdown",
  "version": "1.0.0",
  "endpoints": {
    "POST /convert": "Converte conteúdo de uma URL para Markdown",
    "GET /health": "Verifica status da API",
    "GET /": "Informações da API"
  },
  "usage": {
    "method": "POST",
    "url": "/convert",
    "body": { "url": "https://exemplo.com" },
    "response": "Conteúdo em Markdown"
  }
}
```

### 3. **Conversão de URL para Markdown** ⭐

#### Exemplo com cURL:
```bash
curl -X POST https://api-webscrapping-production-d46a.up.railway.app/convert \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

#### Exemplo com JavaScript/Fetch:
```javascript
const response = await fetch('https://api-webscrapping-production-d46a.up.railway.app/convert', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://github.com'
  })
});

const markdown = await response.text();
console.log(markdown);
```

#### Exemplo com Python:
```python
import requests

url = "https://api-webscrapping-production-d46a.up.railway.app/convert"
payload = {"url": "https://stackoverflow.com"}
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)
markdown_content = response.text
print(markdown_content)
```

#### Exemplo com Postman:
1. **Método:** `POST`
2. **URL:** `https://api-webscrapping-production-d46a.up.railway.app/convert`
3. **Headers:** 
   - `Content-Type: application/json`
4. **Body (raw JSON):**
```json
{
  "url": "https://news.ycombinator.com"
}
```

## 📝 Exemplos de URLs para Testar

### Sites de Notícias:
```bash
curl -X POST https://api-webscrapping-production-d46a.up.railway.app/convert \
  -H "Content-Type: application/json" \
  -d '{"url": "https://techcrunch.com"}'
```

### Documentação:
```bash
curl -X POST https://api-webscrapping-production-d46a.up.railway.app/convert \
  -H "Content-Type: application/json" \
  -d '{"url": "https://nodejs.org/en/docs"}'
```

### Artigos do Medium:
```bash
curl -X POST https://api-webscrapping-production-d46a.up.railway.app/convert \
  -H "Content-Type: application/json" \
  -d '{"url": "https://medium.com/@autor/artigo"}'
```

### Wikipedia:
```bash
curl -X POST https://api-webscrapping-production-d46a.up.railway.app/convert \
  -H "Content-Type: application/json" \
  -d '{"url": "https://pt.wikipedia.org/wiki/Node.js"}'
```

## ⚡ Teste Rápido no Terminal

### Windows (PowerShell):
```powershell
Invoke-RestMethod -Uri "https://api-webscrapping-production-d46a.up.railway.app/convert" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"url": "https://example.com"}'
```

### Linux/Mac:
```bash
curl -X POST https://api-webscrapping-production-d46a.up.railway.app/convert \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}' | head -20
```

## 🛡️ Tratamento de Erros

### URL Inválida:
```bash
curl -X POST https://api-webscrapping-production-d46a.up.railway.app/convert \
  -H "Content-Type: application/json" \
  -d '{"url": "url-invalida"}'
```

**Resposta (400):**
```json
{
  "error": "URL inválida",
  "message": "Forneça uma URL válida no formato: {\"url\": \"https://exemplo.com\"}"
}
```

### URL Ausente:
```bash
curl -X POST https://api-webscrapping-production-d46a.up.railway.app/convert \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Resposta (400):**
```json
{
  "error": "URL é obrigatória",
  "message": "Forneça uma URL válida no formato: {\"url\": \"https://exemplo.com\"}"
}
```

## 🎯 Dicas de Uso

1. **URLs com HTTPS funcionam melhor** que HTTP
2. **Sites modernos** são melhor processados
3. **Timeout de 10 segundos** - sites lentos podem falhar
4. **A API remove automaticamente**:
   - Scripts e CSS
   - Navegação e menus
   - Anúncios e banners
   - Elementos de compartilhamento social

## 📊 Monitoramento

**Status da API:** https://api-webscrapping-production-d46a.up.railway.app/health

Use este endpoint para monitorar se a API está funcionando.

---

**🚀 API pronta para uso em produção!** 