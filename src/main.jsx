import { createRoot } from 'react-dom/client'
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';

import App from '../src/components/App';
import { store } from './app/store';

import 'bear-react-carousel/dist/index.css';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <CssBaseline />
        <App />
    </Provider>
);
