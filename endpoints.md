# 🌐 Endpoints da API Web Scraping

**URL Base de Produção:** `https://api-webscrapping-production-d46a.up.railway.app`

## 📌 Endpoints Disponíveis

### 1. Health Check
```
GET https://api-webscrapping-production-d46a.up.railway.app/health
```

### 2. Informações da API
```
GET https://api-webscrapping-production-d46a.up.railway.app/
```

### 3. Extração de Conteúdos (Principal)
```
POST https://api-webscrapping-production-d46a.up.railway.app/convert
```

**Body JSON:**
```json
{
  "url": "https://exemplo.com"
}
```

## ⚡ Teste Rápido

### Comando cURL pronto para usar:
```bash
curl -X POST https://api-webscrapping-production-d46a.up.railway.app/convert \
  -H "Content-Type: application/json" \
  -d '{"url": "https://exemplo.com"}'
```

### PowerShell:
```powershell
Invoke-RestMethod -Uri "https://api-webscrapping-production-d46a.up.railway.app/convert" -Method POST -ContentType "application/json" -Body '{"url": "https://example.com"}'
```

### JavaScript:
```javascript
fetch('https://api-webscrapping-production-d46a.up.railway.app/convert', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: 'https://example.com' })
})
.then(response => response.text())
.then(markdown => console.log(markdown));
```

## 🎯 URLs para Teste
- `https://example.com`
- `https://github.com`
- `https://nodejs.org`
- `https://pt.wikipedia.org/wiki/Node.js` 