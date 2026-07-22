import type { Historic } from "./historic";

export interface Key {
  id?: number;
  title: string;
  password: string;
  secure: string,
  description?: string;
  historic?: Historic[];
}
