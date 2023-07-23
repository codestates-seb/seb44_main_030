import { Key, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import backgroundImg from '../assets/Community_background.png';
import ViewIcon from '../assets/View.svg';
import CommentIcon from '../assets/Comment.svg';
import { useClubBoardDetail } from '../api/ClubApi/ClubDataHooks.ts';
import axios from 'axios';
import DetailCommentSection from '../components/DetailCommentSection.tsx';
import { useMutation } from '@tanstack/react-query';
import { usePostHeader } from '../api/getHeader.ts';
import ClubMapContainer from '../components/clubMap.tsx';

interface BackgroundProps {
    $image: string;
}

export interface CommentInput {
    Content: string;
}

const ClubDetail = () => {
    const headers = usePostHeader();
    const { boardClubId } = useParams<{ boardClubId: string }>();
    const numberBoardClubId = boardClubId ? Number(boardClubId) : 0;
    const { data: clubDetail } = useClubBoardDetail(numberBoardClubId);

    let //
        // boardClubStatus,
        contact,
        content,
        capacity,
        // createdAt,
        dueDate,
        memberId,
        // modifiedAt,
        tags,
        title,
        view,
        addressName,
        placeName,
        latitude,
        // likeCount,
        longitude,
        nickname;

    if (clubDetail && clubDetail.data) {
        ({
            // boardClubStatus,
            contact,
            content,
            capacity,
            // createdAt,
            dueDate,
            memberId,
            // modifiedAt,
            tags,
            title,
            view,
            addressName,
            placeName,
            latitude,
            // likeCount,
            longitude,
            nickname,
        } = clubDetail.data);
    }
    console.log(clubDetail);

    const navigate = useNavigate();

    //standardId 이용해서 API 요청
    const hanldeNavigatePrev = useCallback(() => {
        navigate(-1);
        //이동했을 때, 이전 페이지 상태(스크롤위치, 페이지번호, 태그상태)를 유지해야한다.
        //router기능 이용하거나, redux에 저장해서 구현할 것.
    }, [navigate]);
    const handleNavigateProfile = useCallback(() => {
        navigate(`/mypage`, { state: memberId });
    }, [memberId, navigate]);
    const handleEdit = useCallback(() => {
        navigate(`/club/create/${boardClubId}`, { state: { clubDetail: clubDetail.data } });
    }, [clubDetail, boardClubId]);

    const mutation = useMutation(
        (boardClubId: number) => axios.delete(`${import.meta.env.VITE_KEY}/clubs/${boardClubId}`, headers),
        {
            onSuccess: () => {
                alert('게시글이 성공적으로 삭제되었습니다.');
                navigate(-1);
            },
            onError: () => {
                alert('게시글 삭제에 실패했습니다.');
            },
        },
    );

    const handleDelete = useCallback(() => {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            mutation.mutate(Number(boardClubId));
        }
    }, [mutation, boardClubId]);

    const handleNavigateContact = useCallback(() => {
        window.open(contact, '_blank');
    }, [contact]);

    const mapdata = {
        addressName,
        placeName,
        latitude,
        longitude,
    };
    // console.log(mapdata);

    if (clubDetail === undefined || mapdata === undefined) return null;

    return (
        <Background $image={backgroundImg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <PostContainer>
                <TitleSection>
                    <button onClick={hanldeNavigatePrev}>목록</button>
                    <Title>
                        <h1>{title}</h1>
                    </Title>
                    <ContentInfo>
                        <div>
                            <h3>관련 태그: </h3>
                            {tags &&
                                tags.map(
                                    (
                                        tag: {
                                            tagName: string | undefined | null;
                                        },
                                        idx: Key | null | undefined,
                                    ) => (
                                        <span key={idx} className="tag">
                                            {tag.tagName}
                                        </span>
                                    ),
                                )}
                        </div>
                        <div>
                            <h3>모집 인원: </h3>
                            <span>{capacity} 명</span>
                        </div>
                        <div>
                            <h3>모집 마감일: </h3>
                            <span>{dueDate}</span>
                        </div>
                        <div>
                            <h3>연락 방법: </h3>
                            <span onClick={handleNavigateContact}>링크</span>
                        </div>
                        <UserInfo onClick={handleNavigateProfile}>{nickname}</UserInfo>
                    </ContentInfo>
                </TitleSection>
                <ClubMapContainer mapdata={mapdata} />
                <ContentSection>
                    <h1>내용</h1>
                    <p dangerouslySetInnerHTML={{ __html: content }} />
                    <div>
                        <EditContainer>
                            <button onClick={handleEdit}>수정</button>
                            <button onClick={handleDelete}>삭제</button>
                        </EditContainer>
                        <div>
                            <img src={ViewIcon} alt="ViewCount" />
                            {view}
                        </div>
                        <div>
                            <img src={CommentIcon} alt="CommentCount" />
                            {/* {commentCount} */}
                        </div>
                    </div>
                </ContentSection>
                <DetailCommentSection boardStandardClubId={Number(boardClubId)} />
            </PostContainer>
        </Background>
    );
};

export default ClubDetail;

const Background = styled(motion.div)<BackgroundProps>`
    * {
        box-sizing: border-box;
    }
    background-image: url(${(props) => props.$image});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const PostContainer = styled.div`
    width: 1200px;
    border-radius: 15px;
    border: none;
    box-sizing: border-box;
    background: #fff;
    margin: 60px 0 60px 0;
    padding: 80px 120px 80px 120px;
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.25);
`;
const TitleSection = styled.section`
    margin-bottom: 19px;

    > button {
        font-weight: 600;
        color: #696969;
        background: none;
        border: none;
        cursor: pointer;
        &:hover {
            color: #3884d5;
        }
    }
    > h1 {
        font-size: 35px;
    }
    img {
        width: 17px;
        height: 17px;
        border-radius: 3px;
        margin: 0 2px 0 20px;
    }
    > div {
        display: flex;
        align-items: center;

        > span {
            font-size: 20px;
            font-weight: 600;
        }
        > div {
            display: flex;
            align-items: center;
            > span.date {
                color: #696969;
                font-size: 14px;
            }
            > span.tag {
                font-size: 13px;
                background-color: #3884d5;
                color: #ffffff;
                padding: 3px 5px 3px 5px;
                border-radius: 20px;
                list-style: none;
                white-space: nowrap;
                margin: 0px 0px 0px 5px;
            }
            > span.name {
                font-weight: 600;
                &:hover {
                    color: #3884d5;
                    cursor: pointer;
                }
            }
        }
    }
    border-bottom: 1px solid #d9d9d9;
`;

const Title = styled.div`
    h1 {
        font-size: 35px;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ContentInfo = styled.div`
    display: grid;
    grid-template-columns: 1fr; // column은 하나
    grid-template-rows: 1fr; // row도 하나
    align-items: start;
    justify-content: start;
    font-size: 13px;
    gap: 20px;
    > div {
        > h3 {
            margin-right: 5px;
        }
    }
`;

const ContentSection = styled.section`
    > h1 {
        font-size: 20px;
        font-weight: 600;
    }
    > div {
        display: flex;
        align-items: center;
        justify-content: end;
        margin-right: 10px;
        > div {
            margin: 0 5px 0 5px;
            display: flex;
            align-items: center;
            > button {
                display: flex;
                align-items: center;
            }
            img {
                margin-right: 3px;
            }
            color: #696969;
            font-size: 14px;
        }
    }
    > p {
        line-height: 25px;
    }
    padding-bottom: 15px;
    border-bottom: 1px solid #d9d9d9;
`;
const EditContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    > button {
        font-weight: 600;

        background: none;
        border: none;
        color: #696969;
        padding: 0 5px 0 0;
        &:hover {
            color: #3884d5;
            cursor: pointer;
        }
    }
`;

const UserInfo = styled.div`
    font-weight: bold;
    margin-left: 250px;
`;
