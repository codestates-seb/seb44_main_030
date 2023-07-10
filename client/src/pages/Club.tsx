import styled from 'styled-components';
import { Link } from 'react-scroll';
import ClubCard from '../components/common/ContentsCard';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import back from '../../public/grouping 1.png';
import ScrollBanner from '../components/common/ScrollBanner';
import { ClubDummyData, Mocktags } from '../../public/clubMockdata.ts';
import ContentsCard from '../components/common/ContentsCard';
import Tag from '../components/common/Tag.tsx';

function Club() {
    const navigate = useNavigate();
    const [currTag, setCurrTag] = useState<string>(Mocktags[0]);
    const handleTagSelect = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
        setCurrTag(e.currentTarget.innerText);
    }, []);

    return (
        <ClubWarp>
            <ScrollBanner bannerImg={back} />
            <ContentContainer>
                <TagSection>
                    <TagTab>
                        <span>카테고리</span>
                        <span onClick={() => navigate(`/club/post`)}>글 쓰기</span>
                    </TagTab>
                    <Tags>
                        {Mocktags.map((tagName, idx) => (
                            <Tag key={idx} tag={tagName} $isSelected={currTag === tagName} onClick={handleTagSelect} />
                        ))}
                    </Tags>
                </TagSection>
                <CardSection>
                    {ClubDummyData.map((data) => {
                        return <ContentsCard key={data.boardClubId} clubProps={data} />;
                    })}
                </CardSection>
            </ContentContainer>
        </ClubWarp>
    );
}

export default Club;

const ClubWarp = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    width: 100%;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1280px;
    margin: 2rem auto;
    margin-bottom: 7rem;
    padding-top: 5vh;
`;

const TagSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 50%;
    margin: 0 auto;
    margin-bottom: 5rem;
    padding: 2rem;
`;

const TagTab = styled.div`
    display: flex;
    justify-content: space-between;
    font-family: 'TTWanjudaedunsancheB', sans-serif;
    font-size: 2.5rem;
    font-weight: bold;
    padding: 2rem;
`;

const Tags = styled.div`
    width: 600px;
    height: 130px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 5px 0 5px 0;
    align-items: center;
    border-radius: 15px;
    // border: 1px solid #696969;
    background: #fff;
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.25);
`;

const CardSection = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 420px);
    grid-auto-rows: 330px;
    flex-grow: 1;
    width: 100%;
    height: 50%;
    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;
