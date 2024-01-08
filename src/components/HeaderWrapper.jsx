import { useLocation } from 'react-router-dom';
import Header from './Header';

function HeaderWrapper() {
  const location = useLocation();
  return (
    (location.pathname !== '/' && location.pathname !== "/login") && <Header />
  );
}

export default HeaderWrapper;
