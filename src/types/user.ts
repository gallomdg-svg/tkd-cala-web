export type UserRole = "alumno" | "profesor";

export interface Profile {
  id: string;
  full_name: string | null;
  role: UserRole;
}
