import logoImg from '../assets/Signup_Logo.png';
import React, { ReactNode, FormEventHandler } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

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
                <img src={logoImg} />
                <h2>SplashZone</h2>
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
    height: 710px;
    border-radius: 50px;
    border: 2px solid rgba(123, 123, 123, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    color: #ffffff;

    > section {
        font-size: 55px;
        font-weight: 600;
        display: flex;
        align-items: center;
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
