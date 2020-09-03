import React, {useEffect,useReducer} from 'react'
import './App.css';

function App() {

	const initialState = {
		typedInMovieTitle: "",
		submittedMovieTitle: "",
		movies: [],
		isLoading: false,
		isError: false,
  	}
	  
	const [state, dispatch] = useReducer(reducer, initialState);

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
			default:
				return state;
		}
	}
	  
	const API_Key = "3047ca0f5fac291860193498b5d24f44";
	useEffect(() => {
		if (state.submittedMovieTitle) {
		  const fetchData = async () => {
			dispatch({ type: "FETCH_DATA" });
			try {
			  const result = await axios(
				`https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&query=${state.submittedMovieTitle}`
			  );
	
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
			<h1 class="display-3">Movies Seeker</h1>
			<form onSubmit={onSubmit}>
				<div class="input-group mb-3">
					<div class="input-group-prepend">
						<span class="input-group-text" id="inputGroup-sizing-default">Default</span>
					</div>
					<input type="text" class="form-control" aria-label="" aria-describedby="" onChange={onChange}/>
				</div>
			</form>
		</div>
  	);
}

export default App;
