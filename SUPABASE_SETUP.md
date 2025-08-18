# Supabase Setup Guide

## 🔗 Project Information
- Project ID: `hbezfcftkfgfgzmroghp`
- Project URL: `https://hbezfcftkfgfgzmroghp.supabase.co`

## 🔑 Getting API Keys

1. **访问 Supabase 仪表板**:
   - 前往 https://supabase.com/dashboard/project/hbezfcftkfgfgzmroghp/settings/api

2. **复制 API Keys**:
   - 复制 "anon public" 密钥
   - 复制 "service_role" 密钥（如需要）

3. **更新环境变量**:
   编辑 `.env.local` 文件：
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://hbezfcftkfgfgzmroghp.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

## 🗄️ 数据库设置

运行以下 SQL 来创建必要的表：

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'stylist', 'senior_stylist', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stylist_id UUID REFERENCES users(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'claimed', 'in_progress', 'completed', 'escalated')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_user_reply_at TIMESTAMP WITH TIME ZONE
);

-- Email drafts table
CREATE TABLE IF NOT EXISTS email_drafts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  stylist_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subject_line TEXT NOT NULL,
  modules JSONB DEFAULT '[]',
  is_scheduled BOOLEAN DEFAULT FALSE,
  scheduled_send_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_conversations_status ON conversations(status);
CREATE INDEX IF NOT EXISTS idx_conversations_priority ON conversations(priority);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_email_drafts_conversation_id ON email_drafts(conversation_id);

-- Insert sample data
INSERT INTO users (email, name, role) VALUES
  ('stylist@demo.com', 'Demo Stylist', 'stylist'),
  ('emma@example.com', 'Emma Chen', 'user'),
  ('sarah@example.com', 'Sarah Johnson', 'user')
ON CONFLICT (email) DO NOTHING;

-- Get user IDs for sample conversations
DO $$
DECLARE
  stylist_user_id UUID;
  emma_user_id UUID;
  sarah_user_id UUID;
BEGIN
  SELECT id INTO stylist_user_id FROM users WHERE email = 'stylist@demo.com';
  SELECT id INTO emma_user_id FROM users WHERE email = 'emma@example.com';
  SELECT id INTO sarah_user_id FROM users WHERE email = 'sarah@example.com';

  -- Insert sample conversations
  INSERT INTO conversations (user_id, subject, status, priority, last_user_reply_at) VALUES
    (emma_user_id, 'Need help finding work blazers', 'pending', 'urgent', NOW() - INTERVAL '15 minutes'),
    (sarah_user_id, 'Looking for casual weekend outfits', 'pending', 'normal', NOW() - INTERVAL '45 minutes')
  ON CONFLICT DO NOTHING;
END $$;
```

## 🔒 Row Level Security (RLS)

启用 RLS 来保护数据：

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_drafts ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.uid() = id);

-- Stylists can read all user data
CREATE POLICY "Stylists can read all users" ON users FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role IN ('stylist', 'senior_stylist', 'admin')
  )
);

-- Similar policies for conversations and email_drafts...
```

## 🔄 Authentication Setup

在 Supabase 仪表板中：

1. 前往 **Authentication > Settings**
2. 启用 **Email** 提供商
3. 配置 **Site URL**: `http://localhost:3000`
4. 配置 **Redirect URLs**: `http://localhost:3000/dashboard`

## ✅ 测试连接

重启开发服务器：
```bash
npm run dev
```

访问 http://localhost:3000 测试认证功能。
