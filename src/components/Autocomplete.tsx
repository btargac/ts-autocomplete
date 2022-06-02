import React, {useState, useEffect, ChangeEvent, FC} from 'react';
import styled from 'styled-components';

import Highlight from './Highlight';
import {sanitize} from '../utils/searchRegexUtil';
import {ReactComponent as LoadingIcon} from '../assets/loading.svg'

const tmdbAPIKey = 'e3744181c068770f19000325a7f09906';
const tmdbBaseUrl = 'https://api.themoviedb.org/3/search/movie';

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
  max-height: 50vh;
  line-height: 1.5rem;
  font-size: 1.5rem;
  margin-top: 0.1rem;
  overflow: auto;
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
    cursor: pointer;
  }
`;

interface Movie {
    id: number;
    title: string;
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

            const getSuggestions = async () : Promise<void> => {
                try {
                    const response: Response = await fetch(`${tmdbBaseUrl}?api_key=${tmdbAPIKey}&language=en-US&query=${optimizedKeyword}&page=1&include_adult=true`);
                    const {results: movies}: {results: Movie[]} = await response.json();

                    setSuggestions(movies);
                    setLoading(false);
                } catch (e) {
                    console.warn(e);
                    setSuggestions([]);
                    setLoading(false);
                }
            }

            // wrapping the getSuggestion method with a timeout is the easiest way to debounce it
            // but for production prefer debounce util from underscore/lodash etc.
            // or create a high order function that takes your func and returns a debounced version of it
            timeOut = setTimeout(() => {
                getSuggestions();
            }, 1000);
        }

        return () => {
            // clear the previous timeout to avoid fetching data with an outdated search keyword
            clearTimeout(timeOut);
            // and in such cases clear the loading state
            setLoading(false);
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
                            <Highlight text={suggestion.title} highlight={searchKeyword}/>
                        </Suggestion>
                    ))
                }
            </Suggestions>}
        </>
    );
}

export default Autocomplete;