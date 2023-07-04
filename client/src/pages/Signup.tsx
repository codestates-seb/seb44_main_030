import styled from 'styled-components';
import React from 'react';
import { useNavigate } from 'react-router';
import backgroundImg from '../assets/Signup_background.png';
import { useForm, SubmitHandler } from 'react-hook-form';
import RegisterForm from '../components/RegisterForm';

type Inputs = {
    Nickname: string;
    Email: string;
    Password: string;
    PasswordCheck: string;
};

interface BackgroundProps {
    $image: string;
}

const Signup = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        // console.log(data);
        // 추후 회원가입 post api 요청 작성 필요
        // 요청 성공 가정
        alert('회원가입 완료!');
        navigate('/');
    };
    const navigate = useNavigate();

    const password = watch('Password', '');
    return (
        <Background $image={backgroundImg}>
            <StyledRegisterForm onSubmit={handleSubmit(onSubmit)}>
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
                                message: 'Email 주소가 올바르지 않습니다.',
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
                                message: '비밀번호는 40자를 넘기를 수 없습니다.',
                            },
                        })}
                    />
                    {errors.Password ? <span>{errors.Password.message}</span> : <span></span>}

                    <label htmlFor="passwordCheckInput"></label>
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
                <button type="submit">Sign up</button>
            </StyledRegisterForm>
        </Background>
    );
};

export default Signup;

const Background = styled.div<BackgroundProps>`
    background-image: url(${(props) => props.$image});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledRegisterForm = styled(RegisterForm)`
  > div {
    display: flex;
    flex-direction: column;

    > label {
      font-size: 35px;
      font-weight: 700;
      text-align: left;
      margin-bottom: 10px;
      margin-left: 15px;
    }

    > input {
      width: 431px;
      height: 56px;
      border-radius: 15px;
      border: none;
      font-size: 20px;
      font-weight: 600;
      text-align: left;
      background-color: #edfcff;
      box-sizing: border-box;
      padding-left: 20px;
      box-shadow: 0px 1px 20px -11px rgba(0, 0, 0, 0.79) inset;
      -webkit-box-shadow: 0px 1px 20px -11px rgba(0, 0, 0, 0.79) inset;
      -moz-box-shadow: 0px 1px 20px -11px rgba(0, 0, 0, 0.79) inset;
    }
    > input:focus {
      outline: none;
    }
    > input::placeholder {
      color: #d5d9da;
    }
    > span {
      margin-top:5px;
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
    box-shadow: 0px 1px 20px -7px rgba(0,0,0,0.79);
    -webkit-box-shadow: 0px 1px 20px -7px rgba(0,0,0,0.79);
    -moz-box-shadow: 0px 1px 20px -7px rgba(0,0,0,0.79);
    color: #ffffff;
    margin-top: 10px;
    &:hover {
      cursor: pointer;
      background-color: #A7CDF1;
    }

    &:focus {
      background-color: #95c5f2;
    }
  }

  > section {
    font-size: 55px;
    font-weight: 600;
    display: flex;

    >h2 {
      margin-left: 10px;
    }

    >img {
      width: 90px,
      height: 55px,
    }
  }
`;
