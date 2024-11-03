import { createRoot } from 'react-dom/client'
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';

import App from '../src/components/App';
import { store } from './app/store';

import { ToggleColorMode } from './context/ToggleColorMode';

import 'bear-react-carousel/dist/index.css';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ToggleColorMode>
            <CssBaseline />
            <App />
        </ToggleColorMode>
    </Provider>
);
