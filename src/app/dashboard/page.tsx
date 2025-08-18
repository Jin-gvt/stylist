'use client'

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, MessageSquare, PenTool, BarChart, Mail, Users, TrendingUp, DollarSign } from 'lucide-react'

export default function DashboardPage() {
  // Mock user for demo
  const user = {
    id: 'demo-stylist-001',
    email: 'stylist@demo.com',
    name: 'Demo Stylist',
    role: 'stylist' as const,
    avatar_url: undefined,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Stylist Console
              </h1>
              <Badge variant="secondary" className="capitalize">
                {user.role}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar_url} />
                  <AvatarFallback>
                    {user.name?.[0] || user.email[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700">
                  {user.name || user.email}
                </span>
              </div>
              <Button variant="ghost" size="sm" disabled>
                Demo Mode
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="queue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="queue">
              Queue
              <Badge variant="destructive" className="ml-2">
                3
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="queue" className="space-y-6">
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

            {/* Sample Conversations */}
            <div className="space-y-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>EC</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">Emma Chen</h3>
                            <Badge variant="destructive">urgent</Badge>
                            <div className="flex items-center space-x-1 text-sm text-red-600">
                              <Clock className="h-4 w-4" />
                              <span>15m ago</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">emma.chen@example.com</p>
                        </div>
                      </div>
                      <h4 className="font-medium text-gray-900">Need help finding work blazers</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>3 recent purchases</span>
                        <span>•</span>
                        <span>Style: minimalist, professional</span>
                        <span>•</span>
                        <span>Engagement: 85%</span>
                      </div>
                    </div>
                    <Button size="sm">Claim</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">Sarah Johnson</h3>
                            <Badge variant="outline">normal</Badge>
                            <div className="flex items-center space-x-1 text-sm text-yellow-600">
                              <Clock className="h-4 w-4" />
                              <span>45m ago</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">sarah.johnson@example.com</p>
                        </div>
                      </div>
                      <h4 className="font-medium text-gray-900">Looking for casual weekend outfits</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>1 recent purchase</span>
                        <span>•</span>
                        <span>Style: casual, bohemian</span>
                        <span>•</span>
                        <span>Engagement: 92%</span>
                      </div>
                    </div>
                    <Button size="sm">Claim</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compose" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PenTool className="h-5 w-5" />
                  <span>Email Composer</span>
                </CardTitle>
                <CardDescription>
                  Create personalized emails for your customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <PenTool className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Email Composer
                  </h3>
                  <p className="text-gray-600">
                    Drag and drop modules to build personalized emails
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart className="h-5 w-5" />
                  <span>Performance Analytics</span>
                </CardTitle>
                <CardDescription>
                  Track your styling performance and customer engagement
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Today's Metrics */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Emails Sent</p>
                        <p className="text-2xl font-bold text-gray-900">12</p>
                        <p className="text-sm text-gray-500">Today</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <Users className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Conversations</p>
                        <p className="text-2xl font-bold text-gray-900">8</p>
                        <p className="text-sm text-gray-500">Claimed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-50 rounded-lg">
                        <Clock className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Response Time</p>
                        <p className="text-2xl font-bold text-gray-900">1.2 min</p>
                        <p className="text-sm text-gray-500">Average</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Satisfaction</p>
                        <p className="text-2xl font-bold text-gray-900">4.8/5</p>
                        <p className="text-sm text-gray-500">Rating</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Email Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Email Performance Metrics</CardTitle>
                <CardDescription>
                  How your emails are performing with customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">82%</div>
                    <div className="text-sm text-gray-600">Open Rate</div>
                    <Badge variant="secondary" className="mt-2">Industry: 25%</Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">34%</div>
                    <div className="text-sm text-gray-600">Click-Through Rate</div>
                    <Badge variant="secondary" className="mt-2">Industry: 3%</Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">28%</div>
                    <div className="text-sm text-gray-600">Conversion Rate</div>
                    <Badge variant="secondary" className="mt-2">Industry: 18%</Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">$15,420</div>
                    <div className="text-sm text-gray-600">Revenue Generated</div>
                    <Badge variant="secondary" className="mt-2">This week</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}