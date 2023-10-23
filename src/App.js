import './App.scss';
import Home from './pages/Home';
import Game from './pages/Game';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="game" element={<Game />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
