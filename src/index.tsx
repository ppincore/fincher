import * as React from 'react';
import App from '@app/App';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from '@app/providers/ErrorBoundary';
import 'app/styles/index.scss';
import 'shared/config/i18n/i18n';
import { DevtoolsProvider } from '@app/providers/DevtoolsProvider';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from '@app/providers/StoreProvider';
import { ThemeProvider } from '@app/providers/ThemeProvider';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Контейнер root не найден');
}
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <ErrorBoundary>
          <DevtoolsProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </DevtoolsProvider>
        </ErrorBoundary>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
