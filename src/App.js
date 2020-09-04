import React from 'react'
import { useEffect, useReducer } from 'react'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import MoviesList from './components/MoviesList'
import './App.css';

function App() {

	const initialState = {
		typedInMovieTitle: "",
		submittedMovieTitle: "",
		movies: [],
		isLoading: false,
		isError: false,
  	}

	const ACTION = {
		TYPE_SEARCH: "TYPE_SEARCH",
		SUBMIT_SEARCH: "SUBMIT_SEARCH",
		FETCH_DATA: "FETCH_DATA",
		FETCH_DATA_SUCCESS: "FETCH_DATA_SUCCESS",
		FETCH_DATA_FAIL: "FETCH_DATA_FAIL",
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
					isLoading: true
				};
			case ACTION.FETCH_DATA_SUCCESS:
				return {
					...state,
					movies: action.value,
					isLoading: false
				};
			case ACTION.FETCH_DATA_FAIL:
				return {
					...state,
					isError: true
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
			  const result = await axios(
				`https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&query=${state.submittedMovieTitle}`
			  );
			  console.log(result);
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
	}, [state.submittedMovieTitle]);


	return (
		<div className="App">





			<div class="container-fluid h-100">
			<div class="row h-100">
				<aside class="col-12 col-md-3 p-0 bg-dark">
					<nav class="navbar navbar-expand navbar-dark bg-dark flex-md-column flex-row align-items-start">
						<div class="collapse navbar-collapse">
						<ul class="flex-md-column flex-row navbar-nav w-100 justify-content-between">
							<span className="display-5">Movies Seeker</span>
							<li class="nav-item">
							<a class="nav-link pl-0" href="#">Menu 1</a>
							</li>
							<form onSubmit={onSubmit}>
								<div className="input-group w-100">
									<input type="text" className="form-control" placeholder="Search" onChange={onChange}/>
								</div>
							</form>            
						</ul>
						</div>
					</nav>
				</aside>
				<main class="col">
					<h1 className="display-3">Movies Seeker</h1>

					{state.isLoading ? (
						<CircularProgress/>
						) : state.isError ? (
						<p className="text-danger">Data failed to load</p>
						) : (
						<MoviesList movies={state.movies}/>
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
