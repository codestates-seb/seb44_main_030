import styled, { keyframes } from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import BACK1 from '../../public/ob3.png';
import BACK2 from '../../public/ob4.png';
import RegisterForm from '../components/RegisterForm';

interface FormInput {
    email: string;
    username: string;
    password: string;
}

const Login = () => {
    const [cookies, setCookie] = useCookies(['AuthorizationToken', 'RefreshToken']);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInput>();

    const onSubmit = async (data: FormInput) => {
        const API_URL = import.meta.env.VITE_KEY;
        console.log(data);

        try {
            const response = await axios.post(`${API_URL}/auth/login`, data, {
                withCredentials: true,
            });

            // const memberid = response.headers.get('MemberId');
            console.log(response,'asdfsadfsadfasdfasdfasdf'); //멤버id가 들어와야함
            const Authorization = response.headers.authorization;
            const Refresh = response.headers.refresh;

            if (Authorization && Refresh) {
                setCookie('AuthorizationToken', Authorization, { path: '/' });
                setCookie('RefreshToken', Refresh, { path: '/' });
                navigate('/');
            } else {
                console.error('error');
            }
        } catch (error) {
            alert('아이디 또는 비밀번호가 틀렸습니다! 다시 입력해주세요!');
        }
    };

    const navigate = useNavigate();
    console.log(cookies);

    return (
        <StyledCover initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <StyledBackgroundImg2>
                <StyledBackgroundImg>
                    <StyledRegisterForm onSubmit={handleSubmit(onSubmit)}>
                        <div className="forLabel">
                            <label htmlFor="username">E-mail Address</label>
                        </div>
                        <StyledInput
                            id="username"
                            type="email"
                            placeholder="enter your e-mail address"
                            {...register('username', {
                                required: '아이디를 입력해주세요!',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Email 주소 형식이 올바르지 않습니다.',
                                },
                            })}
                        />
                        <div className="forError">
                            {errors?.username ? <span>{errors?.username.message}</span> : <span></span>}
                        </div>
                        <div className="forLabel">
                            <label htmlFor="password">Password</label>
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
                        <div className="forError">
                            {errors.password ? <span>{errors.password.message}</span> : <span></span>}
                        </div>
                        <StyledButton type="submit">Log in</StyledButton>
                        <SmallButtonContainer>
                            <SmallButton type="small">Forget ID / password</SmallButton>
                            <SmallButton onClick={() => navigate(`/signup`)}>Sign up</SmallButton>
                        </SmallButtonContainer>
                    </StyledRegisterForm>
                    <AnimatedBackground />
                </StyledBackgroundImg>
            </StyledBackgroundImg2>
        </StyledCover>
    );
};

export default Login;

const StyledCover = styled(motion.div)`
    background-color: white;
    background-size: cover;
    height: 100vh;
    opacity: 0.9;
`;

const zoomInZoomOut = keyframes`
    0% {
        transform: scale(1); 
    }
    50% {
        transform: scale(1.02); 
    }
    100% {
        transform: scale(1); 
    }
`;

const StyledBackgroundImg = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const AnimatedBackground = styled.div`
    background-image: url(${BACK1});
    background-size: cover;
    background-position: center 10%;
    position: absolute;
    height: 100%;
    width: 100%;
    animation: ${zoomInZoomOut} 2s ease-in-out infinite;
    will-change: transform;
`;

const StyledBackgroundImg2 = styled.div`
    background-image: url(${BACK2});
    background-size: cover;
    background-position: center 10%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledRegisterForm = styled(RegisterForm)`
    z-index: 999;
    label {
        font-size: 35px;
        font-family: 'Baloo Chettan 2', cursive;
        text-align: left;
        margin-bottom: 10px;
        margin-left: 15px;
    }
    > div.forLabel {
        width: 100%;
        > label {
            padding-left: 50px;
        }
    }
    > div.forError {
        padding-left: 70px;
        width: 100%;
        height: 20px;
    }
    span {
        color: red;
        height: 25px;
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
    margin-bottom: 10px;
`;
const StyledButton = styled.button`
    border: none;
    outline: 0;
    width: 431px;
    height: 56px;
    background-color: #95c5f2;
    border-radius: 15px;
    font-size: 35px;
    font-weight: 600;
    box-shadow: 0px 1px 20px -7px rgba(0, 0, 0, 0.79);
    -webkit-box-shadow: 0px 1px 20px -7px rgba(0, 0, 0, 0.79);
    -moz-box-shadow: 0px 1px 20px -7px rgba(0, 0, 0, 0.79);
    color: #ffffff;
    margin-top: 15px;
    font-family: 'Baloo Chettan 2', cursive;
    &:hover {
        cursor: pointer;
        background-color: #a7cdf1;
    }

    &:focus {
        background-color: #95c5f2;
    }
`;
const SmallButtonContainer = styled.div`
    display: flex;
    margin-top: 5px;
`;
const SmallButton = styled(StyledButton)<{ type?: string }>`
    font-size: ${(props) => (props.type === 'small' ? '1.1rem' : '1.5rem')};
    width: 205px;
    margin: 10px;
`;
