// Carrega polyfills para compatibilidade
require('./fix-undici');

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const TurndownService = require('turndown');
const cors = require('cors');

// Configuração para resolver problemas de compatibilidade
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração do Turndown para conversão HTML -> Markdown
const turndownService = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced'
});

// Função para limpar HTML removendo elementos irrelevantes
function cleanHtml($) {
  // Remove scripts, estilos e elementos irrelevantes
  $('script, style, noscript').remove();
  
  // Remove elementos de navegação e interface
  $('nav, header, footer, aside').remove();
  $('[role="navigation"], [role="banner"], [role="contentinfo"]').remove();
  
  // Remove menus e barras laterais
  $('.menu, .navbar, .nav, .sidebar, .widget').remove();
  $('#menu, #navbar, #nav, #sidebar, #header, #footer').remove();
  
  // Remove anúncios e elementos promocionais
  $('.ad, .ads, .advertisement, .promo, .banner').remove();
  $('#ads, #advertisement, #promo').remove();
  $('[class*="ad-"], [id*="ad-"], [class*="ads-"], [id*="ads-"]').remove();
  
  // Remove elementos de compartilhamento social
  $('.social, .share, .sharing').remove();
  $('[class*="social-"], [class*="share-"]').remove();
  
  // Remove comentários e formulários de comentário
  $('.comments, .comment-form, #comments').remove();
  
  // Remove breadcrumbs e paginação
  $('.breadcrumb, .pagination, .pager').remove();
  
  // Remove elementos com display none ou visibility hidden
  $('[style*="display:none"], [style*="display: none"]').remove();
  $('[style*="visibility:hidden"], [style*="visibility: hidden"]').remove();
  
  return $;
}

// Função para extrair conteúdo principal
function extractMainContent($) {
  // Tenta encontrar o conteúdo principal usando seletores comuns
  const mainSelectors = [
    'main',
    '[role="main"]',
    '.main-content',
    '.content',
    '.post-content',
    '.entry-content',
    '.article-content',
    '#main',
    '#content',
    '.container .content',
    'article'
  ];
  
  for (const selector of mainSelectors) {
    const mainElement = $(selector);
    if (mainElement.length > 0 && mainElement.text().trim().length > 100) {
      return mainElement.first();
    }
  }
  
  // Se não encontrar, usa o body inteiro
  return $('body');
}

// Endpoint principal para conversão
app.post('/convert', async (req, res) => {
  try {
    const { url } = req.body;
    
    // Validação da URL
    if (!url) {
      return res.status(400).json({ 
        error: 'URL é obrigatória',
        message: 'Forneça uma URL válida no formato: {"url": "https://exemplo.com"}'
      });
    }
    
    // Validação do formato da URL
    let validUrl;
    try {
      validUrl = new URL(url);
    } catch (e) {
      return res.status(400).json({ 
        error: 'URL inválida',
        message: 'Forneça uma URL válida no formato: {"url": "https://exemplo.com"}'
      });
    }
    
    console.log(`Fazendo scraping de: ${url}`);
    
    // Busca o HTML da página
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    // Carrega o HTML no Cheerio
    let $ = cheerio.load(response.data);
    
    // Limpa elementos irrelevantes
    $ = cleanHtml($);
    
    // Extrai o conteúdo principal
    const mainContent = extractMainContent($);
    
    // Converte para Markdown com tratamento de erro
    let markdown;
    try {
      markdown = turndownService.turndown(mainContent.html() || '');
    } catch (conversionError) {
      console.error('Erro na conversão para Markdown:', conversionError);
      markdown = 'Erro: Não foi possível converter o conteúdo para Markdown';
    }
    
    // Remove linhas vazias excessivas
    const cleanMarkdown = markdown
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .trim();
    
    console.log(`Conversão concluída para: ${url}`);
    
    // Retorna o Markdown
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(cleanMarkdown);
    
  } catch (error) {
    console.error('Erro durante o scraping:', error.message);
    
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      return res.status(400).json({
        error: 'URL inacessível',
        message: 'Não foi possível acessar a URL fornecida. Verifique se está correta e acessível.'
      });
    }
    
    if (error.code === 'ECONNABORTED') {
      return res.status(408).json({
        error: 'Timeout',
        message: 'A requisição demorou muito para responder. Tente novamente.'
      });
    }
    
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Ocorreu um erro durante o processamento da página.'
    });
  }
});

// Endpoint de health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API de Extração de Conteúdos funcionando',
    timestamp: new Date().toISOString()
  });
});

// Endpoint de informações da API
app.get('/', (req, res) => {
  res.json({
    name: 'API de Extração de Conteúdos Web',
    version: '1.0.0',
    description: 'Extrai conteúdo limpo de qualquer site e converte para Markdown',
    endpoints: {
      'POST /convert': 'Extração de Conteúdos - Remove scripts, anúncios e extrai texto principal',
      'GET /health': 'Verifica status da API',
      'GET /': 'Informações da API'
    },
    usage: {
      method: 'POST',
      url: '/convert',
      body: { url: 'https://exemplo.com' },
      response: 'Conteúdo extraído em formato Markdown'
    }
  });
});

// Tratamento de erros não capturados
process.on('uncaughtException', (err) => {
  console.error('❌ Erro não capturado:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promise rejeitada não tratada:', reason);
  process.exit(1);
});

// Inicia o servidor (bind para 0.0.0.0 para funcionar no Railway)
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📝 Acesse http://localhost:${PORT} para ver informações da API`);
  console.log(`🔗 Use POST /convert para converter URLs em Markdown`);
}).on('error', (err) => {
  console.error('❌ Erro ao iniciar servidor:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📴 Recebido SIGTERM, fechando servidor...');
  server.close(() => {
    console.log('✅ Servidor fechado graciosamente');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('📴 Recebido SIGINT, fechando servidor...');
  server.close(() => {
    console.log('✅ Servidor fechado graciosamente');
    process.exit(0);
  });
}); 