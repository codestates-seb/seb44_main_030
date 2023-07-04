import LoginBG from '../../public/login.png';
import LogoIcon from '../../public/onlyLOGO.png';
import Logo from '../../public/SplashZoneWhite.png';
import Email from '../../public/e-mail Address.png';
import Password from '../../public/Password.png';
import EmailPlaceholder from '../../public/enter your e-mail address.png';

import styled from 'styled-components';
import { useForm } from 'react-hook-form';

interface FormInput {
    email: string;
    password: string;
}

const Login = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormInput>();

    return (
        <StyledCover>
            <StyledBackgroundImg>
                <StyledLoginBox>
                    <StyledLogoWarp>
                        <StyledLogoIcon src={LogoIcon} alt="Logo Icon" />
                        <StyledLogo src={Logo} alt="Logo" />
                    </StyledLogoWarp>
                    <StyledForm>
                        <label htmlFor="email">
                            <img src={Email} />
                        </label>
                        <StyledInput id="email" type="email" name="email" />
                        <label htmlFor="password">
                            <img src={Password} />
                        </label>
                        <StyledInput id="password" type="password" name="password" />
                        <StyledButton type="submit">Log in</StyledButton>
                    </StyledForm>
                </StyledLoginBox>
            </StyledBackgroundImg>
        </StyledCover>
    );
};

export default Login;

const StyledCover = styled.div`
    background-color: white;
    background-size: cover;
    height: 100vh;
    opacity: 0.9;
`;

const StyledBackgroundImg = styled.div`
    background-image: url(${LoginBG});
    background-size: cover;
    background-position: center 10%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledLoginBox = styled.div`
    background: linear-gradient(to right, rgba(181, 242, 255, 0.85), rgba(112, 178, 255, 0.85)); // gradient 투명도 적용
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50px;
    height: 60vh;
    width: 60vw;
    max-height: 630px;
    max-width: 520px;
    box-shadow: 10px 10px 33px 0px rgba(255, 255, 255, 0.62);
    -webkit-box-shadow: 10px 10px 33px 0px rgba(255, 255, 255, 0.62);
    -moz-box-shadow: 10px 10px 33px 0px rgba(255, 255, 255, 0.62);
`;

const StyledLogoWarp = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
`;
const StyledLogoIcon = styled.img`
    margin-right: 10px;
    padding-bottom: 10px;
`;
const StyledLogo = styled.img``;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const StyledInput = styled.input`
    font-size: 1.7em;
    width: 431px;
    height: 56px;
    border-radius: 20px;
`;
const StyledButton = styled.button`
    font-family: 'Baloo Chettan 2', cursive;
    width: 431px;
    height: 56px;
    border-radius: 20px;
`;
