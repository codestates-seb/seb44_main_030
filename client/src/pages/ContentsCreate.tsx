import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Mocktags } from '../assets/mockdata.ts';
import { useForm } from 'react-hook-form';

const CommunityCreate = () => {
    const location = useLocation();
    const { register: registerClub, handleSubmit: handleSubmitClub, watch: watchClub } = useForm();
    const { register: registerCommunity, handleSubmit: handleSubmitCommunity } = useForm();
    const onSubmitClub = (data) => console.log(data);
    const onSubmitCommunity = (data) => console.log(data);

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
            <FormContainer></FormContainer>
        </CreateFormContainer>
    );
};
export default CommunityCreate;

const CreateFormContainer = styled.div``;
const DetailInfoContainer = styled.div``;
const FormContainer = styled.div``;
