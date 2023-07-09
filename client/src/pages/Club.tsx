import styled from 'styled-components';
import { Link } from 'react-scroll';
import ClubCard from '../components/ClubCard';
import { useEffect, useRef, useState } from 'react';

import back from '../../public/grouping 1.png';
import ClubTag from '../components/ClubTag';
import { useNavigate } from 'react-router-dom';

function Club() {
    const rollBannerRef = useRef<HTMLDivElement | null>(null);
    const [isRollBannerInViewPort, setIsRollBannerInViewPort] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition <= 0) {
                setIsRollBannerInViewPort(true);
            }
        };
        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    useEffect(() => {
        const rollBannerRefValue = rollBannerRef.current;

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log('RollBanner is now in viewport');
                    setIsRollBannerInViewPort(true);
                } else {
                    console.log('RollBanner is now out of viewport');
                    setIsRollBannerInViewPort(false);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.0,
        });

        if (rollBannerRefValue) {
            observer.observe(rollBannerRefValue);
        }

        return () => {
            if (rollBannerRefValue) {
                observer.unobserve(rollBannerRefValue);
            }
        };
    }, []);

    return (
        <ClubWarp>
            <Link activeClass="active" to="ContentContainer" spy={true} smooth={true} offset={0} duration={500}>
                <RollBanner ref={rollBannerRef} $inView={isRollBannerInViewPort}>
                    <SwiperContainer>
                        <SwiperWarp>
                            <img src={back} />
                        </SwiperWarp>
                        <SwiperPageTab>
                            <ArrowLeft />
                            <ArrowRight />
                        </SwiperPageTab>
                    </SwiperContainer>
                </RollBanner>
            </Link>
            <ContentContainer>
                <TagSection>
                    <TagTab>
                        <span>카테고리</span>
                        <span onClick={() => navigate(`/club/post`)}>글 쓰기</span>
                    </TagTab>
                    <Tags>
                        <ClubTag />
                    </Tags>
                </TagSection>
                <CardSection>
                    <ClubCard />
                    <ClubCard />
                    <ClubCard />
                    <ClubCard />
                    <ClubCard />
                    <ClubCard />
                    <ClubCard />
                    <ClubCard />
                    <ClubCard />
                    <ClubCard />
                    <ClubCard />
                    <ClubCard />
                    <ClubCard />
                    <ClubCard />
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

const RollBanner = styled.div<{ $inView: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #4f4d4d;
    position: relative;
    transform: translateY(${({ $inView }) => ($inView ? '0' : '-100%')});
    transition: transform 0.5s ease-in-out;
`;

const SwiperContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const SwiperWarp = styled.div`
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    width: 100%;
    height: 100%;

    > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const SwiperPageTab = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    align-items: center;
    justify-content: space-between;
`;

const Arrow = styled.span`
    color: white;
    font-size: 2em;
    cursor: pointer;
`;

const ArrowLeft = styled(Arrow)`
    &:before {
        content: '◀';
    }
`;

const ArrowRight = styled(Arrow)`
    &:after {
        content: '▶';
    }
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
    display: flex;
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
