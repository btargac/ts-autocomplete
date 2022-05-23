import React, {FC} from 'react';
import styled from 'styled-components';

import {sanitize, createSearchRegex} from '../utils/searchRegexUtil';

interface Props {
    text: string;
    highlight: string;
}

const Mark = styled.mark`
    background-color: yellow;
`;

const Highlight: FC<Props> = ({text = '', highlight = ''}) => {
    if (!highlight.trim()) {
        return <span>{text}</span>;
    }

    const regex = createSearchRegex(sanitize(highlight));
    const parts = text.split(regex);

    return (
        <span>
            {parts.filter(String)
                .map((part, i) =>
                    regex.test(part) ?
                        (<Mark key={i}>{part}</Mark>)
                        : (<span key={i}>{part}</span>)
                )}
        </span>
    );
};

export default Highlight;