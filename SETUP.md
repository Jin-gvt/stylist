# Stylist Console Setup Guide

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Access the application**:
   - Open http://localhost:3000
   - Use demo login:
     - Email: `stylist@demo.com`
     - Password: `demo123`

## 🔧 Environment Setup

Create a `.env.local` file in the root directory with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📁 Project Structure

```
stylist/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── dashboard/       # Main stylist dashboard
│   │   ├── login/          # Authentication page
│   │   └── page.tsx        # Root redirect
│   ├── components/         # React components
│   │   ├── ui/             # shadcn/ui components
│   │   └── dashboard/      # Dashboard-specific components
│   ├── lib/                # Utilities and configuration
│   │   ├── supabase.ts     # Supabase client (browser)
│   │   ├── supabase-server.ts # Supabase client (server)
│   │   ├── types.ts        # TypeScript type definitions
│   │   └── utils.ts        # Utility functions
│   └── hooks/              # Custom React hooks
├── public/                 # Static assets
└── PLAN.md                # Project planning document
```

## 🎯 Features

### Current Features
- ✅ Authentication system with demo login
- ✅ Responsive dashboard with three tabs:
  - **Queue**: View and claim customer conversations
  - **Compose**: Email composition with module system
  - **Analytics**: Performance metrics and insights
- ✅ Modern UI with Tailwind CSS and shadcn/ui
- ✅ TypeScript for type safety
- ✅ Mock data for development

### Planned Features
- 🔄 Supabase database integration
- 🔄 Real-time conversation updates
- 🔄 Email sending functionality
- 🔄 Product search integration
- 🔄 Customer context loading
- 🔄 Performance analytics

## 🗄️ Database Setup (Optional)

To enable full functionality, set up Supabase:

1. Create a new Supabase project at https://supabase.com
2. Create the following tables:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'user',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  stylist_id UUID REFERENCES users(id),
  subject TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  priority TEXT DEFAULT 'normal',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_user_reply_at TIMESTAMP WITH TIME ZONE
);
```

3. Update your `.env.local` with your Supabase credentials

## 🚀 Deployment

This project is optimized for Vercel deployment:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## 🛠️ Development

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Language**: TypeScript
- **Deployment**: Vercel

## 🎨 Design System

The application follows a professional design system with:
- Consistent spacing and typography
- Accessible color contrast
- Responsive breakpoints
- Modern UI patterns
- Performance optimizations

## 📞 Support

For questions or issues, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
