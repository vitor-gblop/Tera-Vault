import crypto from "crypto";
import buffer from "buffer";

// A ENCRYPT_KEY com 32 bytes - 64 caracteres
const ENCRYPT_KEY = Buffer.from(process.env.ENCRYPT_KEY, "hex");

export const encrypt = (text) => {
  const iv = crypto.randomBytes(12); // vetor de inicialização - 12 bytes - mais eficiente
  const cipher = crypto.createCipheriv("aes-256-gcm", ENCRYPT_KEY, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  // Tag de autenticação para integridade
  const authTag = cipher.getAuthTag().toString("hex"); 

  // Retorna os dados necessários para descriptografar posteriormente
  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
};

export const decrypt = (encryptedData) => {
  // Decompõe os dados recebidos
  const [ivHex, authTagHex, encrypted] = encryptedData.split(":");

  // Decifrando
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    ENCRYPT_KEY,
    Buffer.from(ivHex, "hex"),
  );

  // integridade
  decipher.setAuthTag(Buffer.from(authTagHex, "hex"));

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
