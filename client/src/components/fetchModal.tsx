import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm, FieldValues } from 'react-hook-form';
import moment from 'moment';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToast } from '../store/toastState';
import { useCookies } from 'react-cookie';

interface InputProps {
    height?: string;
    onChange?: any;
    value?: string;
}

interface ModalProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    value: any;
    caldata: any;
}

const FetchModal = ({ setModal, value, caldata }: ModalProps) => {
    const [prev, setPrev] = useState({ exerciseTime: 0, title: '', content: '' });
    const dispatch = useDispatch();
    const dae = moment(value).format('YYYYMMDD');
    const todayDate = moment(value).format('YYYY-MM-DD');
    const API_URL = import.meta.env.VITE_KEY;

    const foundObject = caldata.find((item: any) => item.todayDate === todayDate);

    const trackerIdValue = foundObject.trackerId;

    const [startType, setStartType] = useState('');

    const { register, handleSubmit, watch } = useForm();
    const [cookies] = useCookies(['AuthorizationToken', 'RefreshToken']);
    const authorizationToken = cookies.AuthorizationToken;
    const refreshToken = cookies.RefreshToken;

    const handleClose = () => {
        setModal(false);
    };
    useEffect(() => {
        axios
            .get(`${API_URL}/trackers/${trackerIdValue}`, {
                headers: {
                    Authorization: `${decodeURIComponent(authorizationToken)}`,
                    Refresh: `${refreshToken}`,
                    withCredentials: true,
                },
            })
            .then((data) => setPrev(data.data.data));
    }, [trackerIdValue]);

    console.log(prev);
    if (prev === undefined) return null;

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

    const onSubmitHandler = async (data: FieldValues) => {
        const modifiedValue = `${dae}${watchStartTime.replace(':', '')}`;
        const modfied2Value = `${dae}${watchEndTime.replace(':', '')}`;
        data.exerciseStartTime = modifiedValue;
        data.exerciseEndTime = modfied2Value;
        data.todayDate = todayDate;
        const url = `${API_URL}/trackers/${trackerIdValue}`;
        console.log(data);

        try {
            const response = await axios.patch(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${decodeURIComponent(authorizationToken)}`,
                    Refresh: `${refreshToken}`,
                    withCredentials: true,
                },
            });
            console.log(response);
            dispatch(setToast(true));
            location.reload();
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const time = prev.exerciseTime;
    const hours = Math.floor(time / 60);
    const Minutes = time % 60;

    if (prev === undefined) return null;
    return (
        <Styledmodal>
            <div className="modal-background">
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <h3 style={{ fontWeight: 'bold' }}>운동정보 수정하기</h3>
                        <button className="modal-close" onClick={handleClose}>
                            X
                        </button>
                    </div>
                    <Styledform onSubmit={handleSubmit(onSubmitHandler)}>
                        <h1>Session Time</h1>

                        <div>
                            <div>운동시간선택</div>
                            <div>총 운동시간: {`${hours}시간 ${Minutes}분`}</div>
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
                            <StyledInput
                                height="30px"
                                {...register('title')}
                                value={prev.title}
                                onChange={(e: any) => {
                                    setPrev((prev: any) => ({ ...prev, title: e.target.value }));
                                }}
                            ></StyledInput>
                            <Styledtextarea
                                {...register('content')}
                                value={prev.content}
                                onChange={(e: any) => {
                                    setPrev((prev) => ({ ...prev, content: e.target.value }));
                                }}
                            ></Styledtextarea>
                            <div>
                                <Styledbutton type="submit">수정</Styledbutton>
                                <Styledbutton onClick={handleClose}>취소</Styledbutton>
                            </div>
                        </div>
                    </Styledform>
                </div>
            </div>
        </Styledmodal>
    );
};

export default FetchModal;

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
