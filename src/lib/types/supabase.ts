// Supabase status types
export interface SupabaseStatus {
  status: 'not_configured' | 'connected' | 'error'
  message: string
  color: 'gray' | 'green' | 'yellow' | 'red'
  details?: Record<string, unknown>
}

export interface SupabaseConnectionTest {
  connected: boolean
  error?: string
  details?: Record<string, unknown>
}
