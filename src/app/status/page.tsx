import { SupabaseStatus } from '@/components/SupabaseStatus'

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">System Status</h1>
          <p className="text-gray-600 mt-2">
            Check the status of external services and configurations
          </p>
        </div>

        <div className="space-y-6">
          <SupabaseStatus />

          {/* You can add more status checks here */}
          {/* <OtherServiceStatus /> */}
        </div>
      </div>
    </div>
  )
}
