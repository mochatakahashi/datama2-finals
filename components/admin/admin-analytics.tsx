'use client'

export default function AdminAnalytics() {
  const revenueData = [
    { day: 'Mon', revenue: 12000 },
    { day: 'Tue', revenue: 15000 },
    { day: 'Wed', revenue: 10000 },
    { day: 'Thu', revenue: 18000 },
    { day: 'Fri', revenue: 22000 },
    { day: 'Sat', revenue: 28000 },
    { day: 'Sun', revenue: 24000 },
  ]

  const topMovies = [
    { title: 'Avatar 3', bookings: 342, revenue: 85500 },
    { title: 'Dune 3', bookings: 298, revenue: 74500 },
    { title: 'Inception 2', bookings: 212, revenue: 52900 },
    { title: 'Twisters 2', bookings: 156, revenue: 39000 },
  ]

  const experienceStats = [
    { type: '2D', percentage: 35, count: 892 },
    { type: '3D', percentage: 30, count: 763 },
    { type: 'IMAX', percentage: 20, count: 509 },
    { type: '4DX', percentage: 15, count: 382 },
  ]

  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue))

  return (
    <div className="space-y-8">
      {/* Weekly Revenue Chart */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold text-primary">Weekly Revenue</h2>
        <div className="space-y-4">
          {revenueData.map((data) => {
            const percentage = (data.revenue / maxRevenue) * 100
            return (
              <div key={data.day} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-primary">{data.day}</span>
                  <span className="text-accent font-semibold">₱{data.revenue.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-accent transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Top Movies */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold text-primary">Top Movies This Week</h2>
        <div className="space-y-4">
          {topMovies.map((movie, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg bg-secondary/30 p-4">
              <div>
                <p className="font-medium text-primary">{movie.title}</p>
                <p className="text-sm text-muted-foreground">{movie.bookings} bookings</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-accent">₱{movie.revenue.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Distribution */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold text-primary">Experience Distribution</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {experienceStats.map((stat) => (
            <div key={stat.type} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-primary">{stat.type}</span>
                <span className="text-sm font-semibold text-accent">{stat.percentage}%</span>
              </div>
              <div className="h-3 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-accent transition-all"
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{stat.count} bookings</p>
            </div>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Avg Booking Value</p>
          <p className="mt-2 text-2xl font-bold text-accent">₱852</p>
          <p className="mt-2 text-xs text-green-600">+5% vs last week</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Occupancy Rate</p>
          <p className="mt-2 text-2xl font-bold text-accent">78%</p>
          <p className="mt-2 text-xs text-green-600">+12% vs last week</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Bookings</p>
          <p className="mt-2 text-2xl font-bold text-accent">2,546</p>
          <p className="mt-2 text-xs text-green-600">+8% vs last week</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Cancellations</p>
          <p className="mt-2 text-2xl font-bold text-accent">42</p>
          <p className="mt-2 text-xs text-green-600">-2% vs last week</p>
        </div>
      </div>
    </div>
  )
}
