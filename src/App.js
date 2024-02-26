import './App.scss';
//import Home from './pages/Home';
import Game from './pages/Game';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Daily from './pages/Daily';
import HeaderWrapper from './components/HeaderWrapper';
import Tutorial from './pages/Tutorial';
import ResultsPage from './components/ResultsPage';
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
      <HeaderWrapper />
      <Routes classname="routesContainer">
        <Route path="/" element={<Home />} />
        <Route path="game" element={<Game />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/resultspage" element={<ResultsPage scores={{
          "brightness": 87, 
          "contrast": 94, 
          "saturation": 97, 
          "grayscale": 95,
          "sepia": 91, 
          "hue rotate": 93, 
          "blur": 96
        }} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
