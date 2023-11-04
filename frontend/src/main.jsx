import ReactDOM from 'react-dom';
import App from './App'; // Remplacez './App' par le chemin de votre composant principal

const root = document.getElementById('root');
const rootInstance = ReactDOM.createRoot(root);
rootInstance.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
