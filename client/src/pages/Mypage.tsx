import styled from 'styled-components';
import profile from '../../public/profile.png';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
const Mypage = () => {
    return (
        <Background>
            <Box>
                <LeftColumn>
                    <img src={profile} style={{ width: '200px', height: '200px' }}></img>
                    <Tag>회원등급</Tag>
                    <div>e-mail</div>
                    <div>닉네임</div>
                    <div>수정</div>
                </LeftColumn>
                <RightColumn>
                    <div>회원정보</div>
                    <UserInfo>
                        <div>이메일:kafmjh12@gmail.com</div>
                        <div>닉네임:바보</div>
                        <div>자기소개:안녕하세요 수영의신입니다!</div>
                    </UserInfo>
                    <Tapinfo>
                        <Tabmenu></Tabmenu>
                    </Tapinfo>
                </RightColumn>
            </Box>
        </Background>
    );
};

const Tabmenu = () => {
    const [currentTab, clickTab] = useState(0);

    const menuArr = ['오수완', '내가쓴게시글', '내가쓴모집글'];

    const selectMenuHandler = (index: any) => {
        clickTab(index);
    };
    return (
        <div>
            <TabMenu>
                {menuArr.map((el, index) => (
                    <li
                        className={index === currentTab ? 'submenu focused' : 'submenu'}
                        onClick={() => selectMenuHandler(index)}
                    >
                        {el}
                    </li>
                ))}
            </TabMenu>
            <div>
                <div>{currentTab === 0 && <Tabcomponent0 />}</div>
                <div>{currentTab === 1 && <Tabcomponent1 />}</div>
                <div>{currentTab === 2 && <Tabcomponent2 />}</div>
            </div>
        </div>
    );
};
const Tabcomponent0 = () => {
    const [value, onChange] = useState(new Date());
    const mark = ['2023-07-08', '2023-07-10', '2023-07-15'];
    const [modal, setModal] = useState(false);
    const HandleClickDay = () => {
        setModal(!modal);
    };

    return (
        <div style={{ display: 'flex' }}>
            <ReactCalander>
                <Calendar
                    onChange={onChange}
                    value={value}
                    formatDay={(locale, date) => moment(date).format('D')}
                    tileContent={({ date, view }) => {
                        const html = [];

                        if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
                            html.push(<div className="dot">✔</div>);
                        }

                        return (
                            <>
                                <div>{html}</div>
                            </>
                        );
                    }}
                    onClickDay={HandleClickDay}
                />
            </ReactCalander>
            {modal && <Modal setModal={setModal}></Modal>}
        </div>
    );
};
const Tabcomponent1 = () => {
    return <div>내가쓴게시글입니다.</div>;
};
const Tabcomponent2 = () => {
    return <div>내가쓴모집글입니다.</div>;
};

const Modal = ({ setModal }) => {
    const [text, setText] = useState('');

    const handleTextChange = (e) => {
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
                    <button className="modal-close" onClick={handleClose}>
                        X
                    </button>
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

export default Mypage;

const Box = styled.div`
    margin-top: 10px;
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-auto-flow: row;
    grid-gap: 0px;
    grid-template-columns: 3fr 9fr;
    @media (max-width: 960px) {
        display: flex;
        flex-direction: column;
        padding: 0px 8px;
    }
`;
const LeftColumn = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    gap: 10px;

    @media (max-width: 960px) {
        margin-top: 20px;
        padding-bottom: 0px;
    }
`;
const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px;
`;

const Background = styled.div`
    background-image: url('../../public/mypage.png');
    background-size: cover;
    height: 100vh;
    background-position-y: 20%;
    box-shadow: 5px 2px 2px 2px;
    position: relative;
`;

const Tag = styled.div`
    border-radius: 10px;
    min-width: 48px;
    text-align: center;
    font-size: 12px;
    font-weight: 400 !important;
    background-color: #e4e4e4;
`;

const UserInfo = styled.div`
    background: linear-gradient(to right, rgba(181, 242, 255, 1), rgba(112, 178, 255, 0.81));
    border-radius: 30px;
    width: 80%;
    height: 30%;
    padding: 20px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid black;
`;

const Tapinfo = styled.div`
    background: linear-gradient(to right, rgba(181, 242, 255, 1), rgba(112, 178, 255, 0.81));
    border-radius: 30px;
    width: 83%;
    height: 100%;
    margin-top: 10px;
    border: 1px solid black;
`;

const TabMenu = styled.ul`
    background-color: rgba(152, 193, 240, 0.81);
    color: rgb(232, 234, 237);
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style: none;
    margin-bottom: 7rem;
    margin-top: 30px;

    .submenu {
        display: flex;
        width: calc(100% / 3);
        padding: 10px;
        font-size: 15px;
        transition: 0.5s;
        border-radius: 10px 10px 0px 0px;
    }

    .focused {
        background-color: rgba(181, 242, 255, 1);
        color: rgb(21, 20, 20);
    }
`;

const ReactCalander = styled.div`
    position: relative;
    bottom: 50px;
    left: 12%;
    width: 700px;
    .react-calendar {
        width: 1000px;
        border: none;
        border-radius: 20px;
    }
    .react-calendar__navigation {
        background: pink;
        border-bottom: 4px solid brown;
        height: 90px;
        border-radius: 20px 20px 0 0;

        span {
            font-size: 24px;
            font-weight: 600;
            color: brown;
        }
    }

    .react-calendar__navigation button:disabled {
        background-color: pink;
        border-radius: 20px 20px 0 0;
    }

    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
        background-color: pink;
        border-radius: 20px 20px 0 0;
    }
    .react-calendar__month-view {
        padding: 12px 32px;
        abbr {
            // 텍스트
            color: brown;
            font-size: 16px;
            font-weight: 500;
        }
    }
    .react-calendar__tile--now {
        background: rgba(191, 210, 233, 0.81);
        border-radius: 14px;
    }
    .react-calendar__month-view__weekdays {
        abbr {
            // 텍스트 부분
            font-size: 18px;
            font-weight: 900;
        }
    }
    .react-calendar__tile {
        text-align: center;
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    /*hover, focus, 선택됐을 시 */
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus,
    .react-calendar__tile--active {
        background: rgba(104, 166, 241, 0.81);
        border-radius: 14px;
    }
    .dot {
        height: 30px;
        width: 40px;
        position: relative;
        left: -13px;
        font-size: 20px;

        border-radius: 50%;
        display: inline-block;
        margin-left: 30px;
    }
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
        width: 400px;
        height: 400px;
        background-color: white;
        padding: 20px;
        border-radius: 4px;
    }

    .input {
        width: 200px;
        height: 200px;
    }

    .modal-close {
        align-self: flex-end;
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
