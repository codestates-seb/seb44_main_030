import styled from 'styled-components';

type ModalPropsType = {
    handleCloseModal: () => void;
    handleConfirm: () => void;
    text: string;
};
//handleModal: 취소버튼으로 모달 닫는 함수
//handleConfirm: 확인 버튼을 누른 후, 후속 동작을 위한 함수(ex. 게시글삭제 로직, 뒤로가기 로직)
const Modal = ({ handleCloseModal, handleConfirm, text }: ModalPropsType) => {
    return (
        <Styledmodal>
            <div className="modal-background" onClick={handleCloseModal}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <p style={{ fontWeight: 'bold' }}>{text}</p>
                        <button className="modal-close" onClick={handleCloseModal}>
                            X
                        </button>
                    </div>
                    <div className="modal-buttons">
                        <button onClick={handleConfirm}>예</button>
                        <button onClick={handleCloseModal}>아니오</button>
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
        width: 220px;
        height: 160px;
        background-color: #ffffff;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
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
        background-color: #3884d5;
        color: #ffffff;
        cursor: pointer;
        &:hover {
            background-color: #5797dc;
        }
    }
`;
