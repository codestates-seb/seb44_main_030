import styled from 'styled-components';
import LOGO from '../../public/LOGO2.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProfileImage from './style/ProfileImage';

//토큰 받아오면 logout delet 토큰 처리해줘야됨.
//Login 버튼 클릭시 로그인 page로 라우팅처리해주기

interface Props {
    setIsLogIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogIn] = useState<boolean>(false);
    const [menu, setMenu] = useState(false);
    return (
        <StyledHeader>
            <img
                src={LOGO}
                alt="logo"
                onClick={() => {
                    navigate('/');
                }}
            />

            <div className="header-content">
                <div
                    onClick={() => {
                        navigate('/community/1');
                    }}
                >
                    Community
                </div>

                <div
                    onClick={() => {
                        navigate('/club');
                    }}
                >
                    Grouping
                </div>
                {isLogin === false ? (
                    <div onClick={() => setIsLogIn(true)}>Login</div>
                ) : (
                    <div style={{ position: 'relative' }}>
                        <ProfileImage
                            width="70px"
                            height="65px"
                            url="../../public/profile.png"
                            onClick={() => {
                                setMenu(!menu);
                            }}
                        />
                        {menu ? <Modal setIsLogIn={setIsLogIn}></Modal> : null}
                    </div>
                )}
            </div>
        </StyledHeader>
    );
};

export default Header;

const Modal = ({ setIsLogIn }: Props) => {
    const navigate = useNavigate();
    return (
        <StyledModal>
            <div
                onClick={() => {
                    navigate('/mypage');
                }}
            >
                마이페이지
            </div>
            <div
                onClick={() => {
                    setIsLogIn(false);
                }}
            >
                로그아웃
            </div>
        </StyledModal>
    );
};

const StyledHeader = styled.div`
    position: fixed;
    width: 100%;
    min-width: 817px;
    height: 85px;
    display: flex;
    font-size: 1.5rem;
    color: white;
    font-family: 'Monomaniac One', sans-serif;
    background-color: rgba(56, 132, 213, 1);
    box-sizing: border-box;
    justify-content: space-evenly;
    z-index: 999;
    img {
        height: 85px;
    }
    .header-content {
        display: flex;
        align-items: center;
        gap: 20px;
    }
    .header-content div:hover {
        color: rgba(105, 105, 105, 1);
        cursor: pointer;
    }
`;

const StyledModal = styled.div`
    position: absolute;
    top: 85px;
    width: 105px;
    border-radius: 10px;
    height: 70px;
    padding: 10px;
    font-family: 'Monomaniac One', sans-serif;
    background-color: rgba(255, 255, 255, 0.8);
    color: black;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border: 1px solid rgba(0, 0, 0, 0.5);
    cursor: none;
    div {
        color: black;
        cursor: pointer;
    }
    div:hover {
        color: rgba(105, 105, 105, 1);
    }
`;
