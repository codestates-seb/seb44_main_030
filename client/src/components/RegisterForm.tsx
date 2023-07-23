import { ReactNode, FormEventHandler } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import LogoIcon from '../../public/onlyLOGO.png';
import Logo from '../../public/SplashZoneWhite.png';

interface RegisterFormProps {
    children: ReactNode;
    onSubmit: FormEventHandler;
    className?: string;
}

const RegisterForm = ({ children, onSubmit, className }: RegisterFormProps) => {
    const navigate = useNavigate();

    //폼 상단 로고, 글자 클릭 시 홈으로 이동
    const handleNavigate = () => {
        navigate('/');
    };
    return (
        <SignupForm className={className} onSubmit={onSubmit}>
            <section onClick={handleNavigate}>
                <StyledLogoWarp>
                    <StyledLogoIcon src={LogoIcon} alt="Logo Icon" />
                    <StyledLogo src={Logo} alt="Logo" />
                </StyledLogoWarp>
            </section>
            {children}
        </SignupForm>
    );
};

export default RegisterForm;

const SignupForm = styled.form`
    background: linear-gradient(90deg, #b5f2ff 0%, rgba(154, 217, 255, 0.93) 50%, rgba(112, 178, 255, 0.81) 100%);
    box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.15);
    width: 550px;
    height: 650px;
    border-radius: 50px;
    border: 2px solid rgba(123, 123, 123, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    color: #ffffff;

    > section {
        height: 70px;
        font-size: 55px;
        font-weight: 600;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        &:hover {
            cursor: pointer;
        }
        > h2 {
            margin: 0 0 0 15px;
            font-size: 55px;
        }

        > img {
            width: 90px;
            height: 55px;
        }
    }
`;
const StyledLogoWarp = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const StyledLogoIcon = styled.img`
    margin-right: 10px;
    padding-bottom: 10px;
`;
const StyledLogo = styled.img``;
