'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronLeft } from 'lucide-react'

export default function CustomerInfo({
  onSubmit,
  onBack,
}: {
  onSubmit: (data: any) => void
  onBack: () => void
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.firstName && formData.lastName && formData.email && formData.phone) {
      onSubmit(formData)
    }
  }

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.phone

  return (
    <div className="space-y-6">
      <div>
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-4 gap-2 text-muted-foreground hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Seats
        </Button>
        <h2 className="text-2xl font-bold text-primary">Your Information</h2>
        <p className="mt-2 text-muted-foreground">Please provide your details to complete the booking</p>
      </div>

      <Card className="border-border p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Name */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-primary">
                First Name <span className="text-accent">*</span>
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="border-border bg-input text-primary placeholder:text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-primary">
                Last Name <span className="text-accent">*</span>
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="border-border bg-input text-primary placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Row 2: Email & Phone */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary">
                Email Address <span className="text-accent">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="border-border bg-input text-primary placeholder:text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-primary">
                Phone Number <span className="text-accent">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+63 912 345 6789"
                className="border-border bg-input text-primary placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Row 3: DOB */}
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-primary">
              Date of Birth
            </Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="border-border bg-input text-primary"
            />
          </div>

          {/* Note */}
          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <p className="text-xs text-muted-foreground">
              Your information is secure and will be used only for this booking. Please ensure accuracy for ticket
              delivery.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="flex-1 border-border text-primary hover:bg-secondary bg-transparent"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid}
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
            >
              Continue to Payment
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
