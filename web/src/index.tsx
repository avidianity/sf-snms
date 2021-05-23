import './shims';
import './boot';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Views/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import './Styles/global.css';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorkerRegistration.unregister();

reportWebVitals();
