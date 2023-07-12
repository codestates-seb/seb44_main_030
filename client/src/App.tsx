import { useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Footer from './components/Footer';
import Globalstyle from './GlobalStyle';
import AnimateRoute from './components/common/AnimateRoute';

function App() {
    const location = useLocation();
    const hideHeaderFooter = location.pathname === `/signup` || location.pathname === `/login`;

    return (
        <div>
            <Globalstyle />
            {!hideHeaderFooter && <Header></Header>}
            {!hideHeaderFooter && <div style={{ paddingTop: '85px' }}></div>}
            <AnimateRoute />
            {!hideHeaderFooter && <Footer></Footer>}
        </div>
    );
}

export default App;
