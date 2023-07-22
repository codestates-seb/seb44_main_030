import { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToast } from '../store/toastState';
import { useCookies } from 'react-cookie';

interface InputProps {
    height?: string;
    onChange?: () => void;
    value?: string;
}

interface DataProps {
    memberId?: number;
    title: string;
    content: string;
    exerciseStartTime: string;
    exerciseEndTime: string;
    todayDate: string;
}

interface ModalProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    value: any;
    mark: any;
}

const Modal = ({ setModal, value, mark }: ModalProps) => {
    const dispatch = useDispatch();
    const dae = moment(value).format('YYYYMMDD');
    const todayDate = moment(value).format('YYYY-MM-DD');
    console.log(todayDate);

    const [startType, setStartType] = useState('');

    const [isFinished, setIsFinished] = useState(false);
    const { register, handleSubmit, watch } = useForm();
    const [cookies] = useCookies(['AuthorizationToken', 'RefreshToken']);
    const authorizationToken = cookies.AuthorizationToken;
    const refreshToken = cookies.RefreshToken;

    const handleClose = () => {
        setModal(false);
    };

    const options = [];
    options.push(
        <option key="" value="">
            시간선택
        </option>,
    );
    for (let i = 0; i < 24; i++) {
        const hour = ('0' + i).slice(-2);
        options.push(
            <option key={hour + ':00'} value={hour + ':00'}>
                {hour + ':00'}
            </option>,
        );
        options.push(
            <option key={hour + ':30'} value={hour + ':30'}>
                {hour + ':30'}
            </option>,
        );
    }
    const handleStartTypeChange = (e: any) => {
        const selectedValue = e.target.value;
        setStartType(selectedValue);
    };

    let endOptions = options;
    if (startType) {
        // start type 값 이후의 옵션만 추출
        const selectedIndex = options.findIndex((option) => option.props.value === startType);
        endOptions = options.slice(selectedIndex + 1);
    }

    const watchStartTime = watch('exerciseStartTime');
    const watchEndTime = watch('exerciseEndTime');

    const onSubmitHandler = async (data: DataProps) => {
        const modifiedValue = `${dae}${watchStartTime.replace(':', '')}`;
        const modfied2Value = `${dae}${watchEndTime.replace(':', '')}`;
        data.memberId = 1;
        data.exerciseStartTime = modifiedValue;
        data.exerciseEndTime = modfied2Value;
        data.todayDate = todayDate;
        const url = 'http://13.209.142.240:8080/trackers';
        console.log(data);

        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${decodeURIComponent(authorizationToken)}`,
                    Refresh: `${refreshToken}`,
                    withCredentials: true,
                },
            });
            console.log(response);
            dispatch(setToast(true));
            setModal(false);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return (
        <Styledmodal>
            <div className="modal-background" onClick={handleClose}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <h3 style={{ fontWeight: 'bold' }}>운동정보 기록하기</h3>
                        <button className="modal-close" onClick={handleClose}>
                            X
                        </button>
                    </div>
                    <Styledform onSubmit={handleSubmit(onSubmitHandler)}>
                        <h1>Session Time</h1>

                        <div>
                            <div>운동시간선택</div>
                            <>
                                시작{' '}
                                <select {...register('exerciseStartTime')} onChange={handleStartTypeChange}>
                                    {options}
                                </select>
                                끝{' '}
                                <select {...register('exerciseEndTime')} disabled={startType === ''}>
                                    {endOptions}
                                </select>
                            </>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                            <StyledInput height="30px" {...register('title')}></StyledInput>
                            <Styledtextarea height="300px" {...register('content')}></Styledtextarea>
                            <div>
                                <Styledbutton type="submit">save</Styledbutton>
                                <Styledbutton onClick={handleClose}>cancel</Styledbutton>
                            </div>
                        </div>
                    </Styledform>
                </div>
            </div>
        </Styledmodal>
    );
};

export default Modal;

const Styledform = styled.form`
    width: 100%;
    height: 100%;

    padding: 10px;
`;

const StyledInput = styled.input<InputProps>`
    width: 100%;
    height: ${(props) => props.height};
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.4);
`;

const Styledtextarea = styled.textarea`
    width: 100%;
    height: 300px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.4);
`;

const Styledbutton = styled.button`
    width: 100px;
    height: 40px;
    border-radius: 15px;
    background-color: #3884d5;
    color: white;
    cursor: pointer;
`;

const Styledmodal = styled.div`
    .modal-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(10px);
        background-color: rgba(66, 65, 65, 0.2);
        z-index: 9999;
    }

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 600px;
        height: 700px;
        background-color: #ffffff;
        padding: 10px;
        border-radius: 5px;
    }

    .modal-close {
        padding: 4px;
        border: none;
        background: none;
        font-size: 18px;
        cursor: pointer;
    }
`;
