import { createRoot } from 'react-dom/client'

import App from '../src/components/App'
import { CssBaseline } from '@mui/material';

createRoot(document.getElementById('root')).render(
    <>
        <CssBaseline />
        <App />
    </>
);
