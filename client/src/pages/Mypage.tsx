import styled from 'styled-components';
import Block from '../components/style/Wrapper';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getInfos } from '../api/getmember';
import Tabmenu from '../components/Tapmenu';
import { Loading } from '../components/Lodaing';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';

interface member {
    memberId?: number;
    name?: string;
    email?: string;
    nickname?: string;
    bio?: string;
}

//useEffect로 토큰 인증 => 다르면 방어하도록
//공통컴포넌트로 관리
//HOC => 컴포넌트를 함수의 인자로 받아서 작업을 처리해서 처리가 완료된 컴포넌트를 리턴하는 HOC => 정말 정말 유용함, 효율적인 개발
//로그인 처리가 필요한 HOC를 만들어냄
//많이들 쓰기 때문에 검색하면 정보가 많음
//hoc 말고도 커스텀훅을 만들거나 다 같은 원리
//이외에도 프라이빗 라우트 등이 있음

const Mypage = () => {
    const [edit, setEdit] = useState(false);
    const [validation, setvalidation] = useState('');
    const [upimage, setUpimage] = useState<File | null>(null);
    const [cookies] = useCookies(['AuthorizationToken', 'RefreshToken']);
    const authorizationToken = cookies.AuthorizationToken;
    const refreshToken = cookies.RefreshToken;
    const API_URL = import.meta.env.VITE_KEY;

    const memberId = 1; //memberId Link로받던가 아니면  header포함해서받던가하기
    const { data, isLoading, isError, error } = useQuery<any, Error>({
        queryKey: ['memberinfo', memberId],
        queryFn: () => getInfos(memberId),
    });

    const patchInfos = (edit: member) =>
        axios
            .patch(`${API_URL}/members/${memberId}`, edit, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${decodeURIComponent(authorizationToken)}`,
                    Refresh: `${refreshToken}`,
                    withCredentials: true,
                },
            })
            .then(() => {
                console.log('수정됨');
            })
            .catch((error) => {
                console.error(error);
            });
    const updateMutation = useMutation((edit: member) => patchInfos(edit));

    const handleUpdate = (member: member) => {
        if (member.nickname && member.bio !== '') {
            updateMutation.mutate(member);
            location.reload();
        } else setvalidation('nopass');
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

    const FileonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUpimage(file);
        }
    };

    const Filesubmit = async () => {
        if (!upimage) {
            console.error('이미지 파일을 선택해주세요.');
            return;
        }

        const formData = new FormData();
        formData.append('multipartFile', upimage);

        try {
            const response = await axios.patch(`${API_URL}/members/image/${memberId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `${decodeURIComponent(authorizationToken)}`,
                    Refresh: `${refreshToken}`,
                    withCredentials: true,
                },
            });
            console.log('수정됨', response.data);
            location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const profileurl = `https://splashzone-upload.s3.ap-northeast-2.amazonaws.com/${data.profileImageUrl}`;

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Background>
                <div style={{ background: 'rgb(105,229,255)', width: '100%', height: '200px' }}>
                    <GridSystem>
                        <div
                            style={{
                                display: 'flex',
                                gap: '40px',
                                gridColumn: '2/3',
                                width: '1500px',
                                height: '900px',
                                background: 'rgb(231, 231, 231)',
                                padding: '20px',
                                marginTop: '30px',
                                borderRadius: '20px',
                            }}
                        >
                            <Block width="500px" height="800px">
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img
                                        src={profileurl}
                                        style={{ width: '100px', height: '100px', borderRadius: '50px' }}
                                    ></img>

                                    <FileInputContainer>
                                        <FileInputLabel htmlFor="file">프로필 이미지 선택</FileInputLabel>
                                        <FileInput id="file" type="file" name="file" onChange={FileonChange} />
                                    </FileInputContainer>
                                    <StyledButton type="button" onClick={Filesubmit}>
                                        프로필 이미지 수정
                                    </StyledButton>

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
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                                            <p>자기소개</p>
                                            {edit ? (
                                                <Styledtextarea
                                                    value={member.bio}
                                                    onChange={(e: any) => {
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
                                    {validation === 'nopass' && (
                                        <div style={{ color: 'red' }}>내용을 입력해주세요!</div>
                                    )}
                                    <div style={{ display: 'flex', gap: '10px' }}>
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
                                        <Styledbutton>탈퇴</Styledbutton>
                                    </div>
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
    height: 100%;
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
    margin-top: 10px;

    background-color: #3884d5;
    color: white;
    cursor: pointer;
`;

const FileInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const FileInput = styled.input`
    display: none;
`;

const FileInputLabel = styled.label`
    cursor: pointer;
    padding: 10px 20px;
    background-color: #f2f2f2;
    border-radius: 5px;
    font-weight: bold;
    color: #333;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #ddd;
    }
`;

const StyledButton = styled.button`
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #45a049;
    }
`;
