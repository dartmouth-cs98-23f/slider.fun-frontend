import './App.scss';
import Home from './pages/Home';
import Game from './pages/Game';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StageOne from './pages/StageOne';
import Stage2 from './pages/Stage2';
import Stage3 from './pages/Stage3';
import Stage4 from './pages/Stage4';
import Stage5 from './pages/Stage5';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="game" element={<Game />} />
          <Route path="stage1" element={<StageOne />} />
          <Route path="stage2" element={<Stage2 />} />
          <Route path="stage3" element={<Stage3 />} />
          <Route path="stage4" element={<Stage4 />} />
          <Route path="stage5" element={<Stage5 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
