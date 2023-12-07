import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './app';
import Store from "./store";
import {StoreContext} from "./store/context";
import {I18nProvider} from "./context/i18ncontext";


const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <I18nProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </I18nProvider>
  </StoreContext.Provider>
);
