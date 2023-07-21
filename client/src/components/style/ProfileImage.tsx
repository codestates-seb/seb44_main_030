import styled from 'styled-components';
import { memo } from 'react';
//width
//height
//url

interface ProfileProps {
    width: string;
    height: string;
    url: string;
    onClick?: () => void;
}
const StyledProfile = styled.div<ProfileProps>`
    background-image: url(${(props) => props.url});
    background-size: cover;
    height: ${(props) => props.height};
    width: ${(props) => props.width};
    border-radius: 50px;
    z-index: 200;
    border: 1px solid rgba(0, 0, 0, 0.3);
`;

const Profile = ({ width, height, url, onClick }: ProfileProps) => {
    return <StyledProfile width={width} height={height} url={url} onClick={onClick} />;
};

export default memo(Profile);
