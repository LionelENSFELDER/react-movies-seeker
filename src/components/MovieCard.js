import React from 'react'


function MovieCard({movie, data}){
    const genreIds = movie.genre_ids;
    const genres = data.genres;
    return movie.poster_path ?(
        <div className="col mb-4" data-tag={genreIds.map(x => genres.find(o => o.id === x).name)}>
            <div className="card bg-transparent h-100 text-left border-0 stretched-link" data-toggle="modal" data-target={`#modal_${movie.id}`}>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt="..."/>
            <div className="position-relative">
                <span className="movie-vote-pill rounded-circle bg-green p-1 font-weight-bold">{movie.vote_average}</span>
            </div>
            <div className="card-body text-white">
                <h5 className="card-title">{movie.title}</h5>

                <div class="">
                    {genreIds.map(x => 
                        <span class="badge badge-light mr-2">{genres.find(o => o.id === x).name}</span>
                    )}
                </div>

                
                <div className="modal fade" id={`modal_${movie.id}`} tabIndex="-1" aria-labelledby={`modal_label_${movie.id}`} aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content bg-dark-hard">
                    <div className="modal-header border-0">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">



                    <div className="row no-gutters">
                        <div className="col-md-4">
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img" alt="..."/>
                        </div>
                        <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title" id={`modal_label_${movie.id}`}>{movie.title}</h5>
                            <p className="card-text"><small className="text-muted">Release date: {movie.release_date}</small></p>
                            <p className="card-text">
                                <small className="text-muted">Genre: &nbsp;
                                    {genreIds.map(x => 
                                        genreIds.indexOf(x) === genreIds.length - 1 ? genres.find(o => o.id === x).name : genres.find(o => o.id === x).name + ", "
                                    )}
                                </small>
                            </p>
                            <p className="card-text"><small className="text-muted">Vote average: {movie.vote_average}</small></p>
                            <p className="card-text">Synopsis: {movie.overview}</p>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="modal-footer bg-transparent border-0">
                        
                    </div>
                    </div>
                </div>
                </div>




            </div>
            </div>
        </div>
    ) : null
}

export default MovieCard;