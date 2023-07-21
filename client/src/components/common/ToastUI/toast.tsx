import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToast } from '../../../store/toastState';

const Toast = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setToast(false)); // 2초 뒤, toastState가 false가 되면서 알림창이 사라진다
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <StyledToast>
            <p>저장되었습니다!</p>
        </StyledToast>
    );
};

export default Toast;

const StyledToast = styled.div`
    background-color: rgba(80, 141, 255);
    border: 1px solid rgba(255, 127, 80, 0.1);
    border-radius: 10px;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
    height: 40px;
    width: 250px;
    padding: 5px;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 30%;
    z-index: 999999;

    .toast-alert p {
        margin: 0;
    }
`;
