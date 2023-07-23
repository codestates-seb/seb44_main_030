import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { reset } from '../store/editData.ts';
import { useDispatch } from 'react-redux';
import { RootState } from '../store/store.tsx';
import axios, { AxiosError } from 'axios';
import ConfirmModal from '../components/common/ConfirmModal.tsx';
// import ReactQuill from 'react-quill';

import { usePostHeader } from '../api/getHeader.ts';
type FormData = {
    title: string;
    tag: string;
    content: string;
};

const CommunityCreate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { postId, tag, title, content } = useSelector((state: RootState) => state.editData);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dispatch = useDispatch();
    const headers = usePostHeader();

    // 모달 창 닫기
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const {
        register,
        handleSubmit,
        // control,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            title,
            content,
            tag: tag || '전체',
        },
        mode: 'onBlur',
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

    const onSubmit = async (data: FormData) => {
        const API_URL = import.meta.env.VITE_KEY;
        const englishTagName = getKeyByValue(tags, data.tag);
        const postPayload = {
            memberId: 3, // 이 부분은 로그인한 유저의 ID로 수정
            title: data.title,
            content: data.content,
            tags: [{ tagName: englishTagName }],
        };
        const patchPayload = {
            title: data.title,
            content: data.content,
            // tag: englishTagName,
        };

        if (location.state === 'EditMode') {
            try {
                const response = await axios.patch(`${API_URL}/standards/${postId}`, patchPayload, headers);
                if (response.status === 200 || response.status === 201) {
                    navigate(-1); // patch 요청 성공 시 이전 페이지로 이동
                } else {
                    // 오류 처리
                    console.log('수정 요청을 실패했습니다');
                }
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    console.log('Axios Error occurred while creating the patch', (error as AxiosError).response?.data);
                } else {
                    console.log('Error occurred while creating the patch', error);
                }
            }
            console.log(patchPayload);
        } else {
            try {
                const response = await axios.post(`${API_URL}/standards`, postPayload, headers);
                if (response.status === 200 || response.status === 201) {
                    navigate(-1); // post 요청 성공 시 이전 페이지로 이동
                } else {
                    // 오류 처리
                    console.log('글작성 요청을 실패했습니다');
                }
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    console.log('Axios Error occurred while creating the post', (error as AxiosError).response?.data);
                } else {
                    console.log('Error occurred while creating the post', error);
                }
            }
            console.log(postPayload);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    // const toolbarOptions = [
    //     [{ header: '1' }, { header: '2' }],
    //     [{ size: [] }],
    //     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    //     [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
    //     [
    //         {
    //             color: ['#000000', '#e60000', '#008a00', '#0066cc', '#9933ff'],
    //         },
    //         {
    //             background: ['#000000', '#e60000', '#008a00', '#0066cc', '#9933ff'],
    //         },
    //     ],
    // ];

    return (
        <CreateFormContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <DetailContentContainer>
                    <TitleText>모두가 당신의 이야기를 듣고 싶어합니다!</TitleText>
                    <TagWarp>
                        <TagCartegory htmlFor="communityTag">카테고리</TagCartegory>
                        <select {...register('tag')} id="tag">
                            {Object.values(tags).map((tagName, idx) => (
                                <option key={idx} value={tagName}>
                                    {tagName}
                                </option>
                            ))}
                        </select>
                    </TagWarp>
                    <Title>
                        <Input
                            placeholder="글 제목을 입력해주세요"
                            {...register('title', {
                                required: '제목을 입력해주세요',
                                minLength: { value: 5, message: '5자 이상 입력해주세요' },
                                maxLength: { value: 20, message: '40자 이내로 입력해주세요' },
                            })}
                        />
                        {errors.title && <ErrorMessage>{errors?.title.message}</ErrorMessage>}
                    </Title>
                    <Content>
                        <TextArea
                            placeholder="모임에 대해 소개해주세요!"
                            {...register('content', {
                                required: '내용을 입력해주세요',
                                minLength: { value: 10, message: '10자 이상 입력해주세요' },
                                maxLength: { value: 500, message: '500자 이내로 입력해주세요' },
                            })}
                        />
                        {errors.content && <ErrorMessage>{errors?.content.message}</ErrorMessage>}
                        {/* <Controller
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
                        /> */}
                        {errors.content && <ErrorMessage>{errors?.content?.message}</ErrorMessage>}
                    </Content>
                    <ButtonWarp>
                        <button onClick={() => setIsModalOpen(true)}>취소</button>
                        {isModalOpen && (
                            <ConfirmModal
                                handleCloseModal={handleCloseModal}
                                handleConfirm={handleCancel}
                                text="정말 취소할까요?"
                            />
                        )}
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
    &:focus {
        outline: solid 3px #3884d5;
    }
`;

// const StyledReactQuill = styled(ReactQuill)`
//     box-sizing: border-box;
//     max-width: 100%;
//     height: auto;
//     border: none;
//     outline: none;
//     background-color: #fff;
//     border-radius: 15px;
//     box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.15);

//     .ql-toolbar {
//         border-top-left-radius: 15px;
//         border-top-right-radius: 15px;
//         background-color: #f5f5f5;
//         border: none;
//         border-bottom: 1px solid rgba(0, 0, 0, 0.1);

//         .ql-picker-label,
//         .ql-picker-options {
//             font-size: 18px;
//         }

//         .ql-picker-options {
//             background-color: #f5f5f5;
//             border: none;
//             padding: 5px;
//         }
//     }

//     .ql-container {
//         border-bottom-left-radius: 15px;
//         border-bottom-right-radius: 15px;
//         background-color: #fff;
//         border: none;
//         border-top: none;
//         box-shadow: none;

//         .ql-editor {
//             min-width: 1200px;
//             min-height: 600px;
//             padding: 20px;
//             font-size: 30px;
//         }
//     }
// `;

const TextArea = styled.textarea`
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
