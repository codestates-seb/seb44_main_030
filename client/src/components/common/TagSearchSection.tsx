import React from 'react';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import SearchIcon from '../../assets/Search.svg';
import Tag from './Tag';
import { Mocktags } from '../../assets/mockdata';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { savePosition } from '../../store/scroll.ts';

type SearchInput = {
    Keyword: string;
};

type TagSearchSectionProps = {
    currTag: string | undefined;
    handleNavigateCreate: () => void;
};

const TagSearchSection = ({ currTag, handleNavigateCreate }: TagSearchSectionProps) => {
    const { keyword } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const boardType = location.pathname.split('/')[1];

    //URLSearchParams 객체(query)는 get메서드로 쿼리파라미터 값 불러올 수있음.
    const { register, handleSubmit } = useForm<SearchInput>({
        defaultValues: {
            Keyword: keyword === 'null' ? '' : keyword,
        },
    });

    //태그선택
    const handleTagSelect = (e: React.MouseEvent<HTMLLIElement>) => {
        const selectedTagName = e.currentTarget.innerText;
        dispatch(savePosition(window.scrollY));
        if (boardType === 'community') {
            navigate(`/${boardType}/${selectedTagName}/${keyword}`);
        }
        if (boardType === 'club') {
            navigate(`/${boardType}/${selectedTagName}/${keyword}`);
        }
    };

    //검색
    const onSubmit: SubmitHandler<SearchInput> = (data) => {
        dispatch(savePosition(window.scrollY));
        if (boardType === 'community') {
            navigate(`/${boardType}/${currTag}/${data.Keyword}`);
        }
        if (boardType === 'club') {
            navigate(`/${boardType}/${currTag}/${data.Keyword}`);
        }
    };
    return (
        <MiddleSection>
            <TagSpace>
                {Mocktags.map((tagName, idx) => (
                    <Tag key={idx} tag={tagName} $isSelected={currTag === tagName} onClick={handleTagSelect} />
                ))}
            </TagSpace>
            <Right>
                <SearchSpace>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="searchInput" />
                        <div>
                            <input
                                id="searchInput"
                                type="text"
                                placeholder="Search..."
                                {...register('Keyword', {
                                    required: true,
                                    validate: (value) => value.trim().length >= 2 || '두 글자 이상 입력해주세요',
                                })}
                            />
                            <button>
                                <img src={SearchIcon} alt="searchIcon" />
                            </button>
                        </div>
                    </form>
                </SearchSpace>
                <button onClick={handleNavigateCreate}>글 작성</button>
            </Right>
        </MiddleSection>
    );
};

export default TagSearchSection;

const MiddleSection = styled.section`
    width: 100%;
    margin: 60px 0 40px 0;
    padding: 0 35px 0 35px;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Right = styled.div`
    > button {
        width: 550px;
        height: 45px;
        border-radius: 15px;
        background-color: #3884d5;
        color: #ffffff;
        box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.25);
        margin-top: 20px;
        border: none;
        outline: none;

        &:hover {
            cursor: pointer;
            background-color: #5797dc;
        }
    }
`;
const TagSpace = styled.ul`
    width: 600px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 15px 0 15px 0;
    align-items: center;
    border-radius: 15px;
    // border: 1px solid #696969;
    background: #fff;
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.25);
`;
const SearchSpace = styled.div`
    > form {
        display: flex;
        flex-direction: column;
        align-items: center;
        > div {
            width: 550px;
            height: 40px;
            display: flex;
            > input {
                margin-top: 2px;
                height: 100%;
                border-radius: 15px 0 0 15px;
                border: none;
                outline: none;
                background: #fff;
                box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.25);
                padding-left: 15px;
                font-size: 20px;
                flex-basis: 90%;
                &:focus {
                    outline: solid 2px #3884d5;
                }
            }
        }
    }

    button {
        width: 45px;
        height: 45px;
        font-size: 20px;
        flex-basis: 10%;
        border-radius: 0 15px 15px 0;
        border: none;
        outline: none;
        background-color: #3884d5;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.25);
        &:hover {
            cursor: pointer;
            background-color: #5797dc;
        }
        > img {
            width: 30px;
            height: 30px;
        }
    }
`;
