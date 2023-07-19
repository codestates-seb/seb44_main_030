import react from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import moment from 'moment';

interface InputProps {
    height?: string;
    onChange?: () => void;
    value?: string;
}

const Modal = ({ setModal, value }) => {
    const [startType, setStartType] = useState('');
    const [endType, setEndType] = useState('');
    const [formdata, setFormData] = useState({
        title: ' ',
        content: '',
        exerciseStartTime: '',
        exerciseEndTime: '',
    });

    console.log(formdata);
    const handleClose = () => {
        setModal(false);
    };
    const dae = moment(value).format('YYYYMMDD');
    const handleStartTypeChange = (e) => {
        const selectedValue = e.target.value;
        setStartType(selectedValue);
        setEndType('');
        setFormData((prev) => ({
            ...prev,
            exerciseStartTime: dae + selectedValue.replace(':', ''),
            exerciseEndTime: '',
        }));
    };

    const handleEndTypeChange = (e) => {
        const selectedValue = e.target.value;
        setEndType(selectedValue);
        setFormData((prev) => ({ ...prev, exerciseEndTime: dae + selectedValue.replace(':', '') }));
    };

    const onSubmitHandler = () => {
        console.log('제출됨!');
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
                    <Styledform>
                        <h1>Session Time</h1>

                        <div>
                            <div>운동시간선택</div>
                            <TimeSelect
                                startType={startType}
                                handleStartTypeChange={handleStartTypeChange}
                                endType={endType}
                                handleEndTypeChange={handleEndTypeChange}
                            ></TimeSelect>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                            <StyledInput
                                height="30px"
                                value={formdata.title}
                                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                            ></StyledInput>
                            <Styledtextarea
                                height="300px"
                                value={formdata.content}
                                onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                            ></Styledtextarea>
                            <div>
                                <Styledbutton onClick={onSubmitHandler}>save</Styledbutton>
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

const TimeSelect = ({ startType, handleStartTypeChange, endType, handleEndTypeChange }) => {
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

    let endOptions = options;
    if (startType) {
        // start type 값 이후의 옵션만 추출
        const selectedIndex = options.findIndex((option) => option.props.value === startType);
        endOptions = options.slice(selectedIndex + 1);
    }

    return (
        <>
            시작{' '}
            <select name="startType" value={startType} onChange={handleStartTypeChange}>
                {options}
            </select>
            끝{' '}
            <select name="endType" value={endType} onChange={handleEndTypeChange}>
                {endOptions}
            </select>
        </>
    );
};
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