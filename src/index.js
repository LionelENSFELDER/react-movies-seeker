import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
//import $ from 'jquery';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

function menuBehavior(){
	const menuColumn = document.getElementById('menu-column');
	let screenWidth = window.screen.width;
	if(screenWidth <= 768){
		if(menuColumn.classList.contains('vh-100')){
			menuColumn.classList.remove('vh-100')
		}
		menuColumn.classList.add('h-100');
	}else if(screenWidth > 768){
		if(menuColumn.classList.contains('h-100')){
			menuColumn.classList.remove('h-100')
		}
		menuColumn.classList.add('vh-100');
	}
}

document.onreadystatechange = function () {
	if(document.readyState === "complete"){
		menuBehavior();
		window.addEventListener('resize', function(){
			menuBehavior();
		});
	}
};

ReactDOM.render(
	<React.StrictMode>
	<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
