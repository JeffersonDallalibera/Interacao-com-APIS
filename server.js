// ==============================================================================
// Servidor de API Estática + Swagger UI - SESI SENAI (Zero Dependências)
// Funciona 100% offline, sem precisar de npm install!
// Professor: Jefferson Miguel Dallalibera
// ==============================================================================

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.yaml': 'text/yaml; charset=utf-8',
  '.yml': 'text/yaml; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // 1. Cabeçalhos CORS Globais (permite que qualquer página, porta ou Postman consuma a API)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Pistas e recados do Easter Egg embutidos nos cabeçalhos HTTP
  res.setHeader('X-Desafio-Bonus', 'Procurando ponto extra? Inspecione a rota oculta /api/desafio-bonus.json');
  res.setHeader('X-Aviso-Professor', 'Nao mostre para o seu colega ao lado, estou de olho! Hahaha');

  // Responde requisições preflight OPTIONS imediatamente
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Apenas aceita requisições GET
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ erro: 'Método não permitido. Esta API estática suporta apenas requisições GET.' }));
    return;
  }

  // 2. Mapeamento de Rotas
  let urlPath = req.url.split('?')[0]; // Remove query strings
  if (urlPath === '/' || urlPath === '/swagger' || urlPath === '/docs') {
    urlPath = '/index.html';
  }

  // Permite chamar /api/ordens ou /api/ordens.json
  let filePath = path.join(BASE_DIR, urlPath);
  if (!path.extname(filePath)) {
    if (fs.existsSync(filePath + '.json')) {
      filePath = filePath + '.json';
    } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
      filePath = path.join(filePath, 'index.html');
    }
  }

  // 3. Verificação de Arquivo
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({
        status: 404,
        erro: 'Recurso não encontrado',
        mensagem: `A rota '${req.url}' não existe nesta API.`,
        dica_investigativa: 'Nem todos os recursos estão listados no Swagger... Inspecione os cabeçalhos (headers) das respostas no Postman!',
        documentacao_swagger: '/',
        especificacao_openapi: '/openapi.json',
        endpoints_disponiveis: [
          '/api/ordens.json',
          '/api/produtos.json',
          '/api/clientes.json'
        ]
      }, null, 2));
      return;
    }

    // 4. Entrega do Arquivo com MIME Type correto
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ erro: 'Erro interno ao ler arquivo no servidor.' }));
        return;
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log('\n=============================================================');
  console.log('🚀 SERVIDOR DE API ESTÁTICA + SWAGGER UI INICIADO COM SUCESSO!');
  console.log('-------------------------------------------------------------');
  console.log(`📑 Swagger UI (Docs Interativa): http://localhost:${PORT}`);
  console.log(`📄 Especificação OpenAPI (JSON): http://localhost:${PORT}/openapi.json`);
  console.log(`📄 Especificação OpenAPI (YAML): http://localhost:${PORT}/openapi.yaml`);
  console.log('-------------------------------------------------------------');
  console.log(`📦 Endpoint Ordens:              http://localhost:${PORT}/api/ordens.json`);
  console.log(`📦 Endpoint Produtos:            http://localhost:${PORT}/api/produtos.json`);
  console.log(`📦 Endpoint Clientes:            http://localhost:${PORT}/api/clientes.json`);
  console.log('=============================================================\n');
  console.log('💡 DICA: Para testar no Postman, você pode importar direto o arquivo openapi.json!');
  console.log('Pressione Ctrl + C para encerrar o servidor.\n');
});
