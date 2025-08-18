// User roles
export type UserRole = 'user' | 'stylist' | 'senior_stylist' | 'admin'

// Conversation status
export type ConversationStatus = 'pending' | 'claimed' | 'in_progress' | 'completed' | 'escalated'

// Conversation priority
export type ConversationPriority = 'low' | 'normal' | 'high' | 'urgent'

// User interface
export interface User {
  id: string
  email: string
  name?: string
  role: UserRole
  avatar_url?: string
  created_at: string
  updated_at: string
}

// Conversation interface
export interface Conversation {
  id: string
  user_id: string
  stylist_id?: string
  subject: string
  status: ConversationStatus
  priority: ConversationPriority
  created_at: string
  updated_at: string
  last_user_reply_at?: string
  user?: User
  stylist?: User
}

// Queue item for the stylist dashboard
export interface QueueItem extends Conversation {
  time_since_last_reply_minutes?: number
  user_context_summary?: {
    recent_purchases: number
    style_preferences: string[]
    engagement_score: number
  }
}

// Email draft
export interface EmailDraft {
  id: string
  conversation_id: string
  stylist_id: string
  subject_line: string
  modules: EmailModule[]
  is_scheduled: boolean
  scheduled_send_at?: string
  notes?: string
  created_at: string
  updated_at: string
}

// Email module types (from the Flutter version)
export type EmailModuleType =
  | 'hero_look'
  | 'occasion_capsule'
  | 'wardrobe_gap'
  | 'intent_tile'
  | 'style_story'
  | 'perk'

// Email module interface
export interface EmailModule {
  module_id: string
  type: EmailModuleType
  title: string
  rationale: string
  items: EmailItem[]
  actions: EmailAction[]
  generated_image_url?: string
  background_style?: string
  stylist_id: string
  ai_suggested: boolean
  created_at: string
}

// Email item (product)
export interface EmailItem {
  gravity_item_id: string
  brand: string
  title: string
  price_quoted: number
  image_url?: string
  size_recommendation?: string
  fit_notes?: string
}

// Email action
export interface EmailAction {
  label: string
  type: 'payment_link' | 'search_query' | 'mailto' | 'external_link' | 'like_action'
  url?: string
  data?: Record<string, unknown>
}

// Stylist dashboard metrics
export interface StylistMetrics {
  stylist_id: string
  session_id: string
  shift_metrics: {
    emails_sent: number
    conversations_claimed: number
    avg_response_time_minutes: number
    customer_satisfaction_score: number
  }
  queue_stats: {
    pending_count: number
    urgent_count: number
    avg_wait_time_minutes: number
  }
  performance_metrics: {
    conversion_rate: number
    email_open_rate: number
    click_through_rate: number
  }
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// WebSocket event types
export type SocketEventType =
  | 'conversation_claimed'
  | 'conversation_updated'
  | 'new_conversation'
  | 'email_sent'
  | 'queue_updated'

export interface SocketEvent {
  type: SocketEventType
  data: unknown
  timestamp: string
}
