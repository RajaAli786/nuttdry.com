import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux";
import { store } from "./redux/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/css/style.scss';
import './assets/css/navbar.scss';
import './assets/css/slider.scss';
import "./assets/css/marquee.scss";
import './assets/css/banner.scss'; 
import './assets/css/testimonials.scss'; 
import './assets/css/footer.scss';
import { HelmetProvider } from "react-helmet-async";






createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </StrictMode>,
)
