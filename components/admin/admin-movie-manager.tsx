'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit2, Trash2, X } from 'lucide-react'

interface Movie {
  id: number
  title: string
  genre: string
  rating: string
  duration: number
  releaseDate: string
}

export default function AdminMovieManager() {
  const [movies, setMovies] = useState<Movie[]>([
    { id: 1, title: 'Avatar 3', genre: 'Sci-Fi', rating: 'PG-13', duration: 165, releaseDate: '2025-12-22' },
    { id: 2, title: 'Dune 3', genre: 'Adventure', rating: 'PG-13', duration: 180, releaseDate: '2025-02-28' },
    { id: 3, title: 'Inception 2', genre: 'Thriller', rating: 'R', duration: 148, releaseDate: '2025-03-15' },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<Omit<Movie, 'id'>>({
    title: '',
    genre: '',
    rating: 'PG-13',
    duration: 120,
    releaseDate: '',
  })

  const handleOpenModal = (movie?: Movie) => {
    if (movie) {
      setEditingId(movie.id)
      setFormData({
        title: movie.title,
        genre: movie.genre,
        rating: movie.rating,
        duration: movie.duration,
        releaseDate: movie.releaseDate,
      })
    } else {
      setEditingId(null)
      setFormData({ title: '', genre: '', rating: 'PG-13', duration: 120, releaseDate: '' })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
  }

  const handleSave = () => {
    if (!formData.title || !formData.genre || !formData.releaseDate) {
      alert('Please fill in all fields')
      return
    }

    if (editingId) {
      setMovies(movies.map((m) => (m.id === editingId ? { ...m, ...formData } : m)))
    } else {
      setMovies([...movies, { id: Date.now(), ...formData }])
    }
    handleCloseModal()
  }

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      setMovies(movies.filter((m) => m.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-primary">Movie Management</h2>
          <p className="mt-1 text-muted-foreground">Add and manage movies</p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white"
        >
          <Plus className="h-4 w-4" />
          Add Movie
        </Button>
      </div>

      {/* Movie List */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-primary">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-primary">Genre</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-primary">Rating</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-primary">Duration</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-primary">Release Date</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id} className="border-b border-border hover:bg-secondary/20 transition-colors">
                <td className="px-6 py-4 font-medium text-primary">{movie.title}</td>
                <td className="px-6 py-4 text-muted-foreground">{movie.genre}</td>
                <td className="px-6 py-4 text-muted-foreground">{movie.rating}</td>
                <td className="px-6 py-4 text-muted-foreground">{movie.duration} min</td>
                <td className="px-6 py-4 text-muted-foreground">{movie.releaseDate}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleOpenModal(movie)}
                      className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id)}
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
                {editingId ? 'Edit Movie' : 'Add New Movie'}
              </h3>
              <button onClick={handleCloseModal} className="text-muted-foreground hover:text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-primary">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Movie title"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-primary">Genre</label>
                  <Input
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    placeholder="Genre"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary">Rating</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  >
                    <option>G</option>
                    <option>PG</option>
                    <option>PG-13</option>
                    <option>R</option>
                    <option>NC-17</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-primary">Duration (min)</label>
                  <Input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                    placeholder="120"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-primary">Release Date</label>
                  <Input
                    type="date"
                    value={formData.releaseDate}
                    onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                    className="mt-1"
                  />
                </div>
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
