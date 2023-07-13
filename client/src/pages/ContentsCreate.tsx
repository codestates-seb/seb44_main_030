import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Mocktags } from '../assets/mockdata.ts';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { type } from 'os';
import { motion } from 'framer-motion';

type FormData = {
    recuruitingNumber: string;
    contactRoute: string;
    contact: string;
    clubTag: string;
    closeDay: string;
    title: string;
    content: string;
  };

const CommunityCreate = () => {
    const location = useLocation();
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
        date.getDate(),
    ).padStart(2, '0')}`;

    return (
        <CreateFormContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                {location.state === 'club' ? (
                    <DetailInfoContainer>
                        <DetailInfoTitle>모임의 기본 정보를 입력해주세요</DetailInfoTitle>
                        <TagContainer>
                            <TagWarp>
                                <TagCartegory htmlFor="recuruitingNumber">모집인원</TagCartegory>
                                <select {...register('recuruitingNumber')} id="recuruitingNumber">
                                    <option value="">선택</option>
                                    {['1명', '2명', '3명', '4명', '5명 이상'].map((item, idx) => (
                                        <option key={idx} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </TagWarp>
                            <TagWarp>
                                <TagCartegory htmlFor="contactRoute">연락 방법</TagCartegory>
                                <select {...register('contactRoute')} id="contactRoute">
                                    {['카카오톡', '이메일', '구글폼'].map((routeName, idx) => (
                                        <option key={idx} value={routeName}>
                                            {routeName}
                                        </option>
                                    ))}
                                </select>
                                <input {...register('contact')} type="text" />
                            </TagWarp>
                            <TagWarp>
                                <TagCartegory htmlFor="clubTag">모집 활동</TagCartegory>
                                <select {...register('clubTag')} id="clubTag">
                                    {Mocktags.map((tagName, idx) => (
                                        <option key={idx} value={tagName}>
                                            {tagName}
                                        </option>
                                    ))}
                                </select>
                            </TagWarp>
                            <TagWarp>
                                {/* 달력 드롭다운 : react-calendar*/}
                                <TagCartegory htmlFor="closeDay">모집 마감일</TagCartegory>
                                <input
                                    {...register('closeDay')}
                                    id="closeDay"
                                    type="text"
                                    onClick={() => setShowCalendar(!showCalendar)}
                                    value={formattedDate}
                                    readOnly
                                />
                                {showCalendar && (
                                    <CalendarContainer>
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
                                    </CalendarContainer>
                                )}
                            </TagWarp>
                        </TagContainer>
                    </DetailInfoContainer>
                ) : (
                    <></>
                )}
                <DetailContentContainer>
                    {location.state === 'club' ? (
                        <TitleText>모임에 대해서 소개해주세요!</TitleText>
                    ) : (
                        <>
                            <TitleText>모두가 당신의 이야기를 듣고 싶어합니다!</TitleText>
                            <TagWarp>
                                <TagCartegory htmlFor="communityTag">카테고리</TagCartegory>
                                <select {...register('clubTag')} id="clubTag">
                                    {Mocktags.map((tagName, idx) => (
                                        <option key={idx} value={tagName}>
                                            {tagName}
                                        </option>
                                    ))}
                                </select>
                            </TagWarp>
                        </>
                    )}
                    <Title>
                        <Input
                            placeholder="글 제목을 입력해주세요"
                            {...register('title', {
                                required: '제목을 입력해주세요',
                                minLength: { value: 5, message: '5자 이상 입력해주세요' },
                                maxLength: { value: 20, message: '20자 이내로 입력해주세요' },
                            })}
                        />
                        {errors.title && <ErrorMessage>{errors?.title.message}</ErrorMessage>}
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
                        {errors.title && <ErrorMessage>{errors?.content.message}</ErrorMessage>}
                    </Content>
                    <ButtonWarp>
                        <button>취소</button>
                        <button type="submit">글 등록</button>
                    </ButtonWarp>
                </DetailContentContainer>
            </FormContainer>
        </CreateFormContainer>
    );
};

export default CommunityCreate;

const CreateFormContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
`;
const DetailInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const DetailInfoTitle = styled.div`
    font-family: 'TTWanjudaedunsancheB', sans-serif;
    font-size: 1.8rem;
    color: rgba(56, 132, 213, 1);
    padding: 20px 0 20px 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const DetailContentContainer = styled.div``;
const FormContainer = styled.form``;

const TitleText = styled.div`
    font-family: 'TTWanjudaedunsancheB', sans-serif;
    font-size: 1.8rem;
    color: rgba(56, 132, 213, 1);
    padding: 20px 0 20px 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const TagWarp = styled.div`
    display: flex;
    align-items: center;
    padding: 30px 20px 30px 20px;

    > select {
        padding: 7px;
        background-color: white;
        border: 1px solid rgba(0, 0, 0, 0.1);
        outline: none;
        border-radius: 7px;
        resize: none;
        box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
        margin-bottom: 1px;
    }
    > input {
        padding: 8px;
        background-color: white;
        border: 1px solid rgba(0, 0, 0, 0.1);
        outline: none;
        border-radius: 7px;
        resize: none;
        box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
        margin: 0 0 1px 10px;
    }
`;
const TagContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;
const TagCartegory = styled.label`
    font-family: 'TTWanjudaedunsancheB', sans-serif;
    font-size: 1.6rem;
    margin-right: 20px;
`;
const Title = styled.div`
    max-width: 1200px;
    height: 60px;
    border-radius: 15px;
    border: none;
    box-sizing: border-box;
    background: #fff;
    margin: 20px 0 10px 0;
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
    border-radius: 15px;
    resize: none;
`;
const TextArea = styled.textarea`
    box-sizing: border-box;
    width: 1200px;
    height: 600px;
    border: none;
    padding: 20px;
    outline: none;
    border-radius: 15px;
    resize: none;
`;
const ButtonWarp = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 20px 0 50px;

    > button {
        padding: 10px 20px 10px 20px;
        margin-left: 20px;
        border-radius: 15px;
        outline: none;
        background-color: rgba(56, 132, 213, 1);
        border: 2px solid white;
        color: white;
        font-size: 1.1rem;
        cursor: pointer;

        :hover {
            background-color: rgba(172, 212, 255, 0.7); // 밝은 색으로 변경
        }
    }
`;

const CalendarContainer = styled.div`
    position: absolute;
    z-index: 1000;
    top: 35.5%;
    left: 51%;
`;
