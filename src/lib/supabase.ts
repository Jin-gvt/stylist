import { createClient } from '@supabase/supabase-js'
import type { SupabaseStatus, SupabaseConnectionTest } from './types/supabase'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create Supabase client (will be null if env vars not set)
export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null

// Check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {
  return !!(supabaseUrl && supabaseKey)
}

// Test Supabase connection
export const testSupabaseConnection = async (): Promise<SupabaseConnectionTest> => {
  if (!supabase) {
    return {
      connected: false,
      error: 'Supabase not configured. Missing environment variables.'
    }
  }

  try {
    // Try to get the session (this will test the connection)
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      return {
        connected: false,
        error: error.message,
        details: { code: error.name, message: error.message }
      }
    }

    // Try a simple query to test database connection
    // Use a system table that should always exist
    const { error: queryError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .limit(1)

    if (queryError) {
      // If we can't access system tables, try a simpler approach
      return {
        connected: true,
        error: 'Connected but database access limited. This is normal for new projects.'
      }
    }

    return {
      connected: true,
      details: {
        url: supabaseUrl,
        hasSession: !!data.session
      }
    }
  } catch (error) {
    return {
      connected: false,
      error: (error as Error).message || 'Unknown error occurred'
    }
  }
}

// Get Supabase status for display
export const getSupabaseStatus = async (): Promise<SupabaseStatus> => {
  const configured = isSupabaseConfigured()

  if (!configured) {
    return {
      status: 'not_configured',
      message: 'Supabase environment variables not set',
      color: 'gray'
    }
  }

  const connection = await testSupabaseConnection()

  if (connection.connected) {
    return {
      status: 'connected',
      message: connection.error || 'Connected successfully',
      color: connection.error ? 'yellow' : 'green',
      details: connection.details
    }
  } else {
    return {
      status: 'error',
      message: connection.error || 'Connection failed',
      color: 'red'
    }
  }
}
