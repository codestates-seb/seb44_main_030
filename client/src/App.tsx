import { Routes, Route, useLocation } from 'react-router-dom';
import loadable from '@loadable/component';
import Header from './components/header';
import Footer from './components/Footer';
import Globalstyle from './GlobalStyle';
import './App.css';
import ClubPost from './pages/ClubPost';
import { Loading } from './components/Lodaing';

const Main = loadable(() => import('./pages/Main'));
const Signup = loadable(() => import('./pages/Signup'));
const Login = loadable(() => import('./pages/Login'));
const Community = loadable(() => import('./pages/Community'));
const ContentsDetail = loadable(() => import('./pages/ContentsDetail'));
const CommunityCreate = loadable(() => import('./pages/ContentsCreate'));
const Club = loadable(() => import('./pages/Club'));
const Mypage = loadable(() => import('./pages/Mypage'));
const Map = loadable(() => import('./pages/Map'));

function App() {
    const location = useLocation();
    const hideHeaderFooter = location.pathname === `/signup` || location.pathname === `/login`;

    return (
        <div>
            <Globalstyle />
            {!hideHeaderFooter && <Header></Header>}
            {!hideHeaderFooter && <div style={{ paddingTop: '80px' }}></div>}
            <Routes>
                <Route path="/" element={<Main></Main>}></Route>
                <Route path="/signup" element={<Signup></Signup>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/community" element={<Community></Community>}></Route>
                <Route path="/community/create" element={<CommunityCreate></CommunityCreate>}></Route>
                <Route path="/community/detail/:id" element={<ContentsDetail></ContentsDetail>}></Route>
                <Route path="/club/detail/:id" element={<ContentsDetail></ContentsDetail>}></Route>
                <Route path="/club" element={<Club></Club>}></Route>
                <Route path="/club/create" element={<CommunityCreate></CommunityCreate>}></Route>
                <Route path="/mypage" element={<Mypage></Mypage>}></Route>
                <Route path="/map" element={<Map />}></Route>
                <Route path="/test" element={<Loading></Loading>} />
            </Routes>
            {!hideHeaderFooter && <Footer></Footer>}
        </div>
    );
}

export default App;
