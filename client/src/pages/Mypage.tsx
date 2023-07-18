import styled from 'styled-components';
import Block from '../components/style/Wrapper';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ProfileImage from '../components/style/ProfileImage';
import { getInfos } from '../Api/getmember';
import Tabmenu from '../components/Tapmenu';
import { Loading } from '../components/Lodaing';
import { useQuery, useMutation } from '@tanstack/react-query';

interface member {
    memberId?: number;
    name?: string;
    email?: string;
    nickname?: string;
    bio?: string;
}

const Mypage = () => {
    const [edit, setEdit] = useState(false);
    const memberId = 1; //memberId Link로받던가 아니면  header포함해서받던가하기
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['memberinfo', memberId],
        queryFn: () => getInfos(memberId),
    });
    const patchInfos = (edit: member) =>
        axios
            .patch(`http://13.209.142.240:8080/members/${memberId}`, edit)
            .then(() => {
                console.log('수정됨');
            })
            .catch((error) => {
                console.error(error);
            });
    const updateMutation = useMutation((edit: member) => patchInfos(edit));

    const handleUpdate = (member: member) => {
        updateMutation.mutate(member);
        location.reload();
    };
    useEffect(() => {
        if (data) {
            const { nickname, bio } = data;
            setMember({ nickname, bio });
        }
    }, [data]);

    const [member, setMember] = useState({ nickname: '', bio: '' });
    if (isLoading) return <Loading />;

    if (isError)
        return (
            <>
                <h3>Oops, someting went wrong</h3> <p>{error.toString()}</p>
            </>
        );

    console.log(member);

    return (
        <div style={{ width: '100%', height: '100%' }}>
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
                                    <Block width="290px" height="140px">
                                        <Infoexplain>
                                            <div className="sort">name</div>
                                            <div>{data.name}</div>
                                        </Infoexplain>
                                        <Infoexplain>
                                            <div className="sort">닉네임</div>
                                            {edit ? (
                                                <StyledInput
                                                    value={member.nickname}
                                                    onChange={(e) => {
                                                        setMember((prev) => ({
                                                            ...prev,
                                                            nickname: e.target.value,
                                                        }));
                                                    }}
                                                ></StyledInput>
                                            ) : (
                                                <div>{data.nickname}</div>
                                            )}
                                        </Infoexplain>
                                        <Infoexplain>
                                            <div className="sort">e-mail</div>
                                            <div>{data.email}</div>
                                        </Infoexplain>
                                    </Block>

                                    <Block width="290px" height="250px">
                                        <div>
                                            <p style={{ fontWeight: 'bold' }}>자기소개</p>
                                            {edit ? (
                                                <Styledtextarea
                                                    value={member.bio}
                                                    onChange={(e) => {
                                                        setMember((prev) => ({
                                                            ...prev,
                                                            bio: e.target.value,
                                                        }));
                                                    }}
                                                ></Styledtextarea>
                                            ) : (
                                                <p>{data.bio}</p>
                                            )}
                                        </div>
                                    </Block>
                                    {edit ? (
                                        <Styledbutton onClick={() => handleUpdate(member)}>저장</Styledbutton>
                                    ) : (
                                        <Styledbutton
                                            onClick={() => {
                                                setEdit(true);
                                            }}
                                        >
                                            수정
                                        </Styledbutton>
                                    )}
                                </div>
                            </Block>
                            <Block width="1000px" height="800px">
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

const StyledInput = styled.input`
    width: 180px;
    height: 25px;
    font-size: 15px;
`;

const Styledtextarea = styled.textarea`
    width: 270px;
    height: 170px;
`;

const GridSystem = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 150px 8fr 150px;
`;

const Infoexplain = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    height: 32%;
    .sort {
        font-weight: bold;
    }
`;

const Styledbutton = styled.button`
    width: 100px;
    height: 40px;
    border-radius: 15px;
    position: absolute;
    bottom: 1%;
    background-color: #3884d5;
    color: white;
    cursor: pointer;
`;
