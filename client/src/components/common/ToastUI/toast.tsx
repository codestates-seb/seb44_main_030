import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { clearToast } from '../../../store/toastState';
import { RootState } from '../../../store/store';

const Toast = () => {
    const [status, setStatus] = useState('start');
    const dispatch = useDispatch();
    const toastRef = useRef<HTMLDivElement>(null);
    const message = useSelector((state: RootState) => state.toast.toastMessage);

    useEffect(() => {
        setStatus('enter');
        const timeoutId = setTimeout(() => {
            setStatus('exit');
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, [message]);

    useEffect(() => {
        if (status === 'exit' && toastRef.current) {
            const handleTransitionEnd = () => {
                dispatch(clearToast());
            };

            toastRef.current.addEventListener('transitionend', handleTransitionEnd);
            return () => {
                if (toastRef.current) {
                    toastRef.current.removeEventListener('transitionend', handleTransitionEnd);
                }
            };
        }
    }, [status, dispatch]);

    return (
        <StyledToast ref={toastRef} className={status}>
            <p>{message}</p>
        </StyledToast>
    );
};

export default Toast;

const StyledToast = styled.div`
    font-family: TTWanjudaedunsancheB;
    font-style: italic;
    background-color: rgba(56, 132, 213, 1);
    border-radius: 10px;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
    height: 100px;
    width: 250px;
    padding: 5px;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 6rem;
    right: 1rem;
    z-index: 999999;
    transition: transform 0.5s ease-out, opacity 0.5s ease-out;
    transform: translateX(100%);
    opacity: 0;

    &.enter {
        transform: translateX(0);
        opacity: 1;
    }

    &.start {
        transition: none;
    }

    &.exit {
        transform: translateX(100%);
        opacity: 0;
    }

    .toast-alert p {
        margin: 0;
    }
`;
