import './App.scss';
//import Home from './pages/Home';
import Game from './pages/Game';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Daily from './pages/Daily';
//import HeaderWrapper from './components/HeaderWrapper';
import Tutorial from './pages/Tutorial';
import ResultsPage from './components/ResultsPage';
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
      {/* <HeaderWrapper /> */}
      <Routes classname="routesContainer">
        <Route path="/" element={<Home />} />
        <Route path="game" element={<Game />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/resultspage" element={<ResultsPage scores={[87,94,97,95,91,93, 96]} />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
