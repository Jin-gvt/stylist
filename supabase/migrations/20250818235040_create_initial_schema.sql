-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create clients table
CREATE TABLE public.clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stylist_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  notes TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create styling_sessions table
CREATE TABLE public.styling_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stylist_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed', 'cancelled')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  budget_min DECIMAL(10,2),
  budget_max DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create outfit_recommendations table
CREATE TABLE public.outfit_recommendations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES public.styling_sessions(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  style_notes TEXT,
  image_urls TEXT[] DEFAULT '{}',
  total_price DECIMAL(10,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create items table
CREATE TABLE public.items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recommendation_id UUID REFERENCES public.outfit_recommendations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  brand TEXT,
  category TEXT,
  price DECIMAL(10,2),
  size TEXT,
  color TEXT,
  url TEXT,
  image_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.styling_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outfit_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for clients (stylists can only see their own clients)
CREATE POLICY "Stylists can view their own clients" ON public.clients
  FOR SELECT USING (auth.uid() = stylist_id);

CREATE POLICY "Stylists can insert their own clients" ON public.clients
  FOR INSERT WITH CHECK (auth.uid() = stylist_id);

CREATE POLICY "Stylists can update their own clients" ON public.clients
  FOR UPDATE USING (auth.uid() = stylist_id);

CREATE POLICY "Stylists can delete their own clients" ON public.clients
  FOR DELETE USING (auth.uid() = stylist_id);

-- Create policies for styling_sessions
CREATE POLICY "Stylists can view their own sessions" ON public.styling_sessions
  FOR SELECT USING (auth.uid() = stylist_id);

CREATE POLICY "Stylists can insert their own sessions" ON public.styling_sessions
  FOR INSERT WITH CHECK (auth.uid() = stylist_id);

CREATE POLICY "Stylists can update their own sessions" ON public.styling_sessions
  FOR UPDATE USING (auth.uid() = stylist_id);

CREATE POLICY "Stylists can delete their own sessions" ON public.styling_sessions
  FOR DELETE USING (auth.uid() = stylist_id);

-- Create policies for outfit_recommendations
CREATE POLICY "Stylists can view recommendations for their sessions" ON public.outfit_recommendations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.styling_sessions
      WHERE styling_sessions.id = outfit_recommendations.session_id
      AND styling_sessions.stylist_id = auth.uid()
    )
  );

CREATE POLICY "Stylists can insert recommendations for their sessions" ON public.outfit_recommendations
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.styling_sessions
      WHERE styling_sessions.id = outfit_recommendations.session_id
      AND styling_sessions.stylist_id = auth.uid()
    )
  );

CREATE POLICY "Stylists can update recommendations for their sessions" ON public.outfit_recommendations
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.styling_sessions
      WHERE styling_sessions.id = outfit_recommendations.session_id
      AND styling_sessions.stylist_id = auth.uid()
    )
  );

CREATE POLICY "Stylists can delete recommendations for their sessions" ON public.outfit_recommendations
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.styling_sessions
      WHERE styling_sessions.id = outfit_recommendations.session_id
      AND styling_sessions.stylist_id = auth.uid()
    )
  );

-- Create policies for items
CREATE POLICY "Stylists can view items for their recommendations" ON public.items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.outfit_recommendations
      JOIN public.styling_sessions ON styling_sessions.id = outfit_recommendations.session_id
      WHERE outfit_recommendations.id = items.recommendation_id
      AND styling_sessions.stylist_id = auth.uid()
    )
  );

CREATE POLICY "Stylists can insert items for their recommendations" ON public.items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.outfit_recommendations
      JOIN public.styling_sessions ON styling_sessions.id = outfit_recommendations.session_id
      WHERE outfit_recommendations.id = items.recommendation_id
      AND styling_sessions.stylist_id = auth.uid()
    )
  );

CREATE POLICY "Stylists can update items for their recommendations" ON public.items
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.outfit_recommendations
      JOIN public.styling_sessions ON styling_sessions.id = outfit_recommendations.session_id
      WHERE outfit_recommendations.id = items.recommendation_id
      AND styling_sessions.stylist_id = auth.uid()
    )
  );

CREATE POLICY "Stylists can delete items for their recommendations" ON public.items
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.outfit_recommendations
      JOIN public.styling_sessions ON styling_sessions.id = outfit_recommendations.session_id
      WHERE outfit_recommendations.id = items.recommendation_id
      AND styling_sessions.stylist_id = auth.uid()
    )
  );

-- Create function to handle profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create email_sends table to track all emails sent
CREATE TABLE public.email_sends (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recommendation_id UUID REFERENCES public.outfit_recommendations(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  stylist_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  email_subject TEXT NOT NULL,
  email_body TEXT NOT NULL,
  email_html TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  replied_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'sent' CHECK (status IN ('draft', 'sent', 'delivered', 'opened', 'replied'))
);

-- Create client_responses table to track client feedback
CREATE TABLE public.client_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email_send_id UUID REFERENCES public.email_sends(id) ON DELETE CASCADE,
  recommendation_id UUID REFERENCES public.outfit_recommendations(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  response_type TEXT CHECK (response_type IN ('love_it', 'modify', 'not_interested', 'need_different_size', 'budget_concern')),
  feedback_text TEXT,
  preferred_items UUID[] DEFAULT '{}', -- Array of item IDs they liked
  rejected_items UUID[] DEFAULT '{}',  -- Array of item IDs they didn't like
  budget_feedback TEXT,
  size_feedback TEXT,
  responded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create scraped_products table (造型师手动添加的商品)
CREATE TABLE public.scraped_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stylist_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  original_url TEXT NOT NULL, -- 造型师粘贴的URL
  product_name TEXT,
  brand TEXT,
  price DECIMAL(10,2),
  sale_price DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  image_urls TEXT[] DEFAULT '{}', -- 抓取的图片URLs
  description TEXT,
  availability TEXT,
  source_website TEXT, -- 自动识别网站 'zara.com', 'nordstrom.com', etc
  category TEXT,
  size_options TEXT[] DEFAULT '{}',
  color_options TEXT[] DEFAULT '{}',
  scrape_status TEXT DEFAULT 'pending' CHECK (scrape_status IN ('pending', 'success', 'failed', 'manual')),
  scrape_error TEXT, -- 如果抓取失败的错误信息
  manual_override BOOLEAN DEFAULT FALSE, -- 是否手动填写信息
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create url_scrape_sessions table (记录URL粘贴历史)
CREATE TABLE public.url_scrape_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stylist_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  urls_submitted TEXT[] DEFAULT '{}', -- 本次提交的所有URLs
  successful_scrapes INTEGER DEFAULT 0,
  failed_scrapes INTEGER DEFAULT 0,
  session_notes TEXT, -- 造型师的备注
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for new tables
ALTER TABLE public.email_sends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_results_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_sessions ENABLE ROW LEVEL SECURITY;

-- Policies for email_sends
CREATE POLICY "Stylists can view their own email sends" ON public.email_sends
  FOR SELECT USING (auth.uid() = stylist_id);

CREATE POLICY "Stylists can insert their own email sends" ON public.email_sends
  FOR INSERT WITH CHECK (auth.uid() = stylist_id);

-- Policies for client_responses
CREATE POLICY "Stylists can view responses to their recommendations" ON public.client_responses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.email_sends
      WHERE email_sends.id = client_responses.email_send_id
      AND email_sends.stylist_id = auth.uid()
    )
  );

-- Policies for search_results_cache (公开读取，造型师可以搜索所有结果)
CREATE POLICY "Everyone can view search results" ON public.search_results_cache
  FOR SELECT USING (true);

-- Policies for search_sessions (造型师只能看自己的搜索历史)
CREATE POLICY "Stylists can view their own searches" ON public.search_sessions
  FOR SELECT USING (auth.uid() = stylist_id);

CREATE POLICY "Stylists can insert their own searches" ON public.search_sessions
  FOR INSERT WITH CHECK (auth.uid() = stylist_id);

-- Create indexes for better performance
CREATE INDEX idx_clients_stylist_id ON public.clients(stylist_id);
CREATE INDEX idx_styling_sessions_stylist_id ON public.styling_sessions(stylist_id);
CREATE INDEX idx_styling_sessions_client_id ON public.styling_sessions(client_id);
CREATE INDEX idx_outfit_recommendations_session_id ON public.outfit_recommendations(session_id);
CREATE INDEX idx_items_recommendation_id ON public.items(recommendation_id);
CREATE INDEX idx_email_sends_stylist_id ON public.email_sends(stylist_id);
CREATE INDEX idx_email_sends_recommendation_id ON public.email_sends(recommendation_id);
CREATE INDEX idx_client_responses_email_send_id ON public.client_responses(email_send_id);
CREATE INDEX idx_search_results_cache_query ON public.search_results_cache(search_query);
CREATE INDEX idx_search_results_cache_source ON public.search_results_cache(source_website);
CREATE INDEX idx_search_results_cache_price ON public.search_results_cache(price);
CREATE INDEX idx_search_sessions_stylist_id ON public.search_sessions(stylist_id);
