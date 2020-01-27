import React from 'react';
import PinchToZoom from 'react-pinch-and-zoom';
import styled from 'styled-components';

import Media from './Media';
import ObjectFitImage from './ObjectFitImage';
import Breakpoints from './Breakpoints';
import { MediaQuery } from './MediaQuery';
import { Colors, Fonts, margin } from './themes';

import camera from './assets/camera.svg';
import close from './assets/closeWhite.svg';

const icons = { camera, close };

const IconImage = styled.img`
  height: 30px;
  padding-left: ${margin.small};

  ${Media.Small.max`
    height: 20px;
  `}
`;

const Icon = ({ name }) => <IconImage src={icons[name]} />;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  font: ${Fonts.imageDescription};
  margin-top: ${margin.small};
  padding-top: ${margin.small};
  white-space: normal;
  width: ${props => (props.isFullscreen ? 'calc(100% - 40px)' : '100%')};

  color: ${props => (props.isFullscreen ? 'white' : Colors.imageDescription)};

  ${props => props.isFullscreen && 'background-color: rgba(0, 0, 0, 0.4)'};
  ${props => props.isFullscreen && 'bottom: 0'};
  ${props => props.isFullscreen && `padding: ${margin.large}`};
  ${props => props.isFullscreen && 'position: absolute'};

  & > div {
    display: block;
    text-align: left;
  }
`;

const DescriptionTexts = styled.div`
  flex-direction: column;
  margin-bottom: auto;
  margin-top: auto;
`;

const Authors = styled.div`
  font-weight: 500;
`;

const ShareCorner = styled.div`
  margin-left: auto;
`;

const FullscreenButton = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-radius: 0 0 0 10px;
  bottom: auto;
  cursor: pointer;
  font-size: 30px;
  padding: 12px 30px;
  top: 0;
  transition: none;

  &:focus {
    outline: none;
  }

  ${Media.Small.max`
    ${props => props.isFullscreen && 'border-radius: 10px 0 0 10px'};
    ${props => props.isFullscreen && ' margin-top: 20px'};
  `}
`;

const GallerySizeDisplay = styled.span`
  background: rgba(0, 0, 0, 0.6);
  border-radius: 0 0 10px 0;
  color: white;
  font-weight: bold;
  left: 0;
  padding: 27.6px 30px;
  position: absolute;
  top: 0;
  z-index: 1;

  ${Media.Small.max`
    padding: 23px 30px;
    ${props => props.isFullscreen && 'border-radius: 0 10px 10px 0'};
    ${props => props.isFullscreen && ' margin-top: 20px'};
  `}
`;

const ImageContainer = styled.div`
  display: flex;
`;

const ImageWrapper = styled.div`
  height: 100%;
  text-align: center;
  width: 100%;
`;

const SingleImageFront = styled(ObjectFitImage)`
  background-color: black;
  height: 50vh;
  margin: 0 auto;
  max-height: 800px;
  width: 100%;
`;

const SingleImageFull = styled(ObjectFitImage)`
  height: 100vh;
  margin: 0 auto;
  max-height: 100vh;
  ${props => !props.zoomable && 'width: calc(100vw - 200px)'};

  ${Media.Large.max`
    width: 100vw;
  `}
`;

const ImageArea = styled.div`
  align-items: center;
  clear: both;
  display: flex;
  flex-direction: column;
  margin: 20px auto;

  & > * {
    margin: 0 auto;
    max-width: 100vw;
    width: 100%;
  }
`;

const Description = ({ analyticsLabel, authors = [], isFullscreen, registerClick, text }) => (
  <DescriptionContainer isFullscreen={isFullscreen}>
    <DescriptionTexts>
      <div>{text}</div>
      {authors.length > 0
      && (
        <Authors>
          {authors.length === 1 && 'author'}
          {authors.length > 1 && 'authors'}
        </Authors>
      )}
    </DescriptionTexts>
    {isFullscreen
      && (
        <ShareCorner>
          <span>SHARE</span>
        </ShareCorner>
      )}
  </DescriptionContainer>
);

const FrontImage = item => (
  <SingleImageFront
    align={item.alignment}
    alt={item.originalAlt}
    heightIE={500}
    objectFit="contain"
    onClick={item.info.toggleFullScreen}
    src={item.original}
    srcSet={item.srcSet}
    style={{ height: '100%' }}
  />
);

const FullscreenImage = item => (
  <ImageContainer>
    <ImageWrapper>
      <MediaQuery minWidth={Breakpoints.Medium.min}>
        <SingleImageFull
          alt={item.originalAlt}
          objectFit="contain"
          onClick={() => item.info.changeDescriptionVisibility(!item.info.showDescription)}
          src={item.original}
          srcSet={item.srcSet}
          zoomable={item.info.zoomable}
        />
      </MediaQuery>
      <MediaQuery maxWidth={Breakpoints.Small.max}>
        {item.info.zoomable
          ? (
            <PinchToZoom>
              <SingleImageFull
                alt={item.originalAlt}
                objectFit="contain"
                src={item.original}
                srcSet={item.srcSet}
              />
            </PinchToZoom>
          ) : (
            <SingleImageFull
              alt={item.originalAlt}
              objectFit="contain"
              src={item.original}
              srcSet={item.srcSet}
            />
          )}
      </MediaQuery>
    </ImageWrapper>
    {item.info.showDescription
      && (
        <Description
          analyticsLabel={item.info.analyticsLabel}
          authors={item.info.authors}
          isFullscreen={item.info.isFullscreen}
          registerClick={item.info.registerClick}
          text={item.info.text}
        />
      )}
  </ImageContainer>
);

export {
  Description,
  GallerySizeDisplay,
  Icon,
  ImageArea,
  FrontImage,
  FullscreenButton,
  FullscreenImage,
};

export default Description; // Next wants files to have default exports
