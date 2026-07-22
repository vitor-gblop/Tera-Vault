# 🔐 Terra Vault - Secret Keys Manager API

A secure backend API for managing passwords and sensitive keys, featuring end-to-end encryption, automated security classification, and access auditing.

---

## 🚀 Core Functionalities

### 1. User Management
*   **Complete CRUD**: Manage user profiles with Name and Email.
*   **Secure Authentication (2FA)**:
    *   Email-based login flow.
    *   Temporary 6-digit verification codes sent via email.
    *   In-memory code validation for session authorization.

### 2. Secret Key Management
*   **AES-256-GCM Encryption**: All passwords are encrypted with a random IV and authentication tag before storage.
*   **Security Level Analysis**: Automated classification of keys:
    *   🔴 **Low**: Default/short passwords.
    *   🟡 **Medium**: ≥ 6 chars + Numbers.
    *   🟢 **High**: ≥ 8 chars + Numbers + Special Characters.
*   **Decryption on Demand**: Authorized retrieval of plain-text keys for the end user.

### 3. Audit Logging (History)
*   **Access Tracking**: Every interaction with a key is logged.
*   **Temporal Records**: Stores the exact date and time of each access event.

---

## 🏗️ Technical Architecture

*   **Runtime**: Node.js (ES6 Modules)
*   **Framework**: Express.js
*   **Database**: MySQL managed via **Sequelize ORM**
*   **Security**: Native `crypto` module for high-grade encryption
*   **Email**: `nodemailer` integration

---

## 🛠️ Setup & Environment

### Prerequisites
*   MySQL Server
*   Node.js (v18+)

### Environment Variables (`.env`)
Create a `.env` file in the root directory:
\`env
PORT=3000
ENCRYPT_KEY=your_64_character_hex_key_here
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=your_user
MAIL_PASS=your_password
MAIL_FROM=noreply@terravault.com
\`

---

## 📍 API Route Map

| Module | Path | Method | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `/login` | `POST` | Request 2FA code via email |
| | `/login/verify` | `POST` | Validate code and get user payload |
| **Users** | `/users/add` | `POST` | Register a new user |
| | `/users/get` | `GET` | List all registered users |
| | `/users/get/id/:id`| `GET` | Get user details by ID |
| | `/users/remove/:id`| `DELETE` | Delete a user account |
| **Keys** | `/keys/add` | `POST` | Encrypt and save a new secret |
| | `/keys/get/:id` | `GET` | List all keys for a specific User |
| | `/keys/get/id/:id` | `GET` | Get and decrypt a specific key |
| | `/keys/remove/:id`| `DELETE` | Remove a secret key |
| **History**| `/history/add` | `POST` | Manually log an access event |
| | `/history/get/:id` | `GET` | Retrieve history for a specific key |

---

## 📝 How to Run

1.  Clone the repository.
2.  Install dependencies: `npm install`.
3.  Configure your `.env` and database.
4.  Start the server: `npm start`.
