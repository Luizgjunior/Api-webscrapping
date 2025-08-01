# 🕷️ API de Extração de Conteúdos Web

API REST para **extração de conteúdos** de qualquer site, convertendo para formato **Markdown**. Remove automaticamente menus, rodapés, scripts, anúncios e extrai apenas o conteúdo útil.

## 🚀 Funcionalidades

- ✅ **Extração de Conteúdos**: Endpoint `POST /convert` que extrai conteúdo limpo de qualquer URL
- ✅ **Limpeza Automática**: Remove scripts, estilos, navegação, anúncios e elementos irrelevantes
- ✅ **Conteúdo Principal**: Identifica e extrai apenas o texto principal da página
- ✅ **Formato Markdown**: Converte o conteúdo extraído para Markdown limpo e estruturado
- ✅ **Deploy Otimizado**: Pronto para Railway com Docker Alpine
- ✅ **Monitoramento**: Health check integrado

## 🛠️ Stack Tecnológica

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Axios** - Cliente HTTP para buscar páginas
- **Cheerio** - Parser HTML/DOM server-side
- **Turndown** - Conversor HTML para Markdown
- **Docker** - Containerização

## 📂 Estrutura do Projeto

```
Api-Webscapping/
├── index.js          # Aplicação principal
├── package.json       # Dependências e scripts
├── Dockerfile         # Configuração Docker
└── README.md          # Este arquivo
```

## 🏃‍♂️ Como Executar Localmente

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd Api-Webscapping

# Instale as dependências
npm install

# Execute a aplicação
npm start
```

A API estará disponível em `http://localhost:3000`

### Com Docker

```bash
# Build da imagem Docker
docker build -t api-webscaping .

# Execute o container
docker run -p 3000:3000 api-webscaping
```

## 📝 Como Usar a API

### Endpoint Principal

**POST** `/convert`

Converte o conteúdo de uma URL em Markdown.

#### Exemplo de Request

```bash
curl -X POST http://localhost:3000/convert \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

#### Exemplo com Postman

1. Método: `POST`
2. URL: `http://localhost:3000/convert`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "url": "https://exemplo.com"
}
```

#### Response

```markdown
# Título da Página

Este é o conteúdo principal da página convertido para Markdown...

## Seção

Conteúdo da seção...
```

### Outros Endpoints

- **GET** `/` - Informações da API
- **GET** `/health` - Status da aplicação

## 🚢 Deploy no Railway

### Opção 1: Deploy Direto (Recomendado)

1. **Conecte seu repositório ao Railway:**
   - Acesse [Railway.app](https://railway.app)
   - Faça login e clique em "Deploy from GitHub repo"
   - Selecione este repositório

2. **Configuração automática:**
   - O Railway detectará automaticamente o `Dockerfile`
   - A aplicação será buildada e deployada automaticamente

3. **Acesse sua API:**
   - O Railway fornecerá uma URL pública
   - Teste com: `https://sua-app.railway.app/health`

### Opção 2: CLI do Railway

```bash
# Instale o Railway CLI
npm install -g @railway/cli

# Faça login
railway login

# Inicie um novo projeto
railway init

# Deploy
railway up
```

### Variáveis de Ambiente

O Railway configurará automaticamente a variável `PORT`. Não é necessária configuração adicional.

## 🧪 Testando a API

### Teste com cURL

```bash
# Teste o health check
curl http://localhost:3000/health

# Teste a conversão
curl -X POST http://localhost:3000/convert \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com"}'
```

### Teste com JavaScript/Fetch

```javascript
const response = await fetch('http://localhost:3000/convert', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com'
  })
});

const markdown = await response.text();
console.log(markdown);
```

## 🛡️ Tratamento de Erros

A API trata os seguintes cenários:

- **400 Bad Request**: URL ausente ou inválida
- **400 Bad Request**: URL inacessível
- **408 Request Timeout**: Timeout na requisição
- **500 Internal Server Error**: Erro interno do servidor

### Exemplo de Resposta de Erro

```json
{
  "error": "URL é obrigatória",
  "message": "Forneça uma URL válida no formato: {\"url\": \"https://exemplo.com\"}"
}
```

## 🎯 Algoritmo de Limpeza

A API remove automaticamente:

- ✅ Scripts e estilos CSS
- ✅ Elementos de navegação (nav, header, footer)
- ✅ Menus e barras laterais
- ✅ Anúncios e banners promocionais
- ✅ Elementos de compartilhamento social
- ✅ Comentários e formulários
- ✅ Breadcrumbs e paginação
- ✅ Elementos ocultos (display: none)

E extrai inteligentemente o conteúdo principal usando seletores como:
- `main`, `article`
- `.main-content`, `.content`
- `.post-content`, `.entry-content`
- E outros padrões comuns

## 🔧 Desenvolvimento

### Scripts Disponíveis

```bash
npm start    # Inicia a aplicação
npm run dev  # Mesmo que start (para desenvolvimento)
```

### Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🤝 Suporte

Se encontrar algum problema ou tiver sugestões, abra uma issue no repositório.

---

**Pronto para usar! 🎉**

Deploy em poucos minutos no Railway e comece a converter sites em Markdown imediatamente. 