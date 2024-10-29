import { createRoot } from 'react-dom/client'
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';

import App from '../src/components/App';
import { store } from './app/store';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <CssBaseline />
        <App />
    </Provider>
);
