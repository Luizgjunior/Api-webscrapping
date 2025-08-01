#!/usr/bin/env node

/**
 * Script de teste para API Web Scraping em Produção
 * URL: https://api-webscrapping-production-d46a.up.railway.app
 */

const API_URL = 'https://api-webscrapping-production-d46a.up.railway.app';

// URLs de teste
const TEST_URLS = [
  'https://example.com',
  'https://github.com',
  'https://nodejs.org',
  'https://pt.wikipedia.org/wiki/Node.js'
];

/**
 * Testa o health check da API
 */
async function testHealthCheck() {
  try {
    console.log('🔍 Testando Health Check...');
    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ API está funcionando!');
      console.log(`   Status: ${data.status}`);
      console.log(`   Timestamp: ${data.timestamp}\n`);
      return true;
    } else {
      console.log('❌ API não está respondendo corretamente\n');
      return false;
    }
  } catch (error) {
    console.log('❌ Erro ao conectar com a API:', error.message);
    return false;
  }
}

/**
 * Testa a conversão de uma URL
 */
async function testConversion(url) {
  try {
    console.log(`🔄 Convertendo: ${url}`);
    
    const response = await fetch(`${API_URL}/convert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url })
    });

    if (response.ok) {
      const markdown = await response.text();
      console.log('✅ Conversão bem-sucedida!');
      console.log(`   Tamanho do conteúdo: ${markdown.length} caracteres`);
      console.log(`   Primeiras linhas:\n${markdown.substring(0, 200)}...\n`);
      return true;
    } else {
      const error = await response.json();
      console.log(`❌ Erro na conversão: ${error.error}`);
      console.log(`   Mensagem: ${error.message}\n`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Erro na requisição: ${error.message}\n`);
    return false;
  }
}

/**
 * Testa erro com URL inválida
 */
async function testInvalidUrl() {
  try {
    console.log('🧪 Testando tratamento de erro (URL inválida)...');
    
    const response = await fetch(`${API_URL}/convert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: 'url-invalida' })
    });

    if (!response.ok) {
      const error = await response.json();
      console.log('✅ Tratamento de erro funcionando!');
      console.log(`   Erro: ${error.error}`);
      console.log(`   Status: ${response.status}\n`);
      return true;
    } else {
      console.log('❌ Deveria ter retornado erro\n');
      return false;
    }
  } catch (error) {
    console.log(`❌ Erro inesperado: ${error.message}\n`);
    return false;
  }
}

/**
 * Executa todos os testes
 */
async function runTests() {
  console.log('🚀 Iniciando testes da API Web Scraping\n');
  console.log(`📍 URL: ${API_URL}\n`);
  
  let passed = 0;
  let total = 0;

  // Teste 1: Health Check
  total++;
  if (await testHealthCheck()) passed++;

  // Teste 2: Conversões de URLs válidas
  for (const url of TEST_URLS) {
    total++;
    if (await testConversion(url)) {
      passed++;
    }
    // Pausa entre requests para não sobrecarregar
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Teste 3: URL inválida
  total++;
  if (await testInvalidUrl()) passed++;

  // Resultado final
  console.log('📊 Resultados dos Testes:');
  console.log(`   ✅ Passou: ${passed}/${total}`);
  console.log(`   ❌ Falhou: ${total - passed}/${total}`);
  console.log(`   📈 Taxa de sucesso: ${((passed/total)*100).toFixed(1)}%`);

  if (passed === total) {
    console.log('\n🎉 Todos os testes passaram! API está funcionando perfeitamente!');
  } else {
    console.log('\n⚠️  Alguns testes falharam. Verifique a API.');
  }
}

// Executa os testes se o script for chamado diretamente
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  testHealthCheck,
  testConversion,
  testInvalidUrl,
  runTests,
  API_URL
}; 