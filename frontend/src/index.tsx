import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import ThemeManager from "./ThemeManager/ThemeManager";

const reactRoot = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

reactRoot.render(
    <React.StrictMode>
        <ThemeManager/>
    </React.StrictMode>
);