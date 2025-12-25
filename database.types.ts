export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      rent_post: {
        Row: {
          id: number
          UID: string
          name: string
          description: string | null
          category: string | null
          tags: string[] | null
          created_at: string
          deposite: number
          rent_amount: number
        }
        Insert: {
          id?: number
          UID?: string
          name: string
          description?: string | null
          category?: string | null
          tags?: string[] | null
          created_at?: string
          deposite: number
          rent_amount: number
        }
        Update: {
          id?: number
          UID?: string
          name?: string
          description?: string | null
          category?: string | null
          tags?: string[] | null
          created_at?: string
          deposite?: number
          rent_amount?: number
        }
      }

      sell_post: {
        Row: {
          id: number
          UID: string
          name: string
          description: string
          category: string
          tags: string[]
          created_at: string
          amount: number
        }
        Insert: {
          id?: number
          UID?: string
          name: string
          description: string
          category: string
          tags: string[]
          created_at?: string
          amount: number
        }
        Update: {
          id?: number
          UID?: string
          name?: string
          description?: string
          category?: string
          tags?: string[]
          created_at?: string
          amount?: number
        }
      }
    }
  }
}
