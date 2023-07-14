import react from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const Modal = ({ setModal }: { setModal: Dispatch<SetStateAction<boolean>> }) => {
    const [text, setText] = useState('');

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleSave = () => {
        console.log('저장됨:', text);
    };

    const handleClose = () => {
        setModal(false);
    };

    return (
        <Styledmodal>
            <div className="modal-background" onClick={handleClose}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <p style={{ fontWeight: 'bold' }}>오늘의운동정보!</p>
                        <button className="modal-close" onClick={handleClose}>
                            X
                        </button>
                    </div>
                    <textarea className="input" placeholder="Add event..." value={text} onChange={handleTextChange} />
                    <div className="modal-buttons">
                        <button onClick={handleSave}>Save</button>
                        <button>Cancel</button>
                        <button>Delete</button>
                    </div>
                </div>
            </div>
        </Styledmodal>
    );
};

export default Modal;

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
        width: 230px;
        height: 300px;
        background-color: #ffffff;
        padding: 10px;
        border-radius: 5px;
    }

    .input {
        width: 200px;
        height: 200px;
    }

    .modal-close {
        padding: 4px;
        border: none;
        background: none;
        font-size: 18px;
        cursor: pointer;
    }

    .modal-buttons {
        margin-top: 20px;
    }

    .modal-buttons button {
        margin-right: 10px;
        padding: 8px 12px;
        border: none;
        border-radius: 4px;
        background-color: #ccc;
        cursor: pointer;
    }
`;
