'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, AlertCircle, Database, RefreshCw } from 'lucide-react'
import { getSupabaseStatus, isSupabaseConfigured } from '@/lib/supabase'
import type { SupabaseStatus } from '@/lib/types/supabase'

export function SupabaseStatus() {
  const [status, setStatus] = useState<SupabaseStatus | null>(null)
  const [loading, setLoading] = useState(false)

  const checkStatus = async () => {
    setLoading(true)
    try {
      const result = await getSupabaseStatus()
      setStatus(result)
    } catch {
      setStatus({
        status: 'error',
        message: 'Failed to check status',
        color: 'red'
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  const getIcon = () => {
    if (loading) return <RefreshCw className="h-5 w-5 animate-spin" />

    switch (status?.status) {
      case 'connected':
        return status.color === 'yellow'
          ? <AlertCircle className="h-5 w-5 text-yellow-500" />
          : <CheckCircle className="h-5 w-5 text-green-500" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'not_configured':
      default:
        return <Database className="h-5 w-5 text-gray-500" />
    }
  }

  const getBadgeVariant = (color: string) => {
    switch (color) {
      case 'green': return 'default'
      case 'yellow': return 'secondary'
      case 'red': return 'destructive'
      default: return 'outline'
    }
  }

  const configured = isSupabaseConfigured()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="h-5 w-5" />
          <span>Supabase Connection Status</span>
        </CardTitle>
        <CardDescription>
          Check your Supabase database connection and configuration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getIcon()}
            <div>
              <div className="font-medium">
                {status?.status === 'connected' && 'Connected'}
                {status?.status === 'error' && 'Connection Error'}
                {status?.status === 'not_configured' && 'Not Configured'}
                {loading && 'Checking...'}
              </div>
              <div className="text-sm text-gray-600">
                {status?.message || 'Click "Check Connection" to test'}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {status && (
              <Badge variant={getBadgeVariant(status.color)}>
                {status.status.replace('_', ' ')}
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={checkStatus}
              disabled={loading}
            >
              {loading ? 'Checking...' : 'Check Connection'}
            </Button>
          </div>
        </div>

        {/* Configuration Status */}
        <div className="border-t pt-4 space-y-2">
          <div className="text-sm font-medium">Configuration:</div>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between">
              <span>NEXT_PUBLIC_SUPABASE_URL:</span>
              <Badge variant={configured ? 'default' : 'outline'}>
                {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>NEXT_PUBLIC_SUPABASE_ANON_KEY:</span>
              <Badge variant={configured ? 'default' : 'outline'}>
                {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Details */}
        {status?.details && (
          <div className="border-t pt-4 space-y-2">
            <div className="text-sm font-medium">Details:</div>
            <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
              {JSON.stringify(status.details, null, 2)}
            </pre>
          </div>
        )}

        {/* Instructions */}
        {!configured && (
          <div className="border-t pt-4">
            <div className="text-sm font-medium mb-2">Setup Instructions:</div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>1. Create a `.env.local` file in your project root</p>
              <p>2. Add your Supabase credentials:</p>
              <pre className="text-xs bg-gray-50 p-2 rounded mt-2">
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`}
              </pre>
              <p>3. Restart your development server</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
