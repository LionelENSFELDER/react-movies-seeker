import React from 'react'
import MovieCard from './MovieCard'

function MoviesList({movies, data}) {
    return (
        <div className="row row-cols-1 row-cols-md-5">
            {movies.map((movie, index) => (<MovieCard key={movie.id} movie={movie} data={data}/>))}
        </div>
    )
}

export default MoviesList;