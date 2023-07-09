import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import LoginBG from '../../public/login.png';
import LogoIcon from '../../public/onlyLOGO.png';
import Logo from '../../public/SplashZoneWhite.png';
import Email from '../../public/e-mail Address.png';
import Password from '../../public/Password.png';

import RegisterForm from '../components/RegisterForm';

interface FormInput {
    email: string;
    password: string;
}

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInput>();

    const onSubmit = (data: FormInput) => {
        console.log('formState', data);
    };

    const navigate = useNavigate();

    return (
        <StyledCover>
            <StyledBackgroundImg>
                <StyledLoginBox>
                    <StyledLogoWarp>
                        <StyledLogoIcon src={LogoIcon} alt="Logo Icon" />
                        <StyledLogo src={Logo} alt="Logo" />
                    </StyledLogoWarp>
                    <StyledForm onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email">
                                <img src={Email} />
                            </label>
                        </div>
                        <StyledInput
                            id="email"
                            type="email"
                            placeholder="enter your e-mail address"
                            {...register('email', { required: '이메일을 입력해주세요!' })}
                        />

                        <div>
                            <label htmlFor="password">
                                <img src={Password} />
                            </label>
                        </div>
                        <StyledInput
                            id="password"
                            type="password"
                            placeholder="enter your password"
                            {...register('password', {
                                required: '비밀번호를 입력해주세요!',
                                minLength: { value: 8, message: '비밀번호는 8자 이상이어야 합니다!' },
                                maxLength: { value: 40, message: '비밀번호는 40자 이하이어야 합니다!' },
                            })}
                        />
                        <StyledButton type="submit">Log in</StyledButton>
                    </StyledForm>
                    <div>
                        <SmallButton type="small">Forget ID / password</SmallButton>
                        <SmallButton onClick={() => navigate(`/signup`)}>Sign up</SmallButton>
                    </div>
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
    background: linear-gradient(to right, rgba(181, 242, 255, 0.85), rgba(112, 178, 255, 0.85));
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50px;
    height: 60vh;
    width: 60vw;
    max-height: 630px;
    max-width: 520px;
    box-shadow: 10px 10px 33px 0px rgba(255, 255, 255, 0.62);
    -webkit-box-shadow: 10px 10px 33px 0px rgba(255, 255, 255, 0.62);
    -moz-box-shadow: 10px 10px 33px 0px rgba(255, 255, 255, 0.62);
    > div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @media screen and (max-width: 768px) {
        width: 90vw;
        height: 90vh;
    }
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

    > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 431px;
        margin-top: 30px;
    }
`;
const StyledInput = styled.input`
    font-family: 'Baloo Chettan 2', cursive;
    font-size: 1.5rem;
    width: 420px;
    height: 60px;
    border-radius: 20px;
    border: none;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    outline: none;
    padding-left: 20px;
    &::placeholder {
        opacity: 0.5;
    }
`;
const StyledButton = styled.button`
    background-color: #add7ff;
    margin-top: 30px;
    font-size: 1.5rem;
    text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
    color: white;
    border: none;
    font-family: 'Baloo Chettan 2', cursive;
    width: 440px;
    height: 60px;
    border-radius: 20px;
    cursor: pointer;
    &:hover {
        background-color: #c0e0ff;
    }
    &:active {
        filter: brightness(90%);
    }
`;

const SmallButton = styled(StyledButton)<{ type?: string }>`
    font-size: ${(props) => (props.type === 'small' ? '1.1rem' : '1.5rem')};
    width: 210px;
    margin: 10px;
`;
