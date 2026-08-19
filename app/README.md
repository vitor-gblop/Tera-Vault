# Terra Vault

Um aplicativo móvel seguro, com tema orgânico, para gerenciar chaves secretas. Fundamentado na privacidade, o Terra Vault oferece uma experiência acolhedora e acessível para proteger suas credenciais digitais mais sensíveis.

## 🌿 Estética: “Aconchego Natural”

O Terra Vault utiliza tons terrosos, formas suaves e texturas naturais para transmitir segurança e tranquilidade.

- **Cor primária:** Verde Floresta (`#4a7c59`)
- **Fundo:** Creme Suave (`#faf6f0`)
- **Cor terciária:** Âmbar Quente (`#705c30`)
- **Tipografia:** Literata (títulos) e Nunito Sans (corpo do texto)

---

## 🔐 Autenticação e Verificação

O Terra Vault prioriza a segurança por meio de um fluxo de autenticação contínuo e sem senha.

### 1. Login por E-mail

O acesso começa com o fornecimento de um endereço de e-mail válido. Nenhuma senha é armazenada no dispositivo para reduzir a superfície de ataque.

### 2. Verificação por Código Seguro

Após enviar seu e-mail, um **código de verificação seguro de 6 dígitos** será enviado para sua caixa de entrada.

- O código é válido por tempo limitado e para uma única sessão.
- O acesso só será concedido após a inserção correta do código na **Página de Verificação**.
- Esse método garante que apenas o proprietário da conta de e-mail possa acessar o cofre, seguindo um modelo semelhante ao Magic Link.

### 3. Segurança Adicional

- **Desbloqueio biométrico:** Pode ser ativado nas configurações para acesso local rápido.
- **Autenticação de dois fatores (2FA):** Camada secundária opcional para ambientes de alta segurança.

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20 ou superior recomendada)
- [npm](https://www.npmjs.com/)

### Instalação

1. Clone o repositório.
2. Acesse o diretório do projeto:

   ```bash
   cd secret-keys-manager/app
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

### Execução

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173` (ou a porta especificada por Vite).

---

## 🔗 Elementos de Conexão

O aplicativo conecta-se a um serviço backend para persistência de dados e autenticação.

- **URL da API:** Configurado em `src/config/enviroment.ts`.
- **URL de Desenvolvimento Padrão:** `http://localhost:3000`.
- **Cliente HTTP:** Construído sobre [Axios](https://axios-http.com/), com um wrapper personalizado em `src/config/http.ts`.

Garanta que seu servidor backend esteja rodando e acessível na URL configurada para que as seguintes funcionalidades funcionem:

- Autenticação e geração de código de login.
- Recuperação e persistência de dados do cofre.
- Gestão de chaves (adicionar, excluir, logs de auditoria).

---

## 📂 Como Acessar

1. **Login Inicial:** Abra o app e entre com seu e-mail no screen de Login.
2. **Verificação de Código:** Verifique seu e-mail, recupere o código de 6 dígitos e entre com ele na tela de Verificação.
3. **Dashboard do Cofre:** Uma vez verificado, você será redirecionado para o seu Cofre, onde poderá:
   - Verificar cards de resumo para **Chaves Ativas** e **Saúde do Cofre**.
   - Gerenciar sua lista de segredos.
   - Usar o **Botão de Ação Flutuante (+)** para plantar novos segredos.
4. **Configurações:** Use a barra de navegação inferior para acessar opções de personalização, incluindo modo escuro e controles de segurança.

---

## 🛠️ Stack Tecnológica

- **Framework:** React 19 (TypeScript)
- **Styling:** Tailwind CSS v4
- **Routing:** React Router 7
- **Icons:** React Icons (Hi, Fc, Md)
- **Build Tool:** Vite
