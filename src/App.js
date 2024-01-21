import './App.scss';
import Home from './pages/Home';
import Game from './pages/Game';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Daily from './pages/Daily';
import HeaderWrapper from './components/HeaderWrapper';
import Login from './pages/Login';
import Tutorial from './pages/Tutorial';

function App() {
  return (
    <BrowserRouter>
      <HeaderWrapper />
      <Routes classname="routesContainer">
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="game" element={<Game />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/login" element={< Login />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
