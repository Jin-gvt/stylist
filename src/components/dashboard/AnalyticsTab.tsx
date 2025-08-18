'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart, TrendingUp, Clock, Mail, Users, DollarSign } from 'lucide-react'

export function AnalyticsTab() {
  // Mock analytics data
  const metrics = {
    today: {
      emailsSent: 12,
      conversationsClaimed: 8,
      avgResponseTime: 1.2,
      customerSatisfaction: 4.8
    },
    week: {
      emailsSent: 68,
      conversationsClaimed: 45,
      avgResponseTime: 1.8,
      customerSatisfaction: 4.7
    },
    performance: {
      emailOpenRate: 82,
      clickThroughRate: 34,
      conversionRate: 28,
      revenueGenerated: 15420
    }
  }

  const MetricCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    trend,
    trendDirection
  }: {
    icon: any
    title: string
    value: string | number
    subtitle: string
    trend?: string
    trendDirection?: 'up' | 'down'
  }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Icon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
          </div>
          {trend && (
            <div className={`flex items-center space-x-1 text-sm ${
              trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className={`h-4 w-4 ${trendDirection === 'down' ? 'rotate-180' : ''}`} />
              <span>{trend}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
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
          <MetricCard
            icon={Mail}
            title="Emails Sent"
            value={metrics.today.emailsSent}
            subtitle="Today"
            trend="+15%"
            trendDirection="up"
          />
          <MetricCard
            icon={Users}
            title="Conversations Claimed"
            value={metrics.today.conversationsClaimed}
            subtitle="Today"
            trend="+8%"
            trendDirection="up"
          />
          <MetricCard
            icon={Clock}
            title="Avg Response Time"
            value={`${metrics.today.avgResponseTime} min`}
            subtitle="Today"
            trend="-12%"
            trendDirection="up"
          />
          <MetricCard
            icon={TrendingUp}
            title="Customer Satisfaction"
            value={`${metrics.today.customerSatisfaction}/5`}
            subtitle="Today"
            trend="+2%"
            trendDirection="up"
          />
        </div>
      </div>

      {/* Weekly Overview */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">This Week</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon={Mail}
            title="Emails Sent"
            value={metrics.week.emailsSent}
            subtitle="This week"
          />
          <MetricCard
            icon={Users}
            title="Conversations Claimed"
            value={metrics.week.conversationsClaimed}
            subtitle="This week"
          />
          <MetricCard
            icon={Clock}
            title="Avg Response Time"
            value={`${metrics.week.avgResponseTime} min`}
            subtitle="This week"
          />
          <MetricCard
            icon={TrendingUp}
            title="Customer Satisfaction"
            value={`${metrics.week.customerSatisfaction}/5`}
            subtitle="This week"
          />
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
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {metrics.performance.emailOpenRate}%
              </div>
              <div className="text-sm text-gray-600">Open Rate</div>
              <Badge variant="secondary" className="mt-2">Industry: 25%</Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {metrics.performance.clickThroughRate}%
              </div>
              <div className="text-sm text-gray-600">Click-Through Rate</div>
              <Badge variant="secondary" className="mt-2">Industry: 3%</Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {metrics.performance.conversionRate}%
              </div>
              <div className="text-sm text-gray-600">Conversion Rate</div>
              <Badge variant="secondary" className="mt-2">Industry: 18%</Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">
                ${metrics.performance.revenueGenerated.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Revenue Generated</div>
              <Badge variant="secondary" className="mt-2">This week</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest styling sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                time: '2 hours ago',
                action: 'Sent email to Emma Chen',
                details: 'Work blazers recommendation',
                status: 'opened'
              },
              {
                time: '3 hours ago',
                action: 'Claimed conversation',
                details: 'Sarah Johnson - Weekend outfits',
                status: 'in_progress'
              },
              {
                time: '4 hours ago',
                action: 'Email conversion',
                details: 'Lisa Wong purchased 2 items ($480)',
                status: 'converted'
              },
              {
                time: '5 hours ago',
                action: 'Sent email to Michael Davis',
                details: 'Formal event styling',
                status: 'clicked'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge
                    variant={
                      activity.status === 'converted' ? 'default' :
                      activity.status === 'opened' ? 'secondary' :
                      activity.status === 'clicked' ? 'outline' : 'outline'
                    }
                  >
                    {activity.status}
                  </Badge>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
