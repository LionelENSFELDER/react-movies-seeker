import React from 'react'

function MovieCard({ movie }) {
    return movie.poster_path ?(
        <div className="col mb-4">
            <div className="card">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <h5 className="card-title">{movie.release_date}</h5>
                <p className="card-text">{movie.overview}</p>
                <p className="card-text">{movie.vote_average}</p>
                <p className="card-text">{movie.genre_ids}</p>
            </div>
            </div>
        </div>
    ) : null
}

export default MovieCard;