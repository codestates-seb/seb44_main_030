import { useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Footer from './components/Footer';
import Globalstyle from './GlobalStyle';
import AnimateRoute from './components/common/AnimateRoute';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import Toast from './components/common/ToastUI/toast';

function App() {
    const location = useLocation();
    const hideHeaderFooter = location.pathname === `/signup` || location.pathname === `/login`;
    const queryClient = new QueryClient();
    const toast = useSelector((state: RootState) => state.toast.toastInstance);

    return (
        <CookiesProvider>
            <QueryClientProvider client={queryClient}>
                <div>
                    <Globalstyle />
                    {toast === true && <Toast />}
                    {!hideHeaderFooter && <Header></Header>}
                    {!hideHeaderFooter && <div style={{ paddingTop: '85px' }}></div>}
                    <AnimateRoute />

                    {!hideHeaderFooter && <Footer></Footer>}
                </div>
            </QueryClientProvider>
        </CookiesProvider>
    );
}

export default App;
