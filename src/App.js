import React from 'react'
import { useEffect, useReducer } from 'react'
import axios from 'axios'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import CircularProgress from '@material-ui/core/CircularProgress'
import Logo from './assets/popcorn.svg'
import MoviesList from './components/MoviesList'
import './App.css';

function App() {

	const initialState = {
		typedInMovieTitle: "",
		submittedMovieTitle: "",
		movies: [],
		isLoading: false,
		isError: false,
		genres: []
  	}

	const ACTION = {
		TYPE_SEARCH: "TYPE_SEARCH",
		SUBMIT_SEARCH: "SUBMIT_SEARCH",
		FETCH_DATA: "FETCH_DATA",
		FETCH_DATA_SUCCESS: "FETCH_DATA_SUCCESS",
		FETCH_DATA_FAIL: "FETCH_DATA_FAIL",
		FETCH_DATA_GENRES_SUCCESS: "ACTION.FETCH_DATA_GENRES_SUCCESS",
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
				}
			case ACTION.FETCH_DATA:
				return {
					...state,
					isLoading: true,
				};
			case ACTION.FETCH_DATA_SUCCESS:
				return {
					...state,
					movies: action.value,
					isLoading: false,
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
			default:
				return state;
		}
	}

	const [state, dispatch] = useReducer(reducer, initialState);
	  
	const API_Key = "3047ca0f5fac291860193498b5d24f44";
	useEffect(() => {
		if (state.submittedMovieTitle) {
			const fetchData = async () => {
				dispatch({ type: "FETCH_DATA" });
				try {
					const result = await axios(`https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&query=${state.submittedMovieTitle}`);
					console.log(result.data.results);
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
			console.log(result.data.genres);
			dispatch({
				type: ACTION.FETCH_DATA_GENRES_SUCCESS,
				value: result.data.genres,
			});
			} catch (error) {
			dispatch({ type: "FETCH_FAILURE" });
			}
		};
		fetchDataGenres();

	}, [state.submittedMovieTitle]);

	
	// useEffect(() => {
	// 	const fetchDataGenre = async () => {
	// 		try {
	// 			const genresObj = await axios(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_Key}&language=en-US`);
	// 			console.log(state.genre);
	// 			dispatch({
	// 				type: ACTION.FETCH_DATA_GENRE_SUCCESS,
	// 				value: genresObj.data.genres,
	// 			});
	// 		} catch (error) {
	// 			dispatch({ type: "FETCH_FAILURE" });
	// 		}
	// 	};
	// 	fetchDataGenre();
	// }, []);


	return (
		<div className="App">


			<div className="container-fluid h-100">
			<div className="row h-100">
				<div id="menu-column" className="sticky-top col-12 col-md-2 bg-dark-light">
					<nav className="navbar navbar-expand navbar-dark bg-transparent flex-md-column flex-row align-items-start">
						<div className="collapse navbar-collapse">
							<ul className="flex-md-column flex-row navbar-nav w-100 justify-content-between">
								<div className="">
									<img className="mx-auto" src={Logo} alt="Logo" width="100"/>
								</div>
								<li className="nav-item">
									<a className="nav-link pl-0" href="#">Menu 1</a>
								</li>
								<form onSubmit={onSubmit}>
									<div className="input-group w-100">
										<input type="text" className="form-control" placeholder="Search" onChange={onChange}/>
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









			{/* <h1 className="display-3">Movies Seeker</h1>
			<form onSubmit={onSubmit}>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="inputGroup-sizing-default">Default</span>
					</div>
					<input type="text" className="form-control" placeholder="Search" onChange={onChange}/>
				</div>
			</form>

			{state.isLoading ? (
				<CircularProgress/>
				) : state.isError ? (
				<p className="text-danger">Data failed to load</p>
				) : (
				<MoviesList movies={state.movies}/>
			)} */}

		</div>
  	);
}

export default App;
