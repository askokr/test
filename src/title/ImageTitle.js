import React from 'react';
import styled from 'styled-components';
import { color, font } from './theme';
import Media from './Media';

const ImageTitle = styled.div`
  margin-top: 9px;
  display: inline-block;
`;

const Label = styled.span`
  font: ${font.imageTitle};
  color: ${color.imageTitle};

  &:first-child {
    font-weight: 400;
  }

  ${Media.Small.max`
    font-size: 14px;
    line-height: 20px;
  `}
`;

// Displays Title text and authors for image
export default ({ text, authors, className }) => (
  <ImageTitle className={className}>
    {text && <span><Label dangerouslySetInnerHTML={{ __html: text }} />&nbsp;&nbsp;</span>}
    {authors &&
      <Label>
        photoAuthor
        {authors.join(', ')}
      </Label>}
  </ImageTitle>
);
