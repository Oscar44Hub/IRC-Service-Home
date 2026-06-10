export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          nombre: string;
          telefono: string;
          email: string | null;
          tipo_reforma: string | null;
          superficie: string | null;
          mensaje: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          nombre: string;
          telefono: string;
          email?: string | null;
          tipo_reforma?: string | null;
          superficie?: string | null;
          mensaje?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          nombre?: string;
          telefono?: string;
          email?: string | null;
          tipo_reforma?: string | null;
          superficie?: string | null;
          mensaje?: string | null;
          created_at?: string;
        };
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];
export type CompositeTypes<T extends keyof Database["public"]["CompositeTypes"]> =
  Database["public"]["CompositeTypes"][T];
