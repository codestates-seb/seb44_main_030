import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion } from 'framer-motion';
import { reset } from '../store/editData.ts';
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosError } from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Map from './Map.tsx';
import ConfirmModal from '../components/common/ConfirmModal';
import { useCookies } from 'react-cookie';
import { usePostHeader } from '../api/getHeader.ts';
type Position = {
    lat: number;
    lng: number;
};

type ClubMapData = {
    addressName: string;
    id: number;
    placeName: string;
    position: Position;
};

type FormData = {
    capacity: number;
    contactRoute: string;
    contact: string;
    clubTag: string;
    dueDate: string;
    title: string;
    content: string;
    clubMap?: ClubMapData;
    date?: Date;
};

const ClubCreate = () => {
    const headers = usePostHeader();
    const location = useLocation();
    const clubDetail = location.state?.clubDetail || {};
    const navigate = useNavigate();
    const [showMap, setShowMap] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [clubMap, setClubMap] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    const updateClubMap = (data: any) => {
        setClubMap(data);
    };

    const {
        register,
        setValue,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            title: clubDetail.title || '',
            content: clubDetail.content || '',
            contact: clubDetail.contact || '',
            dueDate: clubDetail.dueDate || '',
        },
        mode: 'onChange',
    });

    const tags = {
        SWIMMING: '수영',
        SURFING: '서핑',
        SNORKELING: '스노쿨링',
        SCUBA_DIVING: '스쿠버 다이빙',
        WATER_SKIING: '수상스키',
        JET_SKIING: '제트스키',
        WINDSURFING: '윈드서핑',
        KITESURFING: '카이트서핑',
        FLYBOARDING: '플라이보드',
        PARASAILING: '패러세일링',
        PADDLING: '패들보드',
        KAYAKING: '카약',
    };

    const getKeyByValue = (object: any, value: string) => {
        return Object.keys(object).find((key) => object[key] === value);
    };

    const onSubmit = useCallback(async (data: FormData, event) => {
        console.log(data);
        const API_URL = import.meta.env.VITE_KEY;
        const englishTagName = getKeyByValue(tags, data.clubTag);
        const { id, ...clubMapWithoutId } = data.clubMap;
        const payload = {
            memberId: 1, // 이 부분은 로그인한 유저의 ID로 수정
            capacity: data.capacity,
            title: data.title,
            content: data.content,
            dueDate: data.dueDate,
            contact: data.contact, //{ [data.contactRoute]: data.contact },
            tags: [{ tagName: englishTagName }],
            clubMap: clubMapWithoutId,
        };

        try {
            let response;
            if (clubDetail.boardClubId !== undefined) {
                response = await axios.patch(`${API_URL}/clubs/${clubDetail.boardClubId}`, payload, headers);
            } else {
                response = await axios.post(`${API_URL}/clubs`, payload, headers);
            }
            if (response.status === 200 || response.status === 201) {
                navigate(-1);
            } else {
                console.log('포스트 요청을 실패했습니다');
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.log('Axios Error occurred while creating the post', (error as AxiosError).response?.data);
            } else {
                console.log('Error occurred while creating the post', error);
            }
        }
    }, []);

    const handleFormKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const formattedDate = date.toLocaleDateString('en-CA');

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(reset());
    }, []);

    const calendarRef = useRef(null);
    const [today, setToday] = useState(new Date());
    const handleClickCalendarOutside = (event: MouseEvent) => {
        if (calendarRef.current && !(calendarRef.current as Node).contains(event.target as Node)) {
            setShowCalendar(false);
        }
    };
    useEffect(() => {
        window.addEventListener('mousedown', handleClickCalendarOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickCalendarOutside);
        };
    }, []);
    useEffect(() => {
        setToday(new Date());
    }, []);

    const toolbarOptions = [
        [{ header: '1' }, { header: '2' }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
        [
            {
                color: ['#000000', '#e60000', '#008a00', '#0066cc', '#9933ff'],
            },
            {
                background: ['#000000', '#e60000', '#008a00', '#0066cc', '#9933ff'],
            },
        ],
    ];

    useEffect(() => {
        setValue('clubMap', clubMap);
    }, [clubMap, setValue]);

    useEffect(() => {
        const keyDownHandler = (event) => {
            console.log(event);
        };

        window.addEventListener('keydown', keyDownHandler);
        return () => {
            window.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    return (
        <CreateFormContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FormContainer onSubmit={handleSubmit(onSubmit)} onKeyPress={handleFormKeyPress}>
                <DetailInfoContainer>
                    <DetailInfoTitle>모임의 기본 정보를 입력해주세요</DetailInfoTitle>
                    <TagContainer>
                        <TagWarp>
                            <TagCartegory htmlFor="capacity">모집인원</TagCartegory>
                            <input {...register('capacity')} id="capacity" placeholder="숫자를 입력해주세요"></input>
                        </TagWarp>
                        <TagWarp>
                            <TagCartegory htmlFor="contactRoute">연락 방법</TagCartegory>
                            <select {...register('contactRoute')} id="contactRoute">
                                {['오픈채팅', '구글 폼'].map((routeName, idx) => (
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
                                {Object.values(tags).map((tagName, idx) => (
                                    <option key={idx} value={tagName}>
                                        {tagName}
                                    </option>
                                ))}
                            </select>
                        </TagWarp>
                        <TagWarp>
                            {/* 달력 드롭다운 : react-calendar*/}
                            <TagCartegory htmlFor="dueDate">모집 마감일</TagCartegory>
                            <input
                                {...register('dueDate')}
                                id="dueDate"
                                type="text"
                                onClick={() => setShowCalendar(!showCalendar)}
                                value={formattedDate}
                                readOnly
                            />
                            {showCalendar && (
                                <CalendarContainer ref={calendarRef}>
                                    <Controller
                                        control={control}
                                        name="date"
                                        render={({ field }) => (
                                            <Calendar
                                                minDate={today}
                                                onChange={(selectedDate) => {
                                                    const selectedDateValue = selectedDate as Date;
                                                    setDate(selectedDateValue);
                                                    const formattedDate = selectedDateValue.toLocaleDateString('en-CA');
                                                    setValue('dueDate', formattedDate);
                                                    setShowCalendar(false);
                                                    field.onChange(selectedDateValue);
                                                }}
                                                value={date || undefined}
                                            />
                                        )}
                                    />
                                </CalendarContainer>
                            )}
                        </TagWarp>
                        <TagWarp>
                            <TagCartegory>모임 위치</TagCartegory>
                            <Controller
                                name="clubMap"
                                control={control}
                                defaultValue={clubMap}
                                render={({ field }) => (
                                    <StyledButton {...field} onClick={() => setShowMap(!showMap)}>
                                        위치 검색
                                    </StyledButton>
                                )}
                            />
                            {clubMap && <MapPlace>{clubMap.placeName}</MapPlace>}
                            {showMap ? <Map setShowMap={setShowMap} updateClubMap={updateClubMap} /> : null}
                        </TagWarp>
                    </TagContainer>
                </DetailInfoContainer>
                <DetailContentContainer>
                    <TitleText>모임에 대해서 소개해주세요!</TitleText>
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
                        {/* <TextArea
                            placeholder="모임에 대해 소개해주세요!"
                            {...register('content', {
                                required: '내용을 입력해주세요',
                                minLength: { value: 30, message: '30자 이상 입력해주세요' },
                                maxLength: { value: 500, message: '500자 이내로 입력해주세요' },
                            })}
                        /> */}
                        <Controller
                            name="content"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: '내용을 입력해주세요',
                                minLength: { value: 30, message: '30자 이상 입력해주세요' },
                                maxLength: { value: 500, message: '500자 이내로 입력해주세요' },
                            }}
                            render={({ field }) => (
                                <StyledReactQuill {...field} modules={{ toolbar: toolbarOptions }} />
                            )}
                        />
                        {errors.title && <ErrorMessage>{errors?.content?.message}</ErrorMessage>}
                    </Content>
                    <ButtonWarp>
                        <button
                            onClick={() => {
                                setIsModalOpen(true);
                            }}
                        >
                            취소
                        </button>
                        {isModalOpen && (
                            <ConfirmModal
                                handleCloseModal={handleCloseModal}
                                handleConfirm={handleCancel}
                                text="작성을 취소 하시겠습니까?"
                            />
                        )}
                        <button type="submit">글 등록</button>
                    </ButtonWarp>
                </DetailContentContainer>
            </FormContainer>
        </CreateFormContainer>
    );
};

export default ClubCreate;

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

const StyledButton = styled.button`
    padding: 8px 15px 8px 15px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    outline: none;
    border-radius: 7px;
    resize: none;
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
    margin: 0 0 1px 3px;

    &:hover {
        cursor: pointer;
    }
`;

const MapPlace = styled.span`
    padding: 8px 15px 8px 15px;
    background-color: rgba(56, 132, 213, 1);
    color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    outline: none;
    border-radius: 7px;
    resize: none;
    font-size: 14px;
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
    margin: 0 0 1px 10px;
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
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.2);
`;
const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1200px;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border: none;
    padding: 20px;
    outline: none;
    border-radius: 15px;
    resize: none;
    &:focus {
        outline: solid 4px #3884d5;
    }
`;

const StyledReactQuill = styled(ReactQuill)`
    box-sizing: border-box;
    max-width: 100%;
    height: auto;
    border: none;
    outline: none;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.15);

    .ql-toolbar {
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        background-color: #f5f5f5;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        .ql-picker-label,
        .ql-picker-options {
            font-size: 18px;
        }

        .ql-picker-options {
            background-color: #f5f5f5;
            border: none;
            padding: 5px;
        }
    }

    .ql-container {
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        background-color: #fff;
        border: none;
        border-top: none;
        box-shadow: none;

        .ql-editor {
            min-width: 1200px;
            min-height: 600px;
            padding: 20px;
            font-size: 30px;
        }
    }
`;
const TextArea = styled.textarea`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    width: 1200px;
    height: 600px;
    border: none;
    padding: 20px;
    outline: none;
    border-radius: 15px;
    resize: none;
    &:focus {
        outline: solid 3px #3884d5;
    }
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
