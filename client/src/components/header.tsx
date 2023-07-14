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
        <div style={{ position: 'fixed', zIndex: '999' }}>
            <StyledHeader>
                <StyledImg
                    src={LOGO}
                    alt="logo"
                    onClick={() => {
                        navigate('/');
                    }}
                />

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
                    <div style={{ position: 'relative', top: '-17px' }}>
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
            </StyledHeader>
        </div>
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
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    width: 100vw;
    height: 0px;
    font-size: 1.5rem;
    height: 80px;
    color: white;
    background-color: rgba(56, 132, 213, 1);
    div {
        padding-top: 15px;
    }

    :nth-child(2) {
        font-family: 'Monomaniac One', sans-serif;
        grid-column: 9 / 10;
        cursor: pointer;
    }
    :nth-child(2):hover {
        color: rgba(105, 105, 105, 1);
    }

    :nth-child(3) {
        font-family: 'Monomaniac One', sans-serif;
        cursor: pointer;
    }
    :nth-child(3):hover {
        color: rgba(105, 105, 105, 1);
    }

    :nth-child(4) {
        font-family: 'Monomaniac One', sans-serif;
        cursor: pointer;
    }

    :nth-child(4):hover {
        color: rgba(105, 105, 105, 1);
    }
`;

const StyledImg = styled.img`
    grid-column: 3 / 4;
    cursor: pointer;
    height: 70px;
`;

const StyledModal = styled.div`
    font-size: 1rem;
    position: absolute;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    left: -140px;
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: white;
    font-family: 'Monomaniac One', sans-serif;
    :nth-child(1) {
        color: black;
        margin-top: 5px;
        margin-left: 10px;
    }
    :nth-child(2) {
        color: black;
        margin-top: 8px;
        margin-left: 10px;
    }
    :nth-child(2):hover {
        color: black;
    }

    z-index: 99;
`;
