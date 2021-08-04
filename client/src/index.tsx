import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const render = () =>
	ReactDOM.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
		document.getElementById('root')
	);

const w: any = window;

if (w.cordova) {
	document.addEventListener('deviceready', () => render(), false);
} else {
	render();
}

serviceWorkerRegistration.unregister();

reportWebVitals();
