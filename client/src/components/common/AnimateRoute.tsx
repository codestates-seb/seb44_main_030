import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import loadable from '@loadable/component';
import { AnimatePresence } from 'framer-motion';

const Main = loadable(() => import('../../pages/Main'));
const Signup = loadable(() => import('../../pages/Signup'));
const Login = loadable(() => import('../../pages/Login'));
const Community = loadable(() => import('../../pages/Community'));
const CommunityDetail = loadable(() => import('../../pages/CommunityDetail'));
const ClubDetail = loadable(() => import('../../pages/ClubDetail'));
const CommunityCreate = loadable(() => import('../../pages/ContentsCreate'));
const Club = loadable(() => import('../../pages/Club'));
const Mypage = loadable(() => import('../../pages/Mypage'));
const Map = loadable(() => import('../../pages/Map'));

export default function AnimateRoute() {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Main></Main>}></Route>
                <Route path="/signup" element={<Signup></Signup>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/community/:page/:tag/:keyword?" element={<Community></Community>}></Route>
                <Route path="/community/create" element={<CommunityCreate></CommunityCreate>}></Route>
                <Route path="/community/detail/:standardId" element={<CommunityDetail></CommunityDetail>}></Route>
                <Route path="/club/detail/:boardClubId" element={<ClubDetail></ClubDetail>}></Route>
                <Route path="/club/:tag/:keyword?" element={<Club></Club>}></Route>
                <Route path="/club/create" element={<CommunityCreate></CommunityCreate>}></Route>
                <Route path="/mypage" element={<Mypage></Mypage>}></Route>
                <Route path="/map" element={<Map />}></Route>
            </Routes>
        </AnimatePresence>
    );
}
