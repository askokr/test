import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import ReactImageGallery from 'react-image-gallery';
import { useMediaQuery } from 'react-responsive';
import 'react-image-gallery/styles/css/image-gallery.css';

import Breakpoints from './title/Breakpoints';
import { Description, GallerySizeDisplay, Icon, ImageArea, FrontImage, FullscreenButton, FullscreenImage } from './title/ImageElements';
import { imageSourceset, imageWithWidth } from './title/imageHelpers';

const ImageGallery = ({ analyticsLabel, images = [], registerClick = () => { } }) => {
  const galleryRef = useRef(null);
  const [isFullscreen, changeFullscreen] = useState(false);
  const [showDescription, changeDescriptionVisibility] = useState(true);
  const [currentSlide, changeSlide] = useState(0);
  const isTabletOrMobile = useMediaQuery({ query: `(max-width: ${Breakpoints.XLarge.min}px)` });

  const slideToIndex = (index) => { galleryRef.current.slideToIndex(index); };
  const slideToNext = () => { slideToIndex(galleryRef.current.getCurrentIndex() + 1); };
  const slideToPrevious = () => { slideToIndex(galleryRef.current.getCurrentIndex() - 1); };

  const handleSlide = () => {
    if (galleryRef.current.getCurrentIndex() !== currentSlide) changeSlide(galleryRef.current.getCurrentIndex());
  };

  useEffect(() => {
    const handleWheel = (event) => {
      if (isFullscreen) {
        event.preventDefault();
        if (event.deltaY > 0) slideToNext();
        if (event.deltaY < 0) slideToPrevious();
      }
    };
    const handleKeyDown = (event) => {
      if (isFullscreen) {
        const UP_ARROW = 38;
        const DOWN_ARROW = 40;
        const key = parseInt(event.keyCode || event.which || 0, 10);
        if (key === UP_ARROW || key === DOWN_ARROW) {
          event.preventDefault();
          if (key === UP_ARROW) {
            slideToPrevious();
          } else slideToNext();
        }
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  useEffect(() => {
    const { origin, pathname } = window.location;
    const input = `${origin}${pathname}${isFullscreen ? `?gallery=${images[0].uuid}&imageNr=${currentSlide}` : ''}`;
    // eslint-disable-next-line no-restricted-globals
    history.replaceState(null, null, `${input}`);
  }, [isFullscreen, currentSlide]);

  const toggleFullScreen = () => {
    if (isFullscreen) {
      galleryRef.current.exitFullScreen();
    } else {
      registerClick(analyticsLabel);
      galleryRef.current.fullScreen();
    }
  };

  const GallerySize = () => (
    <GallerySizeDisplay isFullscreen={isFullscreen}>
      {isFullscreen
        ? `${galleryRef.current.getCurrentIndex() + 1} / ${images.length}`
        : `${images.length} ${images.length === 1 ? 'onePicture' : 'manyPictures'}`}
    </GallerySizeDisplay>
  );

  const CustomFSButton = () => (
    <FullscreenButton
      type="button"
      className="image-gallery-icon image-gallery-fullscreen-button"
      isFullscreen={isFullscreen}
      onClick={toggleFullScreen}
    >
      {isFullscreen ? <Icon name="close" /> : <Icon name="camera" />}
    </FullscreenButton>
  );

  return (
    <ImageArea>
      <ReactImageGallery
        items={images.map(({ authors, text, url }) => ({
          original: imageWithWidth(url, 1000),
          thumbnail: url.replace('preview', 'thumbnail'),
          info: {
            analyticsLabel: `share_${analyticsLabel}`,
            authors,
            changeDescriptionVisibility,
            isFullscreen,
            registerClick,
            showDescription,
            text,
            toggleFullScreen,
          },
          srcSet: imageSourceset(url),
        }))}
        disableArrowKeys={!isFullscreen}
        disableSwipe={!isFullscreen}
        lazyLoad
        onScreenChange={fullscreen => changeFullscreen(fullscreen)}
        ref={galleryRef}
        renderCustomControls={GallerySize}
        renderFullscreenButton={CustomFSButton}
        renderItem={isFullscreen ? FullscreenImage : FrontImage}
        showNav={(isFullscreen && !isTabletOrMobile) || (isTabletOrMobile && !isFullscreen)}
        showPlayButton={false}
        showThumbnails={isFullscreen && !isTabletOrMobile}
        startIndex={currentSlide}
        thumbnailPosition={isFullscreen && !isTabletOrMobile ? 'right' : 'bottom'}
        useBrowserFullscreen={false}
        onSlide={handleSlide}
      />
      <Description
        authors={images[currentSlide].authors}
        text={images[currentSlide].text}
      />
    </ImageArea>
  );
};

ImageGallery.propTypes = {
  analyticsLabel: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.shape({
    authors: PropTypes.arrayOf(PropTypes.string),
    url: PropTypes.string,
    uuid: PropTypes.string,
  })),
  registerClick: PropTypes.func,
};

export default ImageGallery;
