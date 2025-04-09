import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes.jsx';
import Header from './components/Header.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
