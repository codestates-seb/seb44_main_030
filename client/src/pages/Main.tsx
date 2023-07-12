import styled from 'styled-components';
import Splashzone from '../../public/Splashzone.png';
import dummy from '../../public/dummy.png';
import { motion } from 'framer-motion';

const Main = () => {
    return (
        <motion.div style={{ width: '100%' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <StyledMain>
                <StyledContent>물위에서의 재미와 도전 그리고 열정을 공유하는</StyledContent>
                <StyledImg src={Splashzone}></StyledImg>
            </StyledMain>
            <div style={{ marginTop: '10px;' }}>
                인기있는모임
                <Clubform>
                    <Clubcomponent></Clubcomponent>
                </Clubform>
            </div>
        </motion.div>
    );
};

export default Main;

const Clubcomponent = () => {
    return (
        <StyledClub initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <img src={dummy}></img>
            <div style={{ borderBottom: '1px solid black' }}>같이 수영하실분 찾아요!</div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <Styledtag>지역</Styledtag>
                <Styledtag>수영</Styledtag>
            </div>
            <div>👁‍🗨129 🤍 15 💬 4</div>
        </StyledClub>
    );
};

const StyledMain = styled.div`
    background-image: url('../../public/image 2.png');
    background-size: cover;
    box-shadow: 5px 2px 2px 2px;

    display: grid;
    height: 100vh;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    font-family: 'Anybody';
    font-size: 4.5rem;
    color: white;
    text-shadow: 1px 1px 1px #000;
`;

const StyledContent = styled.div`
    grid-column: 3 / 8;
    margin-top: 250px;
`;

const StyledImg = styled.img`
    margin-top: 250px;
`;

const Clubform = styled.div`
    width: 100%;
    height: 400px;
    border: 1px solid black;
    border-radius: 15px;
    padding: 40px;
    box-sizing: border-box;
`;

const StyledClub = styled.div`
    width: 293px;
    height: 287px;
    border-radius: 15px;
    border: 1px solid black;
    padding: 10px;
`;

const Styledtag = styled.div`
    width: 38px;
    height: 23px;
    border-radius: 10px;
    font-size: 1rem;
    color: white;
    background-color: rgba(56, 132, 213, 1);
    margin-top: 10px;
`;
