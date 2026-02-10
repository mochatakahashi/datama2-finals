'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const mockMovies = [
  {
    id: 1,
    title: 'The Quantum Paradox',
    genre: 'Sci-Fi',
    rating: 'PG-13',
    duration: 148,
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 2,
    title: 'Echoes of Yesterday',
    genre: 'Drama',
    rating: 'R-16',
    duration: 132,
    image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 3,
    title: 'The Last Guardian',
    genre: 'Action',
    rating: 'PG-13',
    duration: 156,
    image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 4,
    title: 'Whispers in the Dark',
    genre: 'Horror',
    rating: 'R-18',
    duration: 104,
    image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    id: 5,
    title: 'Love in the City',
    genre: 'Romance',
    rating: 'PG',
    duration: 118,
    image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
  {
    id: 6,
    title: 'Comedy Night Out',
    genre: 'Comedy',
    rating: 'PG',
    duration: 95,
    image: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  },
]

export default function MovieBrowser({ onSelect }: { onSelect: (movie: any) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary">Now Showing</h2>
        <p className="mt-2 text-muted-foreground">Select a movie to book your tickets</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {mockMovies.map((movie) => (
          <Card key={movie.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div
              className="h-40 w-full"
              style={{ backgroundImage: movie.image }}
            />
            <div className="space-y-4 p-4">
              <div>
                <h3 className="font-semibold text-primary">{movie.title}</h3>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{movie.genre}</span>
                  <span className="rounded-full bg-secondary px-2 py-1 text-primary font-medium">
                    {movie.rating}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{movie.duration} minutes</p>
              <Button
                onClick={() => onSelect(movie)}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Book Now
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
