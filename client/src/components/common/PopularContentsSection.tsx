import React, { useEffect } from 'react';
import styled from 'styled-components';
import ContentsCard from './ContentsCard.tsx';
import { CommunityPopularMockdata } from '../../assets/mockdata.ts';

export default function PopularContentsSection() {
    return (
        <TopSection className="data-scroll">
            <h2>인기게시물</h2>
            <PopularPostContainer>
                {CommunityPopularMockdata.map((item) => (
                    <ContentsCard key={`popular_${item.standardId}`} communityProps={item} type={'community'} />
                ))}
            </PopularPostContainer>
        </TopSection>
    );
}

const TopSection = styled.section`
    width: 100%;
    height: 507px;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
`;

const PopularPostContainer = styled.ul`
    display: flex;
    justify-content: center;
    padding: 0;
    flex-wrap: wrap;
    > li {
        margin: 0 20px 20px 20px;
    }
`;
