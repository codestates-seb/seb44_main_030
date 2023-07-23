import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router';
import { useForm, SubmitHandler } from 'react-hook-form';
import RegisterForm from '../components/RegisterForm';
import { motion } from 'framer-motion';
import axios from 'axios';

import BACK1 from '../../public/ob1.png';
import BACK2 from '../../public/ob2.png';

type SignupInputs = {
    Name: string;
    Nickname: string;
    Email: string;
    Password: string;
    PasswordCheck: string;
    Biography: string;
};

type BackgroundStyledProps = {
    $image: string;
};

const Signup = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignupInputs>({ mode: 'onBlur' });

    //회원가입 요청
    const onSubmit: SubmitHandler<SignupInputs> = (data) => {
        console.log(data);
        const API_URL = import.meta.env.VITE_KEY;
        const payload = {
            name: data.Name,
            password: data.Password,
            nickname: data.Nickname,
            email: data.Email,
            bio: data.Biography,
        };
        console.log(payload);
        axios
            .post(`${API_URL}/members`, payload)
            .then((response) => {
                console.log(response);
                alert('회원가입완료! 로그인페이지로 이동합니다.');
                navigate('/login');
            })
            .catch((error) => {
                console.error('오류:', error);
            });
    };
    const navigate = useNavigate();

    const password = watch('Password', '');
    return (
        <MotionBackground $image={BACK2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <StyledRegisterForm onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="nameInput">Name</label>
                    <input
                        id="nameInput"
                        type="text"
                        placeholder="enter your name"
                        {...register('Name', {
                            required: true,
                            maxLength: {
                                value: 30,
                                message: '이름은 30자를 넘길 수 없습니다.',
                            },
                        })}
                    />
                    {errors.Name ? <span>{errors.Name.message}</span> : <span></span>}
                </div>
                <div>
                    <label htmlFor="nicknameInput">Nickname</label>
                    <input
                        id="nicknameInput"
                        type="text"
                        placeholder="enter your nickname"
                        {...register('Nickname', {
                            required: true,
                            maxLength: {
                                value: 30,
                                message: '닉네임은 30자를 넘길 수 없습니다.',
                            },
                        })}
                    />
                    {errors.Nickname ? <span>{errors.Nickname.message}</span> : <span></span>}
                </div>
                <div>
                    <label htmlFor="emailInput">E-mail Address</label>
                    <input
                        id="emailInput"
                        type="email"
                        placeholder="enter your e-mail address"
                        {...register('Email', {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: 'Email 주소 형식이 올바르지 않습니다.',
                            },
                        })}
                    />
                    {errors.Email ? <span>{errors.Email.message}</span> : <span></span>}
                </div>
                <div>
                    <label htmlFor="passwordInput">Password</label>
                    <input
                        id="passwordInput"
                        type="password"
                        placeholder="enter your password"
                        {...register('Password', {
                            required: true,
                            minLength: {
                                value: 8,
                                message: '비밀번호는 8자 이상이어야 합니다.',
                            },
                            maxLength: {
                                value: 40,
                                message: '비밀번호는 40자를 넘길 수 없습니다.',
                            },
                        })}
                    />
                    {errors.Password ? <span>{errors.Password.message}</span> : <span></span>}

                    <input
                        id="passwordCheckInput"
                        type="password"
                        placeholder="re-enter your password"
                        {...register('PasswordCheck', {
                            required: true,
                            validate: (value) => value === password || '입력하신 password가 일치하지 않습니다.',
                        })}
                    />
                    {errors.PasswordCheck ? <span>{errors.PasswordCheck.message}</span> : <span></span>}
                </div>
                <div>
                    <label htmlFor="biographyInput">Biography</label>
                    <input
                        id="biographyInput"
                        type="text"
                        placeholder="enter your biography"
                        {...register('Biography', {
                            required: true,
                            minLength: {
                                value: 5,
                                message: '5자 이상 입력해주세요!',
                            },
                        })}
                    />
                    {errors.Biography ? <span>{errors.Biography.message}</span> : <span></span>}
                </div>
                <button type="submit">Sign up</button>
            </StyledRegisterForm>
            <AnimatedBackground />
        </MotionBackground>
    );
};

export default Signup;

const MotionBackground = styled(motion.div)<BackgroundStyledProps>`
    background-image: url(${(props) => props.$image});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

const zoomInZoomOut = keyframes`
    0% {
        transform: scale(1); 
    }
    50% {
        transform: scale(1.03); 
    }
    100% {
        transform: scale(1); 
    }
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

const StyledRegisterForm = styled(RegisterForm)`
    height: 940px;
    z-index: 999;

    > div {
        display: flex;
        flex-direction: column;

        > label {
            display: flex;
            align-items: center;
            font-size: 35px;
            height: 40px;
            font-family: 'Baloo Chettan 2', cursive;
            text-align: left;
            margin-bottom: 10px;
            margin-left: 15px;
        }

        > input {
            font-family: 'Baloo Chettan 2', cursive;
            font-size: 1.5rem;
            width: 420px;
            height: 50px;
            border-radius: 20px;
            border: none;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            outline: none;
            padding-left: 20px;
            &::placeholder {
                opacity: 0.5;
            }
        }
        > input:focus {
            outline: none;
        }
        > input::placeholder {
            color: #d5d9da;
        }
        > span {
            margin-top: 5px;
            margin-bottom: 5px;
            padding-left: 10px;
            height: 22px;
            color: red;
        }
    }

    > button {
        border: none;
        outline: 0;
        width: 431px;
        height: 56px;
        background-color: #95c5f2;
        border-radius: 15px;
        font-size: 35px;
        font-weight: 600;
        font-family: 'Baloo Chettan 2', cursive;
        box-shadow: 0px 1px 20px -7px rgba(0, 0, 0, 0.79);
        -webkit-box-shadow: 0px 1px 20px -7px rgba(0, 0, 0, 0.79);
        -moz-box-shadow: 0px 1px 20px -7px rgba(0, 0, 0, 0.79);
        color: #ffffff;
        margin-top: 5px;

        &:hover {
            cursor: pointer;
            background-color: #a7cdf1;
        }

        &:focus {
            background-color: #95c5f2;
        }
    }

    > section {
        font-size: 55px;
        font-weight: 600;
        display: flex;

        > h2 {
            margin-left: 10px;
        }

        > img {
            width: 90px;
            height: 55px;
        }
    }
`;
