import React from 'react'
import { useEffect, useReducer } from 'react'
import axios from 'axios'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import CircularProgress from '@material-ui/core/CircularProgress'
import Logo from './assets/popcorn.svg'
import MoviesList from './components/MoviesList'
import GenreSelect from './components/GenreSelect'
import './App.css';

function App() {

	const initialState = {
		typedInMovieTitle: "",
		submittedMovieTitle: "",
		movies: [],
		isLoading: false,
		isError: false,
		genres: [],
		popular: false,
  	}

	const ACTION = {
		TYPE_SEARCH: "TYPE_SEARCH",
		SUBMIT_SEARCH: "SUBMIT_SEARCH",
		FETCH_DATA: "FETCH_DATA",
		FETCH_DATA_SUCCESS: "FETCH_DATA_SUCCESS",
		FETCH_DATA_FAIL: "FETCH_DATA_FAIL",
		FETCH_DATA_GENRES_SUCCESS: "ACTION.FETCH_DATA_GENRES_SUCCESS",
		SUBMIT_POPULAR: "SUBMIT_POPULAR",
		FETCH_DATA_POPULAR_SUCCESS: "ACTION.FETCH_DATA_POPULAR_SUCCESS",
  	}

	function onChange(event) {
		dispatch({
			type: ACTION.TYPE_SEARCH,
			value: event.target.value,
		});
	}

	function onSubmit(event) {
		event.preventDefault();
		dispatch({
			type: ACTION.SUBMIT_SEARCH,
		});
	}

	function handleGetPopular(event){
        event.preventDefault();
		dispatch({
			type: ACTION.SUBMIT_POPULAR,
		});
    }

	const reducer = (state, action) => {
		switch (action.type) {
			case ACTION.TYPE_SEARCH:
				return {
					...state,
					typedInMovieTitle: action.value,
				}
			case ACTION.SUBMIT_SEARCH:
				return {
					...state,
					submittedMovieTitle: state.typedInMovieTitle,
					popular: false,
				}
			case ACTION.FETCH_DATA:
				return {
					...state,
					isLoading: true,
				};
			case ACTION.FETCH_DATA_SUCCESS:
				return {
					...state,
					isLoading: false,
					movies: action.value,
				};
			case ACTION.FETCH_DATA_FAIL:
				return {
					...state,
					isError: true,
				};
			case ACTION.FETCH_DATA_GENRES_SUCCESS:
				return {
					...state,
					isError: false,
					genres: action.value,
				};
			case ACTION.SUBMIT_POPULAR:
				return {
					...state,
					submittedMovieTitle: "",
					popular: true,
					typedInMovieTitle: "",
				};
			case ACTION.FETCH_DATA_POPULAR_SUCCESS:
				return {
					...state,
					isError: false,
					isLoading: false,
					movies: action.value,
				};
			default:
				return state;
		}
	}

	const [state, dispatch] = useReducer(reducer, initialState);
	  
	const API_Key = "3047ca0f5fac291860193498b5d24f44";

	useEffect(() => {
		if (state.submittedMovieTitle != "") {
			const fetchData = async () => {
				dispatch({ type: "FETCH_DATA" });
				try {
					const result = await axios(`https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&query=${state.submittedMovieTitle}`);
					dispatch({
						type: ACTION.FETCH_DATA_SUCCESS,
						value: result.data.results,
					});
				} catch (error) {
					dispatch({ type: "FETCH_FAILURE" });
				}
			};
			fetchData();
		}

		const fetchDataGenres = async () => {
			dispatch({ type: "FETCH_DATA" });
			try {
			const result = await axios(
				`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_Key}&language=en-US`
			);
			dispatch({
				type: ACTION.FETCH_DATA_GENRES_SUCCESS,
				value: result.data.genres,
			});
			} catch (error) {
			dispatch({ type: "FETCH_FAILURE" });
			}
		};
		fetchDataGenres();

		if (state.popular === true) {
			const fetchPopularMovies = async () => {
				dispatch({ type: "FETCH_DATA" });
				try {
					const result = await axios(`https://api.themoviedb.org/3/movie/popular?api_key=${API_Key}&language=en-US&page=1`);
					dispatch({
						type: ACTION.FETCH_DATA_POPULAR_SUCCESS,
						value: result.data.results,
					});
				} catch (error) {
					dispatch({ type: "FETCH_FAILURE" });
				}
			};
			fetchPopularMovies();
		};

	}, [state.submittedMovieTitle, state.popular, state.selectValueState]);

	return (
		<div className="App">


			<div className="container-fluid h-100">
				<div className="row h-100">
					<div id="menu-column" className="sticky-top col-12 col-md-2 bg-dark-light">
						<nav className="navbar navbar-expand navbar-dark bg-transparent flex-md-column flex-row align-items-start">
							<div className="collapse navbar-collapse">
								<ul className="flex-md-column flex-row navbar-nav w-100 justify-content-between">
									<div className="mb-5">
										<img className="mx-auto" src={Logo} alt="Logo" width="100"/>
									</div>
									<div className="">
										<button type="button" className="btn btn-block btn-light" onClick={handleGetPopular}>Popular</button>
									</div>
									<div className="">
										<GenreSelect key={GenreSelect.id} genres={state.genres} data={state}/>
									</div>
									{/* {state.isLoading ? (
										<CircularProgress/>
										) : state.isError ? (
										<p className="text-danger">Data failed to load</p>
										) : (
										<MainMenuItem key={MainMenuItem.id} genres={state.genres}/>
									)} */}
									<form onSubmit={onSubmit}>
										<div className="input-group w-100">
											<input type="text" className="form-control" placeholder="Search" value={state.typedInMovieTitle} onChange={onChange}/>
										</div>
									</form>            
								</ul>
							</div>
						</nav>
					</div>
					<main className="col p-5">

						{state.isLoading ? (
							<CircularProgress/>
							) : state.isError ? (
							<p className="text-danger">Data failed to load</p>
							) : (
							<MoviesList movies={state.movies} data={state}/>
						)}

						
					</main>
				</div>
			</div>
		</div>
  	);
}

export default App;
