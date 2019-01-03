import React from 'react';
import styled from 'styled-components';

import { font } from './theme';
import SharingIconSet from './ImageSharingIconSet';

const ShareArea = styled.div`
  display: flex;
  align-items: center;
  font: ${font.articleHeaderInfo};
`;

const StyledSpan = styled.span`
  min-width: 70px;
`;

const Sharing = ({ sharedText }) => (
  <ShareArea>
    <StyledSpan>shareArticle</StyledSpan>
    <SharingIconSet sharedText={sharedText} />
  </ShareArea>
);

export default Sharing;
