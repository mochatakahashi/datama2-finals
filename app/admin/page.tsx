'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AdminSidebar from '@/components/admin/admin-sidebar'
import AdminMovieManager from '@/components/admin/admin-movie-manager'
import AdminSessionManager from '@/components/admin/admin-session-manager'
import AdminAnalytics from '@/components/admin/admin-analytics'
import { LogOut } from 'lucide-react'

type AdminTab = 'overview' | 'movies' | 'sessions' | 'analytics'

export default function AdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<AdminTab>('overview')

  const handleLogout = () => {
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    router.push('/login')
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">Cinema Management</h1>
              <p className="text-sm text-muted-foreground">Manage movies, sessions, and bookings</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-gradient-to-br from-background to-secondary/20">
          <div className="p-8">
            {activeTab === 'overview' && <AdminOverview />}
            {activeTab === 'movies' && <AdminMovieManager />}
            {activeTab === 'sessions' && <AdminSessionManager />}
            {activeTab === 'analytics' && <AdminAnalytics />}
          </div>
        </div>
      </div>
    </div>
  )
}

function AdminOverview() {
  const stats = [
    { label: 'Total Movies', value: '12', change: '+2 this month' },
    { label: 'Active Sessions', value: '48', change: '+8 today' },
    { label: 'Total Bookings', value: '1,284', change: '+156 this week' },
    { label: 'Revenue', value: '₱85,600', change: '+12% vs last week' },
  ]

  const recentBookings = [
    { id: 1, customer: 'Juan Dela Cruz', movie: 'Avatar 3', seats: 4, amount: '₱1,200', status: 'Completed' },
    { id: 2, customer: 'Maria Santos', movie: 'Dune 3', seats: 2, amount: '₱600', status: 'Completed' },
    { id: 3, customer: 'Pedro Reyes', movie: 'Inception 2', seats: 3, amount: '₱900', status: 'Pending' },
    { id: 4, customer: 'Ana Garcia', movie: 'Twisters 2', seats: 2, amount: '₱600', status: 'Completed' },
    { id: 5, customer: 'Luis Mendoza', movie: 'Avatar 3', seats: 5, amount: '₱1,500', status: 'Pending' },
  ]

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-primary">{stat.value}</p>
            <p className="mt-2 text-xs text-accent">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-primary">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Customer</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Movie</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Seats</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Amount</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-border hover:bg-secondary/20">
                  <td className="px-4 py-3 text-primary">{booking.customer}</td>
                  <td className="px-4 py-3 text-primary">{booking.movie}</td>
                  <td className="px-4 py-3 text-muted-foreground">{booking.seats}</td>
                  <td className="px-4 py-3 font-semibold text-accent">{booking.amount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                        booking.status === 'Completed'
                          ? 'bg-green-100/20 text-green-700'
                          : 'bg-yellow-100/20 text-yellow-700'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
