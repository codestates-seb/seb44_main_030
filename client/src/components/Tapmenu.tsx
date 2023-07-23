import { styled } from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Block from './style/Wrapper';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import Modal from './Modal';
import Table from './Table';
import Clubtable from './Clubtable';
import ProfileImage from './style/ProfileImage';
import { useCookies } from 'react-cookie';
// 포스트요청 게시글작성-> get요청으로 전체 스플래시 트래크 정보를 가져와야겟죠(날짜,tracker-id)  ->개별 splash tracker 조회(개별) ->splash-id

type CalData = {
    trackerId: number;
    todayDate: string;
};

type ValuePiece = Date | null;

const Tabmenu = () => {
    const [currentTab, clickTab] = useState(0);

    const menuArr = ['오수완', '내가쓴게시글', '내가쓴모집글'];

    const selectMenuHandler = (index: number) => {
        clickTab(index);
    };
    return (
        <div style={{ position: 'relative' }}>
            <TabMenu>
                {menuArr.map((el, index) => (
                    <li
                        key={index}
                        className={index === currentTab ? 'submenu focused' : 'submenu'}
                        onClick={() => selectMenuHandler(index)}
                    >
                        {el}
                    </li>
                ))}
            </TabMenu>

            {currentTab === 0 && <Tabcomponent0 />}
            {currentTab === 1 && <Tabcomponent1 />}
            {currentTab === 2 && <Tabcomponent2 />}
        </div>
    );
};
const Tabcomponent0 = () => {
    const [value, setValue] = useState<ValuePiece | [ValuePiece, ValuePiece]>(new Date());
    const [caldata, setCalData] = useState([]);
    const [modal, setModal] = useState(false);
    const API_URL = import.meta.env.VITE_KEY;

    const [cookies] = useCookies(['AuthorizationToken', 'RefreshToken']);
    const authorizationToken = cookies.AuthorizationToken;
    const refreshToken = cookies.RefreshToken;

    useEffect(() => {
        axios
            .get(`${API_URL}/members/mypage/trackers/1?page=1&size=100`, {
                headers: {
                    Authorization: `${decodeURIComponent(authorizationToken)}`,
                    Refresh: `${refreshToken}`,
                    withCredentials: true,
                },
            })
            .then((data) =>
                setCalData(
                    data.data.data.map((item: any) => ({
                        trackerId: item.trackerId,
                        todayDate: item.todayDate,
                    })),
                ),
            );
    }, []);

    const mark = caldata.map((item: CalData) => item.todayDate);

    const HandleClickDay = () => {
        setModal(!modal);
    };

    return (
        <>
            <Block color="rgb(252, 220, 220)">
                <h2 style={{ position: 'relative', left: '20px' }}>오수완 체크달력입니다.</h2>
                <h4 style={{ position: 'relative', left: '20px' }}>
                    달력 날짜를 클릭해서, 오늘 운동정보를 입력하세요!
                </h4>
            </Block>
            <div style={{ display: 'flex', position: 'relative' }}>
                <ReactCalander>
                    <Calendar
                        onChange={setValue}
                        value={value}
                        formatDay={(locale, date) => {
                            console.log('locale:', locale);
                            return moment(date).format('D');
                        }}
                        //locale추가?
                        tileContent={({ date }) => {
                            const html = [];

                            if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
                                html.push(
                                    <div
                                        className="dot"
                                        key={moment(date).format('YYYY-MM-DD')}
                                        style={{ position: 'relative', top: '-15px' }}
                                    >
                                        <ProfileImage
                                            width="40px"
                                            height="40px"
                                            url="../../public/lovepik-dolphin-png-image_401337360_wh1200.png"
                                        ></ProfileImage>
                                    </div>,
                                );
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
                {modal && <Modal setModal={setModal} value={value} mark={mark} caldata={caldata}></Modal>}
            </div>
        </>
    );
};

// {
//     '날짜', '트래커id';
// }
const Tabcomponent1 = () => {
    return (
        <GridTap>
            <div></div>
            <Table />
        </GridTap>
    );
};
const Tabcomponent2 = () => {
    return (
        <GridTap>
            <div></div>
            <Clubtable />
        </GridTap>
    );
};

export default Tabmenu;

const TabMenu = styled.ul`
    color: rgba(21, 20, 20, 0.4);
    background: white;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style: none;

    .submenu {
        display: flex;
        padding: 10px;
        font-size: 15px;
        transition: 0.5s;
        border-radius: 10px 10px 0px 0px;
    }
    .submenu:hover {
        color: rgb(21, 20, 20);
    }

    .focused {
        border-bottom: 1px solid black;
        color: rgb(21, 20, 20);
    }
`;

const GridTap = styled.div`
    position: absolute;
    left: 5%;
`;
const ReactCalander = styled.div`
    margin-top: 20px;
    width: 100%;

    .react-calendar {
        width: 1000px;
        height: 550px;
        border: 1px solid brown;
        border-radius: 20px;
    }
    .react-calendar__navigation {
        background: pink;
        border-bottom: 4px solid brown;
        height: 90px;
        border-radius: 20px 20px 0 0;

        span {
            font-size: 30px;
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
