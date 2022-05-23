import React, {useState, useEffect, ChangeEvent, FC} from 'react';
import styled from 'styled-components';

import Highlight from './Highlight';
import {sanitize} from '../utils/searchRegexUtil';
import {ReactComponent as LoadingIcon} from '../assets/loading.svg'

const InputWrapper = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 30rem;
  line-height: 1.8rem;
  padding: 1rem;
`;

const Suggestions = styled.div`
  background-color: black;
  width: 30rem;
  line-height: 1.5rem;
  font-size: 1.5rem;
  margin-top: 0.1rem;
`;

const LoadingComponent = styled(LoadingIcon)`
  width: 30px;
  position: absolute;
  right: 1rem;
  top: 50%;
  stroke-dasharray: 50;
  stroke-dashoffset: 0;
  animation: load 3s linear infinite;
  transform-origin: center;
  transform: translateY(-50%);

  @keyframes load {
    0% {
      transform: translateY(-50%) rotate(0deg);
      stroke-dashoffset: 50;
    }
    50% {
      stroke-dashoffset: 0;
    }
    100% {
      transform: translateY(-50%) rotate(360deg);
      stroke-dashoffset: -50;
    }
  }
`;

const Suggestion = styled.div`
  padding: 1rem;

  :hover {
    background-color: #0b286e;
  }
`;

interface Movie {
    id: number;
    name: string;
}

const Autocomplete: FC = () => {
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
    };

    useEffect(() => {
        let timeOut: ReturnType<typeof setTimeout>;
        const optimizedKeyword = sanitize(searchKeyword);

        if (optimizedKeyword === '') {
            setSuggestions([]);
        } else {
            setLoading(true);

            const getSuggestions = async () => {
                await new Promise(resolve => {
                    timeOut = setTimeout(() => {
                        resolve(null);
                    }, 1000);
                })

                const mockMovies: Movie[] =
                    [{
                        id: 1,
                        name: 'Starwars'
                    }, {
                        id: 2,
                        name: 'Mad max'
                    }];

                const searchResults = mockMovies.filter(movie => movie.name.toLowerCase().includes(optimizedKeyword));
                setSuggestions(searchResults);
                setLoading(false);
            }

            getSuggestions();
        }

        return () => {
            clearTimeout(timeOut);
        }

    }, [searchKeyword]);

    return (
        <>
            <InputWrapper>
                <Input type="text" placeholder='Find movies' onChange={changeHandler}/>
                {loading && <LoadingComponent/>}
            </InputWrapper>
            {!!suggestions.length && <Suggestions>
                {
                    suggestions.map(suggestion => (
                        <Suggestion key={suggestion.id}>
                            <Highlight text={suggestion.name} highlight={searchKeyword}/>
                        </Suggestion>
                    ))
                }
            </Suggestions>}
        </>
    );
}

export default Autocomplete;