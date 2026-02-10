'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ChevronLeft, Check } from 'lucide-react'

export default function CheckoutSummary({
  movie,
  session,
  seats,
  customer,
  onBack,
}: {
  movie: any
  session: any
  seats: string[]
  customer: any
  onBack: () => void
}) {
  const [paymentMethod, setPaymentMethod] = useState('gcash')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  })

  const baseTotal = session.basePrice * seats.length
  const convenienceFee = 20
  const total = baseTotal + convenienceFee

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsComplete(true)
  }

  if (isComplete) {
    return (
      <div className="space-y-6">
        <Card className="border-border p-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-primary">Booking Confirmed!</h2>
          <p className="mt-2 text-muted-foreground">Your tickets have been successfully booked.</p>

          <div className="mt-8 space-y-4 rounded-lg border border-border bg-secondary/30 p-6 text-left">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Booking Reference:</span>
              <span className="font-semibold text-primary">BK{Math.random().toString().slice(2, 8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-4">
              <span className="text-muted-foreground">Confirmation sent to:</span>
              <span className="font-semibold text-primary">{customer.email}</span>
            </div>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">Please arrive 15 minutes before showtime.</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Book Another Movie
          </Button>
        </Card>
      </div>
    )
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
          Back to Information
        </Button>
        <h2 className="text-2xl font-bold text-primary">Complete Your Payment</h2>
        <p className="mt-2 text-muted-foreground">Review your booking details and select a payment method</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Booking Details */}
        <Card className="space-y-6 border-border p-6">
          <div>
            <h3 className="font-semibold text-primary">Booking Details</h3>
          </div>

          <div className="space-y-4 border-t border-border pt-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Movie</span>
              <span className="font-medium text-primary">{movie.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date & Time</span>
              <span className="font-medium text-primary">
                {session.date}, {session.time}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Format</span>
              <span className="font-medium text-primary">{session.experience}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Seats</span>
              <span className="font-medium text-primary">{seats.join(', ')}</span>
            </div>
          </div>

          <div className="space-y-3 border-t border-border pt-4">
            <h3 className="font-semibold text-primary">Attendee</h3>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Name</span>
              <span className="text-primary">
                {customer.firstName} {customer.lastName}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Email</span>
              <span className="text-primary">{customer.email}</span>
            </div>
          </div>
        </Card>

        {/* Right: Payment */}
        <div className="space-y-6">
          <Card className="border-border p-6">
            <div className="mb-6">
              <h3 className="font-semibold text-primary">Select Payment Method</h3>
            </div>

            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                  <RadioGroupItem value="gcash" id="gcash" />
                  <Label htmlFor="gcash" className="flex-1 cursor-pointer text-primary">
                    GCash
                  </Label>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                  <RadioGroupItem value="creditcard" id="creditcard" />
                  <Label htmlFor="creditcard" className="flex-1 cursor-pointer text-primary">
                    Credit Card
                  </Label>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex-1 cursor-pointer text-primary">
                    Cash at Theater
                  </Label>
                </div>
              </div>
            </RadioGroup>

            {paymentMethod === 'creditcard' && (
              <div className="mt-6 space-y-4 border-t border-border pt-6">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-primary">
                    Card Number
                  </Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.cardNumber}
                    onChange={handleCardChange}
                    className="border-border bg-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardName" className="text-primary">
                    Cardholder Name
                  </Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    placeholder="John Doe"
                    value={cardData.cardName}
                    onChange={handleCardChange}
                    className="border-border bg-input"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="expiry" className="text-primary">
                      Expiry Date
                    </Label>
                    <Input
                      id="expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={handleCardChange}
                      className="border-border bg-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-primary">
                      CVV
                    </Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={handleCardChange}
                      className="border-border bg-input"
                    />
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Price Breakdown */}
          <Card className="space-y-4 border-border p-6">
            <h3 className="font-semibold text-primary">Price Summary</h3>
            <div className="space-y-3 border-t border-border pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Tickets ({seats.length} × ₱{session.basePrice})
                </span>
                <span className="text-primary">₱{baseTotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Convenience Fee</span>
                <span className="text-primary">₱{convenienceFee}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 font-semibold">
                <span>Total</span>
                <span className="text-accent">₱{total}</span>
              </div>
            </div>
          </Card>

          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : `Pay ₱${total}`}
          </Button>
        </div>
      </div>
    </div>
  )
}
