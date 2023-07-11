import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Mocktags } from '../assets/mockdata.ts';

const CommunityCreate = () => {
    const location = useLocation();
    const { register: registerClub, handleSubmit: handleSubmitClub, watch: watchClub } = useForm();
    const { register: registerCommunity, handleSubmit: handleSubmitCommunity } = useForm();
    const onSubmitClub = (data) => console.log(data);
    const onSubmitCommunity = (data) => console.log(data);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: string) => {
        console.log(data);
    };

    return (
        <CreateFormContainer>
            <DetailInfoContainer>
                {location.state === 'club' ? (
                    <form onSubmit={handleSubmitClub(onSubmitClub)}>
                        <div>
                            <label htmlFor="recuruitingNumber">모집인원</label>
                            <select {...registerClub('recuruitingNumber')} id="recuruitingNumber">
                                {['1명', '2명', '3명', '4명', '5명 이상'].map((tagName, idx) => (
                                    <option key={idx} value={tagName}>
                                        {tagName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="meetingDay">모임 일자</label>
                            {/* 직접입력 */}
                            <input
                                {...registerClub('meetingDay')}
                                id="meetingDayInput"
                                placeholder="모임 일자를 입력합니다."
                            />
                            {/* 달력 드롭다운: react-calendar */}
                            <input
                                {...registerClub('meetingDay')}
                                id="meetingDayCalendar"
                                placeholder="캘린더가 떠야합니다"
                            />
                        </div>
                        <div>
                            <label htmlFor="contactRoute">연락 방법</label>
                            <select {...registerClub('contactRoute')} id="contactRoute">
                                {['카카오톡', '이메일', '구글폼'].map((routeName, idx) => (
                                    <option key={idx} value={routeName}>
                                        {routeName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="closeDay">모집 마감일</label>
                            {/* 달력 드롭다운 : react-calendar*/}
                        </div>
                        <div>
                            <label htmlFor="clubTag">모집 활동</label>
                            <select {...registerClub('clubTag')} id="clubTag">
                                {Mocktags.map((tagName, idx) => (
                                    <option key={idx} value={tagName}>
                                        {tagName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSubmitCommunity(onSubmitCommunity)}>
                        <label htmlFor="communityTag">게시글 종류</label>
                        <input {...registerCommunity('communityTag')} id="communityTag"></input>
                    </form>
                )}
            </DetailInfoContainer>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <Title>
                    <Input
                        placeholder="글 제목을 입력해주세요"
                        {...register('title', {
                            required: '제목을 입력해주세요',
                            minLength: { value: 5, message: '5자 이상 입력해주세요' },
                            maxLength: { value: 20, message: '20자 이내로 입력해주세요' },
                        })}
                    />
                    {errors.title && <span>{errors.title.message}</span>}
                </Title>
                <Content>
                    <TextArea
                        placeholder="모임에 대해 소개해주세요!"
                        {...register('content', {
                            required: '내용을 입력해주세요',
                            minLength: { value: 30, message: '30자 이상 입력해주세요' },
                            maxLength: { value: 500, message: '500자 이내로 입력해주세요' },
                        })}
                    />
                    {errors.title && <span>{errors.content.message}</span>}
                </Content>
                <button>취소</button>
                <button type="submit">글 등록</button>
            </FormContainer>
        </CreateFormContainer>
    );
};

export default CommunityCreate;

const CreateFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const DetailInfoContainer = styled.div``;
const FormContainer = styled.form``;
const Title = styled.div`
    width: 1200px;
    height: 60px;
    border-radius: 15px;
    border: none;
    box-sizing: border-box;
    background: #fff;
    margin: 60px 0 10px 0;
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
`;
const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 1200px;
    min-height: 600px;
    border-radius: 15px;
    border: none;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.15);
`;
const Input = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    padding: 20px;
`;
const TextArea = styled.textarea`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: none;
    padding: 20px;
`;
