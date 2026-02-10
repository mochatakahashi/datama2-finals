'use client';

import { LayoutDashboard, Film, Clock, BarChart3 } from 'lucide-react'

interface AdminSidebarProps {
  activeTab: string
  setActiveTab: (tab: any) => void
}

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'sessions', label: 'Sessions', icon: Clock },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ]

  return (
    <aside className="w-64 border-r border-border bg-card">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-border px-6 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-white">
          <span className="text-lg font-bold">🎬</span>
        </div>
        <h1 className="text-xl font-bold text-primary">CinemaHub</h1>
      </div>

      {/* Menu */}
      <nav className="space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-accent text-white'
                  : 'text-muted-foreground hover:bg-secondary hover:text-primary'
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
