import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Mocktags } from '../assets/mockdata.ts';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CommunityCreate = () => {
    const location = useLocation();
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: string) => {
        console.log(data);
    };

    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
        date.getDate(),
    ).padStart(2, '0')}`;

    return (
        <CreateFormContainer>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <DetailInfoContainer>
                    {location.state === 'club' ? (
                        <>
                            <div>
                                <label htmlFor="recuruitingNumber">모집인원</label>
                                <select {...register('recuruitingNumber')} id="recuruitingNumber">
                                    <option value="">선택</option>
                                    {['1명', '2명', '3명', '4명', '5명 이상'].map((item, idx) => (
                                        <option key={idx} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="meetingDay">모임 일자</label>
                                {/* 직접입력 */}
                                <input
                                    {...register('meetingDay')}
                                    id="meetingDayInput"
                                    placeholder="모임 일자를 입력합니다."
                                />
                                {/* 달력 드롭다운: react-calendar */}
                                {/* <input
                                    {...register('meetingDay')}
                                    id="meetingDayCalendar"
                                    placeholder="캘린더가 떠야합니다"
                                /> */}
                            </div>
                            <div>
                                <label htmlFor="contactRoute">연락 방법</label>
                                <select {...register('contactRoute')} id="contactRoute">
                                    {['카카오톡', '이메일', '구글폼'].map((routeName, idx) => (
                                        <option key={idx} value={routeName}>
                                            {routeName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                {/* 달력 드롭다운 : react-calendar*/}
                                <label htmlFor="closeDay">모집 마감일</label>
                                <input
                                    {...register('closeDay')}
                                    id="closeDay"
                                    type="text"
                                    onClick={() => setShowCalendar(!showCalendar)}
                                    value={formattedDate}
                                    readOnly
                                />
                                {showCalendar && (
                                    <Controller
                                        control={control}
                                        name="date"
                                        render={({ field }) => (
                                            <Calendar
                                                onChange={(date) => {
                                                    setDate(date);
                                                    setShowCalendar(false);
                                                    field.onChange(date);
                                                }}
                                                value={date}
                                            />
                                        )}
                                    />
                                )}
                            </div>
                            <div>
                                <label htmlFor="clubTag">모집 활동</label>
                                <select {...register('clubTag')} id="clubTag">
                                    {Mocktags.map((tagName, idx) => (
                                        <option key={idx} value={tagName}>
                                            {tagName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    ) : (
                        <>
                            <label htmlFor="communityTag">게시글 종류</label>
                            <input {...register('communityTag')} id="communityTag"></input>
                        </>
                    )}
                </DetailInfoContainer>
                <DetailContentContainer>
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
                        {errors.title && <ErrorMessage>{errors.content.message}</ErrorMessage>}
                    </Content>
                    <button>취소</button>
                    <button type="submit">글 등록</button>
                </DetailContentContainer>
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
const DetailContentContainer = styled.div``;
const FormContainer = styled.form``;
const Title = styled.div`
    max-width: 1200px;
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
const InputContainer = styled.div`
    position: relative;
    width: 100%;
`;
const ErrorMessage = styled.span`
    position: absolute;

    color: red;
    font-size: 12px;
`;

const Input = styled.input`
    width: 100%;
    border: none;
    padding: 20px;
    outline: none;
`;
const TextArea = styled.textarea`
    box-sizing: border-box;
    width: 1200px;
    height: 600px;
    border: none;
    padding: 20px;
    outline: none;
`;
