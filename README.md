# 📦 TaskFlow API Estática • OpenAPI 3.0 & Swagger UI
**SESI SENAI Santa Catarina**  
**Curso:** Técnico em Desenvolvimento de Sistemas / Informática para Internet  
**Unidade Curricular:** Interação com APIs  
**Docente:** Prof. Jefferson Miguel Dallalibera  
**Referência Técnica:** Norma FM-NP-220-SESI-SENAI-004  

---

## 🎯 Visão Geral do Projeto

Este repositório contém uma **API RESTful Estática Industrial** documentada nativamente com **OpenAPI 3.0** e interface interativa **Swagger UI**.

O projeto foi projetado com arquitetura **Zero-Config & Offline-First**:
- 🚫 **Sem frameworks pesados ou banco de dados:** os dados são arquivos `.json` estruturados.
- 🚫 **Sem telas customizadas de HTML/CSS:** a interface visual é o padrão de mercado **Swagger UI oficial**.
- 🌐 **Hospedagem 100% gratuita no GitHub Pages:** funciona como uma API pública acessível de qualquer lugar do mundo.
- 📴 **100% Funcional Offline no Laboratório:** todos os componentes do Swagger UI estão embutidos localmente na pasta `swagger-ui/`.

---

## 🗂️ Estrutura de Arquivos

```text
api-estatica-senai/
├── api/
│   ├── ordens.json         # Endpoint: Ordens de Serviço industriais
│   ├── produtos.json       # Endpoint: Catálogo de produtos e estoque
│   └── clientes.json       # Endpoint: Cadastro de indústrias parceiras (SC)
├── swagger-ui/             # Assets oficiais do Swagger UI (Offline-ready)
│   ├── swagger-ui.css
│   ├── swagger-ui-bundle.js
│   ├── swagger-ui-standalone-preset.js
│   └── favicon-32x32.png
├── openapi.json            # Especificação OpenAPI 3.0 em formato JSON
├── openapi.yaml            # Especificação OpenAPI 3.0 em formato YAML
├── index.html              # Swagger UI Standalone (carrega openapi.json / yaml)
├── server.js               # Servidor local Node.js nativo (com CORS habilitado)
├── package.json            # Metadados do projeto e scripts npm
└── README.md               # Guia didático do aluno e do professor
```

---

## 📍 Endpoints da API

| Método | Endpoint | Especificação | O que retorna |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/ordens.json` | `OrdemDeServico[]` | Ordens de serviço de logística, status, prioridades e destinos em SC |
| `GET` | `/api/produtos.json` | `Produto[]` | Catálogo do almoxarifado (motores, inversores WEG, CLPs Siemens, sensores) |
| `GET` | `/api/clientes.json` | `Cliente[]` | Indústrias parceiras (Chapecó, Joinville, Maravilha, São Miguel do Oeste) |

---

## 🚀 Como Rodar Localmente

Você pode utilizar qualquer uma das opções abaixo:

### Opção 1: Pelo Terminal com Node.js (Recomendado)
Não precisa instalar nenhuma biblioteca (`npm install` não é necessário).

1. Abra o terminal integrado no VS Code (`Ctrl + \``) na pasta do projeto.
2. Inicie o servidor:
   ```bash
   node server.js
   ```
   *(Ou: `npm start`)*
3. Acesse os links no navegador:
   - 📑 **Swagger UI:** [http://localhost:3000](http://localhost:3000)
   - 📄 **OpenAPI JSON:** [http://localhost:3000/openapi.json](http://localhost:3000/openapi.json)
   - 📄 **OpenAPI YAML:** [http://localhost:3000/openapi.yaml](http://localhost:3000/openapi.yaml)
   - 📦 **Ordens JSON:** [http://localhost:3000/api/ordens.json](http://localhost:3000/api/ordens.json)

---

### Opção 2: Pelo Visual Studio Code (Live Server)
1. Abra esta pasta no **VS Code**.
2. Clique com o botão direito sobre o arquivo `index.html`.
3. Selecione **"Open with Live Server"**.
4. O **Swagger UI** será exibido imediatamente em `http://127.0.0.1:5500/index.html`.

---

## 📑 Explorando o Swagger UI

Ao abrir o Swagger UI:
1. **Seletor de Especificação (Topbar):** você pode alternar entre `OpenAPI 3.0 (JSON)` e `OpenAPI 3.0 (YAML)`.
2. **Botão "Try it out":** clique no endpoint desejado (ex: `/api/ordens.json`), clique em **"Try it out"** e em seguida em **"Execute"**.
3. **Inspeção de Resposta:** o Swagger UI exibirá:
   - O comando `curl` equivalente;
   - A URL da requisição;
   - O código de status HTTP (`200 OK`);
   - O cabeçalho de resposta e o corpo JSON formatado;
   - O esquema detalhado dos tipos de dados (`integer`, `string`, `enum`, etc.).

---

## 📮 Importando no Postman em 1 Clique

Em vez de criar cada requisição manualmente, você pode importar toda a especificação OpenAPI diretamente no Postman:

1. Abra o **Postman**.
2. Clique no botão **"Import"** (canto superior esquerdo).
3. Arraste o arquivo `openapi.json` para dentro do Postman (ou clique em *files* e selecione-o).
4. O Postman criará automaticamente:
   - Uma **Collection** chamada `TaskFlow Logistics API • SESI SENAI`;
   - Todas as requisições `GET` mapeadas com documentação, parâmetros e exemplos de retorno!
5. Para testar, inicie seu servidor local (`node server.js`) e dispare as requisições no Postman para `http://localhost:3000/api/ordens.json`.

---

## 🌐 Publicando no GitHub & GitHub Pages

Para disponibilizar sua API e o Swagger UI na nuvem gratuitamente:

### 1. Criar repositório e subir os arquivos
```bash
git init
git add .
git commit -m "feat: API estática com OpenAPI 3.0 e Swagger UI"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/api-estatica-senai.git
git push -u origin main
```

### 2. Ativar o GitHub Pages
1. Acesse o seu repositório no GitHub.
2. Vá em **Settings** > **Pages** (no menu lateral esquerdo).
3. Em **Build and deployment** > **Source**, selecione **Deploy from a branch**.
4. Em **Branch**, selecione `main` e a pasta `/(root)`. Clique em **Save**.
5. Aguarde cerca de 1 a 2 minutos. O GitHub gerará uma URL pública, por exemplo:
   - `https://SEU-USUARIO.github.io/api-estatica-senai/`

🎉 **Pronto!** O Swagger UI estará no ar e os endpoints funcionarão em qualquer projeto Front-End:
```text
https://SEU-USUARIO.github.io/api-estatica-senai/api/ordens.json
```

---

## 💻 Consumindo a API no Front-End (`fetch`)

Exemplo prático em JavaScript moderno para buscar e exibir os dados:

```javascript
// Exemplo de consumo da API no Front-End
async function carregarOrdens() {
  try {
    const url = 'http://localhost:3000/api/ordens.json'; 
    // Ou em produção: 'https://SEU-USUARIO.github.io/api-estatica-senai/api/ordens.json'

    const resposta = await fetch(url);
    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    const ordens = await resposta.json();
    console.log('Ordens recebidas:', ordens);

    ordens.forEach(os => {
      console.log(`[${os.numero}] ${os.item} -> Destino: ${os.destino} (${os.status})`);
    });
  } catch (erro) {
    console.error('Falha ao consumir API:', erro.message);
  }
}

carregarOrdens();
```

---

## 📜 Licença e Créditos
Material didático desenvolvido para o **SESI SENAI** pelo **Prof. Jefferson Miguel Dallalibera** sob licença MIT. Livre para fins educacionais.
