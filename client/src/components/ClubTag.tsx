import React from 'react';
import styled from 'styled-components';

interface ClubTagProps {
    $incard?: boolean;
    tag: string;
}

export default function ClubTag({ $incard = false, tag }) {
    return <TagWarp $incard={$incard}>{tag}</TagWarp>;
}

const TagWarp = styled.span<ClubTagProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #696969;
    border-radius: 1.6rem;
    min-width: 100px;
    min-height: 50px;
    font-family: 'KimjungchulGothic-Bold';
    font-size: 1.8rem;
    color: #696969;
    padding: 15px;

    ${({ $incard }) =>
        $incard &&
        `
            min-width: 40px;
            min-height: 20px;
            font-size: 1.1rem;
            margin: 5px
        `}
`;
