import React from 'react'

function MovieCard({ movie }) {
    return movie.poster_path ?(
        <div className="col mb-4">
            <div className="card h-100">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <h5 className="card-title">{movie.release_date}</h5>
                <p className="card-text">{movie.vote_average}</p>
                <p className="card-text">{movie.genre_ids}</p>
                <a class="btn btn-primary" data-toggle="collapse" href={`#collapse_${movie.id}`} role="button" aria-expanded="false" aria-controls={`collapse_${movie.id}`}>
                    Description
                </a>
                <div class="collapse" id={`collapse_${movie.id}`}>
                    <div class="">
                        <p className="card-text">{movie.overview}</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    ) : null
}

export default MovieCard;