import styled from 'styled-components';
import LOGO from '../../public/LOGO.png';
import profile from '../../public/profile.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface Props {
    setIsLogIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogIn] = useState<boolean>(false);
    const [menu, setMenu] = useState(false);
    return (
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
                    navigate('/community');
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
                    <StyledProfile
                        src={profile}
                        onClick={() => {
                            setMenu(!menu);
                        }}
                    ></StyledProfile>
                    {menu ? <Modal setIsLogIn={setIsLogIn}></Modal> : null}
                </div>
            )}
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
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    padding: 20px;
    height: 50px;
    width: 100vw;
    position: fixed;
    font-size: 1.5rem;
    color: rgba(105, 105, 105, 1);
    div {
        padding-top: 2px;
    }

    :nth-child(2) {
        font-family: 'Monomaniac One', sans-serif;
        grid-column: 9 / 10;
        cursor: pointer;
    }
    :nth-child(2):hover {
        color: rgba(105, 105, 105, 0.5);
    }

    :nth-child(3) {
        font-family: 'Monomaniac One', sans-serif;
        cursor: pointer;
    }
    :nth-child(3):hover {
        color: rgba(105, 105, 105, 0.5);
    }
`;

const StyledImg = styled.img`
    width: 224.5px;
    height: 60.8px;
    grid-column: 3 / 4;
    margin-top: -3px;
    cursor: pointer;
`;

const StyledProfile = styled.img`
    margin-top: -10px;
    cursor: pointer;
`;

const StyledModal = styled.div`
    font-size: 1rem;
    position: absolute;
    border: 1px solid rgba(105, 105, 105, 0.5);
    left: -130px;
    width: 100%;
    height: 100%;
    padding: 10px;
    :nth-child(1) {
        color: black;
    }
    :nth-child(2) {
        color: black;
        margin-top: 10px;
    }
    :nth-child(2):hover {
        color: black;
        margin-top: 10px;
    }

    z-index: 99;
`;
