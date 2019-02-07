import React from 'react';
import styled from 'styled-components';

import ImageTitle from './ImageTitle';
import Sharing from './ImageSharing';
import MobileSharing from './ImageMobileSharing';
import Breakpoints from './Breakpoints';
import { MediaQuery } from './MediaQuery';

const ArrowButton = styled.button`
  background: transparent;
  border: 0;
  width: 40px;
  margin-left: calc(50% - 30px);
  position: relative;
  outline: none;
`;

const ImageGalleryTitle = ({ authors, isFullscreen, text, queryString, hideText, displayText = true }) => (
  <React.Fragment>
    <MediaQuery maxWidth={Breakpoints.Small.max}>
      <div style={{ width: '100%', padding: isFullscreen ? '0 10px 35px 10px' : '0 0 20px 0', height: displayText ? 'auto' : '10px' }}>
        <ArrowButton onClick={() => hideText()} style={{ visibility: isFullscreen ? 'visible' : 'hidden', top: displayText ? '0' : '-25px' }}>AA</ArrowButton>
        <div style={{ visibility: displayText ? 'visible' : 'hidden' }}>
          <ImageTitle authors={authors} text={text} />
        </div>
      </div>
      <div style={{ visibility: isFullscreen ? 'visible' : 'hidden' }}>
        <div className="image-gallery-description-sharing">
          <MobileSharing queryString={queryString} />
        </div>
      </div>
    </MediaQuery>
    <MediaQuery minWidth={Breakpoints.Medium.min}>
      <div style={{ width: isFullscreen ? `calc(100% - 160px` : '100%' }}>
        <ImageTitle authors={authors} text={text} />
      </div>
      <div style={{ visibility: isFullscreen ? 'visible' : 'hidden' }}>
        <div className="image-gallery-description-sharing">
          <Sharing queryString={queryString} />
        </div>
      </div>
    </MediaQuery>
  </React.Fragment>
);

export default ImageGalleryTitle;
