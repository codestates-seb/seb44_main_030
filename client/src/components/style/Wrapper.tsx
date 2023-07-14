import { memo } from 'react';
import styled from 'styled-components';
// width
// height

interface WrapperProps {
    width?: string;
    height?: string;
    children?: React.ReactNode;
    color?: any;
}

const StyledBlock = styled.div<WrapperProps>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.4);
    background-color: ${(props) => props.color || 'white'};
    padding: 10px;
    margin-top: 20px;
    position: relative;
`;

const Block = ({ width, height, children, color }: WrapperProps) => {
    return (
        <StyledBlock width={width} height={height} color={color}>
            {children}
        </StyledBlock>
    );
};

export default memo(Block);
