import styled from 'styled-components';
import LOGO from '../../public/LOGO2.png';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import ProfileImage from './style/ProfileImage';
import { useDispatch } from 'react-redux';
import { reset } from '../store/scroll.ts';
//토큰 받아오면 logout delet 토큰 처리해줘야됨.
//Login 버튼 클릭시 로그인 page로 라우팅처리해주기

interface Props {
    setIsLogIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = () => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();
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
                        dispatch(reset());
                        navigate('/community/전체/null');
                    }}
                >
                    Community
                </div>

                <div
                    onClick={() => {
                        dispatch(reset());
                        navigate('/club/전체/null');
                    }}
                >
                    Grouping
                </div>
                {isLogin === false ? (
                    <div onClick={() => setIsLogIn(true)}>Login</div>
                ) : (
                    <div style={{ position: 'relative' }}>
                        <div style={{ width: '70px', height: '65px' }}>
                            <ProfileImage
                                width="100%"
                                height="100%"
                                url="../../public/ob4.png"
                                onClick={() => {
                                    setMenu(!menu);
                                }}
                            />
                        </div>
                        {menu ? <Modal ref={modalRef} setIsLogIn={setIsLogIn} setMenu={setMenu}></Modal> : null}
                    </div>
                )}
            </div>
        </StyledHeader>
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
    position: fixed;
    width: 100%;
    min-width: 817px;
    height: 85px;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: white;
    font-family: 'Monomaniac One', sans-serif;
    background-color: rgba(56, 132, 213, 1);
    box-sizing: border-box;
    justify-content: space-evenly;
    z-index: 999;
    img {
        height: 70px;
        &:hover {
            cursor: pointer;
        }
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
