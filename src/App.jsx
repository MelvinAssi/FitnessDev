import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes.jsx';
import Header from './components/Header.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <main style={{ paddingTop: '124px' }}>
          <AppRoutes />
        </main>        
      </BrowserRouter>
    </div>
  );
}

export default App;
