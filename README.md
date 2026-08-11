# Terra Vault

Um sistema de gerenciamento de senhas secretas, composto por duas aplicações:

- **`app/`**: front-end React focado em experiência mobile e interface terrosa.
- **`api/`**: back-end Node/Express para autenticação, armazenamento e segurança.

---

## 📘 Visão Geral do Projeto

O Terra Vault é uma solução de segurança que une:

- uma interface leve e responsiva para acessar chaves e segredos;
- uma API segura que valida usuários, protege rotas e guarda dados criptografados;
- um fluxo de login por e-mail e verificação por código, reduzindo dependência de senha.

---

## 🧩 Estrutura das Aplicações

### Front-end (`app/`)

O front-end é construído em React com TypeScript e Tailwind CSS, e oferece:

- suporte a **layout mobile-first** com navegação simples e cards de conteúdo;
- tema visual inspirado em **cores terrosas** e tipografia suave;
- **modo escuro** ativável manualmente nas configurações;
- componentes reutilizáveis para botões, cards, modais e navegação;
- gerenciamento de autenticação local via hooks e serviços.

### Back-end (`api/`)

A API é desenvolvida em Node.js com Express e inclui:

- rotas para **login**, **usuários**, **chaves** e **histórico**;
- controllers separados para lógica de negócios e acesso a dados;
- serviços especializados para **criptografia**, **envio de e-mail** e **segurança de rota**;
- persistência de dados via banco local/servidor (configuração no back-end);
- lógica de verificação para garantir que apenas usuários autorizados acessem informações sensíveis.

---

## 🔐 Segurança

O projeto aplica camadas de segurança para proteger o cofre:

- autenticação por **e-mail + código de 6 dígitos** em vez de senha tradicional;
- armazenamento seguro de chaves com criptografia no back-end;
- proteção de rotas por meio de middleware de segurança;
- uso de tokens e validações para manter a sessão segura (padrão **JWT** ou tokens similares no back-end);
- verificação de tema e preferências do usuário no front-end via `localStorage`.

---

## 📱 Front-end: Mobile e Experiência do Usuário

O front-end foi pensado para uso em dispositivos móveis:

- interface limpa com **botão flutuante** para adicionar novos segredos;
- cards de resumo que mostram número de chaves e status do cofre;
- navegação clara entre telas de **login**, **verificação**, **lista de chaves**, **detalhes** e **configurações**;
- feedback visual imediato e mensagens de toast para ações do usuário;
- modo escuro que altera a aparência das cores do tema.

---

## ⚙️ Como Executar

### Requisitos

- [Node.js](https://nodejs.org/) (recomendado v20 ou superior)
- [npm](https://www.npmjs.com/)

### Front-end

```bash
cd ./app
npm install
npm run dev
```

### Back-end

```bash
cd ./api
npm install
npm start
```

---

## 🔗 Conexão entre Front-end e Back-end

O front-end consome a API do back-end para:

- gerar e verificar códigos de login;
- recuperar e salvar chaves secretas;
- exibir histórico de acessos e ações;
- proteger dados sensíveis através de autenticação nas requisições.

A URL base da API está configurada em `app/src/config/enviroment.ts` e deve apontar para o servidor rodando em `http://localhost:3000` ou outra porta definida.

---

## 🛠️ Tech Stack

- **Front-end:** React + TypeScript + Tailwind CSS + Vite
- **Back-end:** Node.js + Express
- **Roteamento:** React Router
- **Ícones:** React Icons
- **Segurança:** login por e-mail, verificação por código, middleware de rota e criptografia de chaves
- **Documentação:** Utiliza swagger na rota `/api/docs`

---

## 📄 Observações

Este repositório reúne duas aplicações integradas: a interface do cofre e a API responsável pela autenticação e pelo gerenciamento seguro de dados. O design prioriza usabilidade móvel, controle de tema e uma experiência de acesso protegida.

## Imagens

### Login

<img width="581" height="514" alt="Captura de tela de 2026-07-22 10-29-40" src="https://github.com/user-attachments/assets/669dadd8-43cc-4a7c-98c8-c39277ecdb6e" />

### Inicio

<img width="581" height="514" alt="Captura de tela de 2026-07-22 10-27-54" src="https://github.com/user-attachments/assets/328bf529-0747-4d9f-86ad-2ee3560e6684" />

### Mobile

<img width="291" height="517" alt="Captura de tela de 2026-07-22 10-30-52" src="https://github.com/user-attachments/assets/5f97ff7a-7f06-4195-a56e-357cae83d41f" />
