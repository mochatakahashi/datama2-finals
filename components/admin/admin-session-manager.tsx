'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit2, Trash2, X } from 'lucide-react'

interface Session {
  id: number
  movieId: number
  movieTitle: string
  experience: string
  date: string
  time: string
  basePrice: number
  availableSeats: number
}

export default function AdminSessionManager() {
  const [sessions, setSessions] = useState<Session[]>([
    { id: 1, movieId: 1, movieTitle: 'Avatar 3', experience: '2D', date: '2025-02-14', time: '10:00 AM', basePrice: 250, availableSeats: 45 },
    { id: 2, movieId: 1, movieTitle: 'Avatar 3', experience: '3D', date: '2025-02-14', time: '1:00 PM', basePrice: 350, availableSeats: 32 },
    { id: 3, movieId: 2, movieTitle: 'Dune 3', experience: 'IMAX', date: '2025-02-14', time: '4:30 PM', basePrice: 450, availableSeats: 20 },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<Omit<Session, 'id'>>({
    movieId: 1,
    movieTitle: 'Avatar 3',
    experience: '2D',
    date: '',
    time: '',
    basePrice: 250,
    availableSeats: 50,
  })

  const movies = [
    { id: 1, title: 'Avatar 3' },
    { id: 2, title: 'Dune 3' },
    { id: 3, title: 'Inception 2' },
  ]

  const handleOpenModal = (session?: Session) => {
    if (session) {
      setEditingId(session.id)
      setFormData({
        movieId: session.movieId,
        movieTitle: session.movieTitle,
        experience: session.experience,
        date: session.date,
        time: session.time,
        basePrice: session.basePrice,
        availableSeats: session.availableSeats,
      })
    } else {
      setEditingId(null)
      setFormData({
        movieId: 1,
        movieTitle: 'Avatar 3',
        experience: '2D',
        date: '',
        time: '',
        basePrice: 250,
        availableSeats: 50,
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
  }

  const handleSave = () => {
    if (!formData.date || !formData.time) {
      alert('Please fill in all fields')
      return
    }

    if (editingId) {
      setSessions(sessions.map((s) => (s.id === editingId ? { ...s, ...formData } : s)))
    } else {
      setSessions([...sessions, { id: Date.now(), ...formData }])
    }
    handleCloseModal()
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      setSessions(sessions.filter((s) => s.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Session Management</h2>
          <p className="mt-1 text-muted-foreground">Add and manage movie showtimes</p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white"
        >
          <Plus className="h-4 w-4" />
          Add Session
        </Button>
      </div>

      {/* Session List */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-primary">Movie</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-primary">Experience</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-primary">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-primary">Time</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-primary">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-primary">Seats</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id} className="border-b border-border hover:bg-secondary/20 transition-colors">
                <td className="px-6 py-4 font-medium text-primary">{session.movieTitle}</td>
                <td className="px-6 py-4 text-muted-foreground">{session.experience}</td>
                <td className="px-6 py-4 text-muted-foreground">{session.date}</td>
                <td className="px-6 py-4 text-muted-foreground">{session.time}</td>
                <td className="px-6 py-4 font-semibold text-accent">₱{session.basePrice}</td>
                <td className="px-6 py-4 text-muted-foreground">{session.availableSeats}/50</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleOpenModal(session)}
                      className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(session.id)}
                      className="p-2 hover:bg-destructive/10 rounded-lg text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg border border-border p-6 w-full max-w-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-primary">
                {editingId ? 'Edit Session' : 'Add New Session'}
              </h3>
              <button onClick={handleCloseModal} className="text-muted-foreground hover:text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-primary">Movie</label>
                <select
                  value={formData.movieId}
                  onChange={(e) => {
                    const selected = movies.find((m) => m.id === Number(e.target.value))
                    setFormData({
                      ...formData,
                      movieId: Number(e.target.value),
                      movieTitle: selected?.title || '',
                    })
                  }}
                  className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  {movies.map((movie) => (
                    <option key={movie.id} value={movie.id}>
                      {movie.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-primary">Experience</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  >
                    <option>2D</option>
                    <option>3D</option>
                    <option>IMAX</option>
                    <option>4DX</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-primary">Price</label>
                  <Input
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                    placeholder="250"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-primary">Date</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary">Time</label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-primary">Available Seats</label>
                <Input
                  type="number"
                  value={formData.availableSeats}
                  onChange={(e) => setFormData({ ...formData, availableSeats: Number(e.target.value) })}
                  placeholder="50"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleCloseModal}
                variant="outline"
                className="flex-1 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1 bg-accent hover:bg-accent/90 text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
