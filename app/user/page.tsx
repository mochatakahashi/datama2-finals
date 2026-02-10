'use client'

import { useState } from 'react'
import MovieBrowser from '@/components/movie-browser'
import SessionSelector from '@/components/session-selector'
import SeatSelection from '@/components/seat-selection'
import CheckoutSummary from '@/components/checkout-summary'
import CustomerInfo from '@/components/customer-info'

type BookingStep = 'movies' | 'sessions' | 'seats' | 'customer' | 'payment'

export default function Home() {
  const [step, setStep] = useState<BookingStep>('movies')
  const [selectedMovie, setSelectedMovie] = useState<any>(null)
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [customerData, setCustomerData] = useState<any>(null)

  const handleMovieSelect = (movie: any) => {
    setSelectedMovie(movie)
    setStep('sessions')
  }

  const handleSessionSelect = (session: any) => {
    setSelectedSession(session)
    setStep('seats')
  }

  const handleSeatsSelect = (seats: string[]) => {
    setSelectedSeats(seats)
    setStep('customer')
  }

  const handleCustomerInfo = (data: any) => {
    setCustomerData(data)
    setStep('payment')
  }

  const handleBack = () => {
    if (step === 'sessions') {
      setSelectedMovie(null)
      setStep('movies')
    } else if (step === 'seats') {
      setSelectedSession(null)
      setStep('sessions')
    } else if (step === 'customer') {
      setSelectedSeats([])
      setStep('seats')
    } else if (step === 'payment') {
      setCustomerData(null)
      setStep('customer')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">CinemaHub</h1>
            <div className="text-sm text-muted-foreground">
              Step {step === 'movies' ? 1 : step === 'sessions' ? 2 : step === 'seats' ? 3 : step === 'customer' ? 4 : 5} of 5
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {step === 'movies' && <MovieBrowser onSelect={handleMovieSelect} />}
            {step === 'sessions' && selectedMovie && (
              <SessionSelector movie={selectedMovie} onSelect={handleSessionSelect} onBack={handleBack} />
            )}
            {step === 'seats' && selectedSession && (
              <SeatSelection session={selectedSession} onSelect={handleSeatsSelect} onBack={handleBack} />
            )}
            {step === 'customer' && selectedSession && (
              <CustomerInfo onSubmit={handleCustomerInfo} onBack={handleBack} />
            )}
            {step === 'payment' && (
              <CheckoutSummary
                movie={selectedMovie}
                session={selectedSession}
                seats={selectedSeats}
                customer={customerData}
                onBack={handleBack}
              />
            )}
          </div>

          {/* Right Sidebar - Summary */}
          {step !== 'movies' && (
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-4 rounded-lg border border-border bg-card p-6">
                <h2 className="font-semibold text-primary">Booking Summary</h2>
                {selectedMovie && (
                  <div>
                    <p className="text-xs text-muted-foreground">Movie</p>
                    <p className="font-medium text-primary">{selectedMovie.title}</p>
                  </div>
                )}
                {selectedSession && (
                  <div>
                    <p className="text-xs text-muted-foreground">Showtime</p>
                    <p className="font-medium text-primary">{selectedSession.time}</p>
                    <p className="text-sm text-muted-foreground">{selectedSession.experience}</p>
                  </div>
                )}
                {selectedSeats.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground">Seats ({selectedSeats.length})</p>
                    <p className="font-medium text-primary">{selectedSeats.join(', ')}</p>
                  </div>
                )}
                {selectedSeats.length > 0 && selectedSession && (
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Base Price</span>
                      <span className="text-primary">₱{selectedSession.basePrice * selectedSeats.length}</span>
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-muted-foreground">Convenience Fee</span>
                      <span className="text-primary">₱20.00</span>
                    </div>
                    <div className="mt-4 flex justify-between border-t border-border pt-4 font-semibold">
                      <span>Total</span>
                      <span className="text-accent">₱{selectedSession.basePrice * selectedSeats.length + 20}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
