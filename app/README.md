# Terra Vault

A secure, organic-themed mobile vault application for managing secret keys. Rooted in privacy, Terra Vault provides a grounded and approachable experience for safeguarding your most sensitive digital credentials.

## 🌿 Aesthetic: "Rooted Warmth"

Terra Vault uses earthy tones, soft shapes, and natural textures to create a sense of security and calm.

- **Primary Color:** Forest Green (`#4a7c59`)
- **Background:** Warm Cream (`#faf6f0`)
- **Tertiary:** Warm Amber (`#705c30`)
- **Typography:** Literata (Headlines) and Nunito Sans (Body)

---

## 🔐 Authentication & Verification

Terra Vault prioritizes security through a seamless, passwordless authentication flow.

### 1. Email Login
Entry is initiated by providing a valid email address. No passwords are stored on the client-side to minimize the attack surface.

### 2. Secure Code Verification
After submitting your email, a **6-digit secure verification code** is sent to your inbox. 
- The code is time-sensitive and valid for a single session.
- Access is only granted upon successful input of this code on the **Verification Page**.
- This method ensures that only the owner of the email account can access the vault (Magic Link style).

### 3. Additional Security
- **Biometric Unlock:** Can be enabled in Settings for quick local access.
- **Two-Factor Authentication (2FA):** Optional secondary layer for high-security environments.

---

## 🚀 How to Run

### Prerequisites
- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation
1. Clone the repository.
2. Navigate to the project directory:
   ```bash
   cd secret-keys-manager/app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Execution
Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173` (or the port specified by Vite).

---

## 🔗 Connection Elements

The application connects to a backend service for data persistence and authentication.

- **API Base URL:** Configured in `src/config/enviroment.ts`.
- **Default Development URL:** `http://localhost:3000`
- **HTTP Client:** Built on [Axios](https://axios-http.com/), with a custom wrapper in `src/config/http.ts`.

Ensure your backend server is running and accessible at the configured URL for the following features to work:
- User authentication and login code generation.
- Vault data retrieval and persistence.
- Key management (add, delete, audit logs).

---

## 📂 How to Access

1. **Initial Login:** Open the app and enter your email address on the Login screen.
2. **Verify Code:** Check your email, retrieve the 6-digit code, and enter it on the Verification screen.
3. **Vault Dashboard:** Once verified, you will be redirected to your Vault, where you can:
   - View summary cards for **Active Keys** and **Vault Health**.
   - Manage your list of secrets.
   - Use the **Floating Action Button (+)** to plant new secrets.
4. **Settings:** Use the bottom navigation bar to access personalization options, including dark mode and security controls.

---

## 🛠️ Tech Stack

- **Framework:** React 19 (TypeScript)
- **Styling:** Tailwind CSS v4
- **Routing:** React Router 7
- **Icons:** React Icons (Hi, Fc, Md)
- **Build Tool:** Vite
