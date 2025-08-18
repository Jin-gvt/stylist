'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { PenTool, Eye, Send, Save } from 'lucide-react'
import { useState } from 'react'

export function ComposeTab() {
  const [subject, setSubject] = useState('')
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [modules, setModules] = useState<any[]>([])
  const [saving, setSaving] = useState(false)

  const handleSaveDraft = async () => {
    setSaving(true)
    try {
      // TODO: Implement save draft logic
      console.log('Saving draft...', { subject, modules })
    } catch (error) {
      console.error('Failed to save draft:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleSend = async () => {
    try {
      // TODO: Implement send email logic
      console.log('Sending email...', { subject, modules })
    } catch (error) {
      console.error('Failed to send email:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Compose Header */}
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
          <div className="space-y-4">
            {/* Conversation Selection */}
            <div className="space-y-2">
              <Label htmlFor="conversation">Select Conversation</Label>
              <select
                id="conversation"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={selectedConversation || ''}
                onChange={(e) => setSelectedConversation(e.target.value || null)}
              >
                <option value="">Choose a conversation...</option>
                <option value="conv_001">Emma Chen - Work blazers</option>
                <option value="conv_002">Sarah Johnson - Weekend outfits</option>
              </select>
            </div>

            {/* Subject Line */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject Line</Label>
              <Input
                id="subject"
                placeholder="Your perfect work blazers ✨"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Email Editor</CardTitle>
            <CardDescription>
              Drag and drop modules to build your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Module Palette */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Available Modules</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: 'hero_look', label: 'Hero Look', color: 'blue' },
                    { type: 'occasion_capsule', label: 'Occasion Capsule', color: 'green' },
                    { type: 'wardrobe_gap', label: 'Wardrobe Gap', color: 'yellow' },
                    { type: 'intent_tile', label: 'Intent Tile', color: 'purple' },
                    { type: 'style_story', label: 'Style Story', color: 'pink' },
                    { type: 'perk', label: 'Perk', color: 'orange' }
                  ].map((module) => (
                    <Button
                      key={module.type}
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => {
                        // TODO: Add module to canvas
                        console.log('Adding module:', module.type)
                      }}
                    >
                      <div className={`w-3 h-3 rounded-full bg-${module.color}-500 mr-2`} />
                      {module.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Canvas Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 min-h-[300px]">
                {modules.length === 0 ? (
                  <div className="text-center text-gray-500">
                    <PenTool className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Drag modules here to start composing</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {modules.map((module, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <Badge variant="secondary">{module.type}</Badge>
                        <h4 className="font-medium mt-2">{module.title}</h4>
                        <p className="text-sm text-gray-600">{module.rationale}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Email Preview</span>
            </CardTitle>
            <CardDescription>
              Live preview of your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4 bg-white min-h-[400px]">
              {/* Email Preview */}
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="text-sm text-gray-600 mb-1">Subject:</div>
                  <div className="font-medium">{subject || 'No subject'}</div>
                </div>

                {modules.length === 0 ? (
                  <div className="text-center text-gray-400 py-12">
                    <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Email preview will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {modules.map((module, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <h3 className="font-semibold">{module.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{module.rationale}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {selectedConversation ? 'Ready to send' : 'Select a conversation to continue'}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                disabled={saving}
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button
                onClick={handleSend}
                disabled={!selectedConversation || !subject}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
