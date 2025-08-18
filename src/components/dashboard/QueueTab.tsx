'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Clock, User, MessageSquare } from 'lucide-react'
import { QueueItem } from '@/lib/types'
import { useState } from 'react'

// Mock data for now
const mockQueueItems: QueueItem[] = [
  {
    id: 'conv_001',
    user_id: 'user_001',
    subject: 'Need help finding work blazers',
    status: 'pending',
    priority: 'urgent',
    created_at: '2025-08-18T10:00:00Z',
    updated_at: '2025-08-18T10:00:00Z',
    last_user_reply_at: '2025-08-18T10:00:00Z',
    time_since_last_reply_minutes: 15,
    user: {
      id: 'user_001',
      email: 'emma.chen@example.com',
      name: 'Emma Chen',
      role: 'user',
      created_at: '2025-08-18T09:00:00Z',
      updated_at: '2025-08-18T09:00:00Z'
    },
    user_context_summary: {
      recent_purchases: 3,
      style_preferences: ['minimalist', 'professional'],
      engagement_score: 0.85
    }
  },
  {
    id: 'conv_002',
    user_id: 'user_002',
    subject: 'Looking for casual weekend outfits',
    status: 'pending',
    priority: 'normal',
    created_at: '2025-08-18T11:30:00Z',
    updated_at: '2025-08-18T11:30:00Z',
    last_user_reply_at: '2025-08-18T11:30:00Z',
    time_since_last_reply_minutes: 45,
    user: {
      id: 'user_002',
      email: 'sarah.johnson@example.com',
      name: 'Sarah Johnson',
      role: 'user',
      created_at: '2025-08-18T08:00:00Z',
      updated_at: '2025-08-18T08:00:00Z'
    },
    user_context_summary: {
      recent_purchases: 1,
      style_preferences: ['casual', 'bohemian'],
      engagement_score: 0.92
    }
  }
]

export function QueueTab() {
  const [queueItems, setQueueItems] = useState<QueueItem[]>(mockQueueItems)
  const [loading, setLoading] = useState(false)

  const handleClaim = async (conversationId: string) => {
    setLoading(true)
    try {
      console.log('Claiming conversation:', conversationId)

      // Update local state
      setQueueItems(items =>
        items.map(item =>
          item.id === conversationId
            ? { ...item, status: 'claimed' as const }
            : item
        )
      )
    } catch (error) {
      console.error('Failed to claim conversation:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive'
      case 'high': return 'secondary'
      case 'normal': return 'outline'
      case 'low': return 'outline'
      default: return 'outline'
    }
  }

  const getTimeColor = (minutes: number) => {
    if (minutes < 2) return 'text-green-600'
    if (minutes < 5) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Queue Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Conversation Queue</span>
          </CardTitle>
          <CardDescription>
            Pending conversations requiring stylist attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-red-600">3</div>
              <div className="text-sm text-gray-600">Urgent</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">2</div>
              <div className="text-sm text-gray-600">High Priority</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">1.5 min</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Queue Items */}
      <div className="space-y-4">
        {queueItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  {/* Header Row */}
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={item.user?.avatar_url} />
                      <AvatarFallback>
                        {item.user?.name?.[0] || item.user?.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">
                          {item.user?.name || item.user?.email}
                        </h3>
                        <Badge variant={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span className={getTimeColor(item.time_since_last_reply_minutes || 0)}>
                            {item.time_since_last_reply_minutes}m ago
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{item.user?.email}</p>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      {item.subject}
                    </h4>
                  </div>

                  {/* Context Summary */}
                  {item.user_context_summary && (
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>
                        {item.user_context_summary.recent_purchases} recent purchases
                      </span>
                      <span>•</span>
                      <span>
                        Style: {item.user_context_summary.style_preferences.join(', ')}
                      </span>
                      <span>•</span>
                      <span>
                        Engagement: {Math.round(item.user_context_summary.engagement_score * 100)}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleClaim(item.id)}
                    disabled={loading || item.status === 'claimed'}
                  >
                    {item.status === 'claimed' ? 'Claimed' : 'Claim'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {queueItems.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No pending conversations
            </h3>
            <p className="text-gray-600">
              All conversations have been handled. Great job!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
