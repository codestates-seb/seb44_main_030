import { Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import Header from './components/header';
import Globalstyle from './GlobalStyle';
import './App.css';

const Main = loadable(() => import('./pages/Main'));
const Signup = loadable(() => import('./pages/Signup'));
const Login = loadable(() => import('./pages/Login'));
const Community = loadable(() => import('./pages/Community'));
const Club = loadable(() => import('./pages/Club'));
const Mypage = loadable(() => import('./pages/Mypage'));

function App() {
    return (
        <>
            <Globalstyle />
            <Header></Header>
            <Routes>
                <Route path="/" element={<Main></Main>}></Route>
                <Route path="/signup" element={<Signup></Signup>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/community" element={<Community></Community>}></Route>
                <Route path="/club" element={<Club></Club>}></Route>
                <Route path="/mypage" element={<Mypage></Mypage>}></Route>
            </Routes>
        </>
    );
}

export default App;
