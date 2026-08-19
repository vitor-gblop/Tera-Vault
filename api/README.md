# 🔐 Terra Vault - API de Gerenciamento de Chaves Secretas

Uma API backend segura para gerenciamento de senhas e chaves sensíveis, com criptografia de ponta a ponta, classificação automática de segurança e auditoria de acessos.

---

## 🚀 Funcionalidades Principais

### 1. Gerenciamento de Usuários

- **CRUD completo**: Gerencie perfis de usuários com nome e e-mail.
- **Autenticação segura (2FA)**:
  - Fluxo de login por e-mail.
  - Códigos temporários de verificação com 6 dígitos enviados por e-mail.
  - Validação dos códigos em memória para autorização da sessão.

### 2. Gerenciamento de Chaves Secretas

- **Criptografia AES-256-GCM**: Todas as senhas são criptografadas com um IV aleatório e uma tag de autenticação antes do armazenamento.
- **Análise do nível de segurança**: Classificação automática das chaves:
  - 🔴 **Baixo**: Senhas padrão ou curtas.
  - 🟡 **Médio**: 6 ou mais caracteres + números.
  - 🟢 **Alto**: 8 ou mais caracteres + números + caracteres especiais.
- **Descriptografia sob demanda**: Recuperação autorizada das chaves em texto simples para o usuário final.

### 3. Registro de Auditoria (Histórico)

- **Rastreamento de acessos**: Cada interação com uma chave é registrada.
- **Registros temporais**: Armazena a data e a hora exatas de cada evento de acesso.

---

## 🏗️ Arquitetura Técnica

- **Runtime**: Node.js (módulos ES6)
- **Framework**: Express.js
- **Banco de dados**: MySQL gerenciado pelo **ORM Sequelize**
- **Segurança**: Módulo nativo `crypto` para criptografia de alto nível
- **E-mail**: Integração com `nodemailer`

---

## 🛠️ Configuração e Ambiente

### Pré-requisitos

- Servidor MySQL
- Node.js (v18+)

### Variáveis de Ambiente (`.env`)

Crie um arquivo `.env` no diretório raiz:

```env
PORT=3000
ENCRYPT_KEY=sua_chave_hexadecimal_de_64_caracteres_aqui
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=seu_usuario
MAIL_PASS=sua_senha
MAIL_FROM=noreply@terravault.com
```

---

## 📍 Mapa de Rotas da API

| Módulo           | Caminho             | Método   | Descrição                                       |
| :--------------- | :------------------ | :------- | :---------------------------------------------- |
| **Autenticação** | `/login`            | `POST`   | Solicitar código 2FA por e-mail                 |
|                  | `/login/verify`     | `POST`   | Validar o código e obter os dados do usuário    |
| **Usuários**     | `/users/add`        | `POST`   | Cadastrar um novo usuário                       |
|                  | `/users/get`        | `GET`    | Listar todos os usuários cadastrados            |
|                  | `/users/get/id/:id` | `GET`    | Obter detalhes de um usuário pelo ID            |
|                  | `/users/remove/:id` | `DELETE` | Excluir uma conta de usuário                    |
| **Chaves**       | `/keys/add`         | `POST`   | Criptografar e salvar um novo segredo           |
|                  | `/keys/get/:id`     | `GET`    | Listar todas as chaves de um usuário específico |
|                  | `/keys/get/id/:id`  | `GET`    | Obter e descriptografar uma chave específica    |
|                  | `/keys/remove/:id`  | `DELETE` | Remover uma chave secreta                       |
| **Histórico**    | `/history/add`      | `POST`   | Registrar manualmente um evento de acesso       |
|                  | `/history/get/:id`  | `GET`    | Recuperar o histórico de uma chave específica   |

---

## 📝 Como Executar

1. Clone o repositório.
2. Instale as dependências: `npm install`.
3. Configure o arquivo `.env` e o banco de dados.
4. Inicie o servidor: `npm start`.
