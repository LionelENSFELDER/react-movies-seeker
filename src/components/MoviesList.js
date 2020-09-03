import React from 'react'
import MovieCard from './MovieCard'

function MoviesList({ movies }) {
    return (
        <div className="row row-cols-1 row-cols-md-2">
            {movies.map((movie, index) => (
                <MovieCard key={movie.index} movie={movie} />
            ))}
        </div>
    )
}

export default MoviesList;