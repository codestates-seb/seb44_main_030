import styled from 'styled-components';
import LOGO from '../../public/LOGO2.png';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import ProfileImage from './style/ProfileImage';

//토큰 받아오면 logout delet 토큰 처리해줘야됨.
//Login 버튼 클릭시 로그인 page로 라우팅처리해주기

interface Props {
    setIsLogIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = () => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    const handleOutsideClick = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick, true);
        return () => {
            document.removeEventListener('click', handleOutsideClick, true);
        };
    }, []);

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
                    <div style={{ position: 'relative', top: '-5px' }}>
                        <ProfileImage
                            width="70px"
                            height="65px"
                            url="../../public/profile.png"
                            onClick={() => {
                                setMenu(!menu);
                            }}
                        />
                        {menu ? <Modal ref={modalRef} setIsLogIn={setIsLogIn} setMenu={setMenu}></Modal> : null}
                    </div>
                )}
            </StyledHeader>
        </div>
    );
};

export default Header;

interface ModalProps extends Props {
    setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(({ setIsLogIn, setMenu }: ModalProps, ref) => {
    const navigate = useNavigate();
    return (
        <StyledModal ref={ref}>
            <div
                onClick={() => {
                    navigate('/mypage');
                    setMenu(false);
                }}
            >
                마이페이지
            </div>
            <div
                onClick={() => {
                    setIsLogIn(false);
                    setMenu(false);
                }}
            >
                로그아웃
            </div>
        </StyledModal>
    );
});

const StyledHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: 80px;
    align-items: center;
    justify-content: end;
    width: 100vw;
    font-size: 1.5rem;
    height: 85px;
    color: white;
    background-color: rgba(56, 132, 213, 1);
    div {
        padding-top: 0px;
    }

    :nth-child(2) {
        font-family: 'Monomaniac One', sans-serif;
        grid-column: 8 / 9;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: absolute;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    left: -95px;
    bottom: -77px;
    width: 130px;
    height: 130%;
    padding: 6px;
    background-color: white;
    font-weight: bold;
    color: #696969;
    font-family: 'Monomaniac One', sans-serif;
    box-shadow: 10px 6px 76px 2px rgba(44, 151, 255, 0.21);
    -webkit-box-shadow: 10px 6px 76px 2px rgba(44, 151, 255, 0.21);
    -moz-box-shadow: 10px 6px 76px 2px rgba(44, 151, 255, 0.21);
    :nth-child(1) {
        margin-top: 5px;
    }
    :nth-child(2) {
        margin-top: 10px;
    }
    :nth-child(2):hover {
        color: black;
    }
    :nth-child(1):hover {
        color: black;
    }

    z-index: 99;
`;
