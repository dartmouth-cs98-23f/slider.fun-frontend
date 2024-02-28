import { useLocation } from 'react-router-dom';
import Header from './Header';

function HeaderWrapper() {
  const location = useLocation();
  return (
    location.pathname !== '/' && <Header />
  );
}

export default HeaderWrapper;
