import './App.scss';
import Home from './pages/Home';
import Game from './pages/Game';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Daily from './pages/Daily';
import HeaderWrapper from './components/HeaderWrapper';
import Login from './pages/Login';
import Tutorial from './pages/Tutorial';
import Profile from './pages/Profile';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <HeaderWrapper />
        <div className="routesContainer">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="game" element={<Game />} />
            <Route path="tutorial" element={<Tutorial />} />
            <Route path="daily" element={<Daily />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </div>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
