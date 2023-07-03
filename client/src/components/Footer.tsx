import styled from 'styled-components';
import LOGO2 from '../../public/LOGO2.png';

const Footer = () => {
    return (
        <StyledFooter>
            <div>
                <img src={LOGO2}></img>
            </div>
            <div>
                <div>INFORMATION</div>
                <div>ABOUT</div>
                <div>SUPPORT</div>
            </div>
            <StyledIntroduce>
                Site design / logo © 2023 Stack Exchange Inc; user contributions licensed under CC BY-SA. rev
                2023.6.29.43520
            </StyledIntroduce>
        </StyledFooter>
    );
};

export default Footer;

const StyledFooter = styled.footer`
    background-color: rgba(56, 132, 213, 1);
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    padding: 10px;
    width: 100%;
    height: 250px;
    color: white;
    font-size: 1.5rem;
    :nth-child(1) {
        grid-column: 2 / 5;
    }

    :nth-child(2) {
        display: flex;
        grid-column: 6/ 10;
        gap: 100px;
    }

    font-family: 'Bangers', cursive;
`;

const StyledIntroduce = styled.div`
    font-size: 0.8rem;
    padding: 10px;
    grid-column: 11/ 13;
    align-self: end;
`;
