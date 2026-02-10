'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const SEATS_PER_ROW = 12

type SeatStatus = 'available' | 'reserved' | 'selected'

const generateSeatMap = () => {
  const map: Record<string, SeatStatus> = {}
  for (const row of ROWS) {
    for (let i = 1; i <= SEATS_PER_ROW; i++) {
      const seatId = `${row}${i}`
      const rand = Math.random()
      if (rand > 0.85) {
        map[seatId] = 'reserved'
      } else {
        map[seatId] = 'available'
      }
    }
  }
  return map
}

export default function SeatSelection({
  session,
  onSelect,
  onBack,
}: {
  session: any
  onSelect: (seats: string[]) => void
  onBack: () => void
}) {
  const [seatMap, setSeatMap] = useState(generateSeatMap())
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  const toggleSeat = (seatId: string) => {
    if (seatMap[seatId] === 'reserved') return

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId))
    } else {
      setSelectedSeats([...selectedSeats, seatId])
    }
  }

  const getSeatStatus = (seatId: string): SeatStatus => {
    if (selectedSeats.includes(seatId)) return 'selected'
    return seatMap[seatId]
  }

  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      onSelect(selectedSeats.sort())
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 gap-2 text-muted-foreground hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Showtimes
        </Button>
        <h2 className="text-2xl font-bold text-primary">Select Your Seats</h2>
        <p className="mt-2 text-muted-foreground">Choose your preferred seats for {session.experience} experience</p>
      </div>

      <Card className="space-y-6 border-border p-6">
        {/* Legend */}
        <div className="flex flex-wrap gap-6 border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded border border-primary bg-transparent" />
            <span className="text-sm text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-muted" />
            <span className="text-sm text-muted-foreground">Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-accent" />
            <span className="text-sm text-muted-foreground">Selected</span>
          </div>
        </div>

        {/* Screen */}
        <div className="flex items-center justify-center">
          <div className="h-1 w-48 rounded-full bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
        </div>
        <p className="text-center text-xs font-semibold text-muted-foreground">SCREEN</p>

        {/* Seats */}
        <div className="space-y-3 py-6">
          {ROWS.map((row) => (
            <div key={row} className="flex items-center justify-center gap-2">
              <span className="w-6 text-right text-sm font-medium text-muted-foreground">{row}</span>
              <div className="flex gap-2">
                {Array.from({ length: SEATS_PER_ROW }).map((_, i) => {
                  const seatId = `${row}${i + 1}`
                  const status = getSeatStatus(seatId)

                  return (
                    <button
                      key={seatId}
                      onClick={() => toggleSeat(seatId)}
                      disabled={status === 'reserved'}
                      className={`h-8 w-8 rounded text-xs font-medium transition-all duration-200 ${
                        status === 'reserved'
                          ? 'cursor-not-allowed bg-muted text-muted-foreground'
                          : status === 'selected'
                            ? 'bg-accent text-accent-foreground ring-2 ring-accent ring-offset-2'
                            : 'border border-primary bg-transparent text-primary hover:bg-primary/10'
                      }`}
                    >
                      {i + 1}
                    </button>
                  )
                })}
              </div>
              <span className="w-6 text-left text-sm font-medium text-muted-foreground">{row}</span>
            </div>
          ))}
        </div>

        {/* Summary and Continue */}
        <div className="border-t border-border pt-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {selectedSeats.length === 0
                ? 'Select at least one seat'
                : `${selectedSeats.length} seat${selectedSeats.length !== 1 ? 's' : ''} selected`}
            </p>
            {selectedSeats.length > 0 && (
              <p className="font-semibold text-accent">₱{session.basePrice * selectedSeats.length}</p>
            )}
          </div>
          <Button
            onClick={handleContinue}
            disabled={selectedSeats.length === 0}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  )
}
