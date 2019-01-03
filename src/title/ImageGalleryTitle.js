import React from 'react';

import ImageTitle from './ImageTitle';
import Sharing from './ImageSharing';
import MobileSharing from './ImageMobileSharing';
import Breakpoints from './Breakpoints';
import { MediaQuery } from './MediaQuery';

const ImageGalleryTitle = ({ authors, isFullscreen, sharedText, text }) => (
  <div style={{ display: 'inlineBlock' }}>
    <ImageTitle authors={authors} text={text} />
    <div style={{ visibility: isFullscreen ? 'visible' : 'hidden' }}>
      <div className="image-gallery-description-sharing">
        <MediaQuery maxWidth={Breakpoints.Small.max}>
          <MobileSharing sharedText={sharedText} />
        </MediaQuery>
        <MediaQuery minWidth={Breakpoints.Medium.min}>
          <Sharing sharedText={sharedText} />
        </MediaQuery>
      </div>
    </div>
  </div>
);

export default ImageGalleryTitle;
