import styled from 'styled-components';
import Block from '../components/style/Wrapper';
import { useEffect, useState } from 'react';
import ProfileImage from '../components/style/ProfileImage';
import { getInfos } from '../api/getmember';
import Tabmenu from '../components/Tapmenu';
import { Loading } from '../components/Lodaing';

const Mypage = () => {
    const memberId = 3; //memberId Link로받던가 아니면  header포함해서받던가하기
    const [memberInfo, setmemberInfo] = useState({ name: '', nickname: '', email: '', bio: '' });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getInfos(memberId).then((data) => setmemberInfo(data.data.data));
        setLoading(false);
    }, []);

    return (
        <div>
            {loading && <Loading></Loading>}
            <Background>
                <div style={{ background: 'rgb(105,229,255)', width: '100%', height: '200px' }}>
                    <GridSystem>
                        <div
                            style={{
                                display: 'flex',
                                gap: '40px',
                                gridColumn: '2/3',
                                width: '100%',
                                height: '860px',
                                background: 'rgb(231, 231, 231)',
                                padding: '20px',
                                marginTop: '30px',
                                borderRadius: '20px',
                            }}
                        >
                            <Block width="500px" height="600px">
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <ProfileImage width="100px" height="100px" url="../../public/dummy.png" />
                                    <Block width="272px" height="140px">
                                        <Infoexplain>
                                            <p className="sort">name</p>
                                            <p>{memberInfo.name}</p>
                                        </Infoexplain>
                                        <Infoexplain>
                                            <p className="sort">닉네임</p>
                                            <p>{memberInfo.nickname}</p>
                                        </Infoexplain>
                                        <Infoexplain>
                                            <p className="sort">e-mail</p>
                                            <p>{memberInfo.email}</p>
                                        </Infoexplain>
                                    </Block>

                                    <Block width="272px" height="250px">
                                        <div>
                                            <p style={{ fontWeight: 'bold' }}>자기소개</p>
                                            <p>{memberInfo.bio}</p>
                                        </div>
                                    </Block>
                                    <button>수정</button>
                                </div>
                            </Block>
                            <Block width="100%" height="800px">
                                <Tabmenu></Tabmenu>
                            </Block>
                        </div>
                    </GridSystem>
                </div>
            </Background>
        </div>
    );
};

export default Mypage;

const Background = styled.div`
    background-image: url('../../public/mypage.png');
    background-size: cover;
    height: 100vh;
    background-position-y: 20%;
    box-shadow: 5px 2px 2px 2px;
    position: relative;
`;

const GridSystem = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 150px 8fr 150px;
`;

const Infoexplain = styled.div`
    display: flex;
    gap: 50px;
    height: 40px;
    .sort {
        font-weight: bold;
    }
`;

const Styledbutton = styled.button``;
