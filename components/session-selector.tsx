'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'

const mockSessions = [
  {
    id: 1,
    date: 'Today',
    time: '2:30 PM',
    experience: '2D',
    basePrice: 250,
    availableSeats: 48,
  },
  {
    id: 2,
    date: 'Today',
    time: '5:00 PM',
    experience: '3D',
    basePrice: 350,
    availableSeats: 12,
  },
  {
    id: 3,
    date: 'Today',
    time: '8:00 PM',
    experience: '4DX 3D',
    basePrice: 450,
    availableSeats: 8,
  },
  {
    id: 4,
    date: 'Tomorrow',
    time: '10:00 AM',
    experience: '2D',
    basePrice: 250,
    availableSeats: 65,
  },
  {
    id: 5,
    date: 'Tomorrow',
    time: '1:15 PM',
    experience: 'IMAX 3D',
    basePrice: 500,
    availableSeats: 25,
  },
  {
    id: 6,
    date: 'Tomorrow',
    time: '7:45 PM',
    experience: '3D',
    basePrice: 350,
    availableSeats: 3,
  },
]

export default function SessionSelector({
  movie,
  onSelect,
  onBack,
}: {
  movie: any
  onSelect: (session: any) => void
  onBack: () => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 gap-2 text-muted-foreground hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Movies
        </Button>
        <h2 className="text-2xl font-bold text-primary">Select a Showtime</h2>
        <p className="mt-2 text-muted-foreground">Choose your preferred date and time for {movie.title}</p>
      </div>

      <div className="space-y-4">
        {mockSessions.map((session) => (
          <Card
            key={session.id}
            className="flex items-center justify-between border-border p-4 hover:bg-secondary/50 transition-colors duration-200 cursor-pointer"
            onClick={() => onSelect(session)}
          >
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{session.date}</p>
                  <p className="text-xl font-bold text-primary">{session.time}</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <p className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">
                    {session.experience}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{session.availableSeats} seats available</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <p className="text-lg font-bold text-accent">₱{session.basePrice}</p>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                size="sm"
              >
                Select
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
