import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

if (process.env.NODE_ENV !== 'production' || window.prompt('Password:') === atob('cm9vdHM=')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
