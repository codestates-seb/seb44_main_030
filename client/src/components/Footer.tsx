import styled from 'styled-components';
import LOGO2 from '../../public/LOGO2.png';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <StyledFooter>
            <StyledLogo>
                <img src={LOGO2} onClick={() => navigate(`/`)}></img>
            </StyledLogo>
            <StyledInfo>
                <div>
                    <div>Contributor</div>
                    <NameList>
                        <li>
                            <StyledLink href="https://github.com/devhanda" target="_blank" rel="noopener noreferrer">
                                BE이에스더
                            </StyledLink>
                        </li>
                        <li>
                            <StyledLink
                                href="https://github.com/coder-bendany"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                BE강예은
                            </StyledLink>
                        </li>
                        <li>
                            <StyledLink
                                href="https://github.com/Seohyun-Back"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                BE백서현
                            </StyledLink>
                        </li>
                        <li>
                            <StyledLink href="https://github.com/Moonjonghoo" target="_blank" rel="noopener noreferrer">
                                FE문종후
                            </StyledLink>
                        </li>
                        <li>
                            <StyledLink href="https://github.com/mogisilta" target="_blank" rel="noopener noreferrer">
                                FE박광민
                            </StyledLink>
                        </li>
                        <li>
                            <StyledLink
                                href="https://github.com/RINORINORINORINO"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                FE이현석
                            </StyledLink>
                        </li>
                    </NameList>
                </div>
                <div>
                    <div>ABOUT</div>
                    <Info>사용설명서</Info>
                </div>
                <div>
                    <div>SUPPORT</div>
                    <Info>
                        <StyledLink
                            href="https://github.com/codestates-seb/seb44_main_030"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Splash github
                        </StyledLink>
                    </Info>
                </div>
            </StyledInfo>
            <StyledIntroduce>
                Site design / logo © 2023 SplashZone TEAM30;
                <br /> user contributions licensed under CC BY-SA.
                <br /> rev 2023.7.24.43520
            </StyledIntroduce>
        </StyledFooter>
    );
};

export default Footer;

const StyledFooter = styled.footer`
    background-color: rgba(56, 132, 213, 1);
    display: flex;

    justify-content: space-around;

    padding: 40px;

    height: 250px;
    color: white;
    font-size: 1.5rem;

    font-family: 'Bangers', cursive;
`;

const StyledLogo = styled.div`
    cursor: pointer;
`;

const StyledInfo = styled.div`
    display: flex;
    justify-content: space-between;

    /* margin: 0 50px 0 50px; */

    > div {
        margin-right: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const StyledIntroduce = styled.div`
    font-size: 0.8rem;
    padding: 10px;
    align-self: end;
    margin-right: 50px;
`;

const StyledLink = styled.a`
    color: white;
    text-decoration: none;

    &:hover {
        color: #ccc;
    }
`;

const Info = styled.div`
    font-family: TTWanjudaedunsancheB;
    font-size: 1.1rem;
    margin-top: 60px;
`;

const NameList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    padding: 5px 20px 5px 20px;
    font-size: 0.9rem;
    font-family: TTWanjudaedunsancheB;

    > li {
        padding: 3px 0 0 0;
    }
`;
