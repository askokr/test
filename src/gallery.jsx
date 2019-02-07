/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import PinchToZoom from 'react-pinch-and-zoom';
import PrismaZoom from 'react-prismazoom'
import Zoombo from 'zoombo/react';
import PinchZoomPan from "react-responsive-pinch-zoom-pan";

import { MediaQuery } from './title/MediaQuery';
import { imageWithWidth, imageSourceset, updateHistory } from './title/imageHelpers';
import { color, stack } from './title/theme';
import Breakpoints from './title/Breakpoints';
import ObjectFitImage from './title/ObjectFitImage';
import ImageGalleryTitle from './title/ImageGalleryTitle';
import './ImageGallery.css';

const additionalClass = 'ap-image-gallery';
const cellPhoneBreakpoint = Breakpoints.Small.max;
const GalleryContainer = styled.div`
  .${additionalClass} {
    z-index: ${stack.imageGallery} !important;
  }
  .${additionalClass} > * {
    max-width: 100vw;
    margin: 0 auto;
  }
`;

const ImageContainer = styled.div`
  display: flex;
`;

const Image = styled(ObjectFitImage)`
  height: 50vm;
  height: 50vmin;
  width: 100%;
  margin: 0 auto;
  background: ${color.pageBackground};
`;
const ImageInFull = styled(ObjectFitImage)`
  height: 100vh;
  width: 100%;
  margin: 0 auto;
  background: #000;
`;

class ImageGallery extends React.Component {
    state = {
        currentIndex: 0,
        isFullscreen: false,
        displayText: true,
    }
    componentDidMount() {
        if (this.props.galleryState !== undefined && this.props.galleryState.gallery === this.props.images[0].uuid) {
            this.toggleFullScreen();
            const index = parseInt(this.props.galleryState.image, 10) - 1;
            if (index < this.props.images.length && index > 0) {
                this.handleSlide(index);
            }
        }
    }
    componentWillUpdate(nextProps, nextState) {
        if (nextState.isFullscreen) {
            window.addEventListener('keydown', this.handleKeyDown);
            window.addEventListener('wheel', this.handleWheel, { passive: false });
            window.addEventListener('touchmove', this.handleTouch, { passive: false });
            window.addEventListener('touchend', this.handleTouchEnd, { passive: false });
        } else {
            window.removeEventListener('keydown', this.handleKeyDown);
            window.removeEventListener('wheel', this.handleWheel);
            window.removeEventListener('touchmove', this.handleTouch);
            window.removeEventListener('touchend', this.handleTouchEnd);
        }
    }
    componentDidUpdate() {
        if (this.imageGallery.getCurrentIndex() !== this.state.currentIndex) {
            this.handleIndexUpdate();
        }
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('wheel', this.handleWheel);
        window.removeEventListener('touchmove', this.handleTouch);
        window.removeEventListener('touchend', this.handleTouchEnd);
    }
    handleIndexUpdate() {
        updateHistory(history, `?gallery=${this.props.images[0].uuid}&image=${this.imageGallery.getCurrentIndex() + 1}`);
        this.setState({ currentIndex: this.imageGallery.getCurrentIndex() });
    }
    handleSlide(slide) {
        this.imageGallery.slideToIndex(slide);
        updateHistory(history, `?gallery=${this.props.images[0].uuid}&image=${slide + 1}`);
        this.setState({ currentIndex: slide });
    }
    handleKeyDown = (event) => {
        const LEFT_ARROW = 37;
        const RIGHT_ARROW = 39;
        const UP_ARROW = 38;
        const DOWN_ARROW = 40;
        const ESC_KEY = 27;
        const key = parseInt(event.keyCode || event.which || 0, 10);
        switch (key) {
            case LEFT_ARROW:
                this.navigateToPrevious();
                break;
            case RIGHT_ARROW:
                this.navigateToNext();
                break;
            case UP_ARROW:
                event.preventDefault();
                this.navigateToPrevious();
                break;
            case DOWN_ARROW:
                event.preventDefault();
                this.navigateToNext();
                break;
            case ESC_KEY:
                if (this.state.isFullscreen && !this.props.useBrowserFullscreen) this.toggleFullScreen();
                break;
            default:
                break;
        }
    };
    handleWheel = (event) => {
        if (this.state.isFullscreen) {
            event.preventDefault();
            const direction = event.deltaY;
            if (direction > 0) {
                this.navigateToNext();
            }
            if (direction < 0) {
                this.navigateToPrevious();
            }
        }
    }
    handleTouch = event => event.preventDefault();
    handleTouchEnd = () => this.handleIndexUpdate();
    navigateToPrevious = () => {
        const { currentIndex } = this.state;
        const indexDown = currentIndex - 1;
        const firstSlide = 0;
        const lastSlide = this.props.images.length - 1;
        if (indexDown >= firstSlide) {
            this.handleSlide(indexDown);
        } else {
            this.handleSlide(lastSlide);
        }
    }
    navigateToNext = () => {
        const { currentIndex } = this.state;
        const indexUp = currentIndex + 1;
        const firstSlide = 0;
        const lastSlide = this.props.images.length - 1;
        if (indexUp <= lastSlide) {
            this.handleSlide(indexUp);
        } else {
            this.handleSlide(firstSlide);
        }
    }
    toggleFullScreen = () => {
        if (this.state.isFullscreen) {
            this.imageGallery.exitFullScreen();
            updateHistory(history, window.location.pathname);
        } else {
            this.imageGallery.fullScreen();
            updateHistory(history, `?gallery=${this.props.images[0].uuid}&image=${this.state.currentIndex + 1}`);
        }
        this.setState({ isFullscreen: !this.state.isFullscreen });
    };
    textHider = () => {
        this.setState({ displayText: !this.state.displayText });
    }
    GallerySize = () => (
        <span className="AAA">{this.props.images.length} {this.props.images.length === 1 ? 'onePhoto' : 'severalPhotos'}</span>
    )
    GalleryMainImage = item => (
        <ImageContainer onClick={() => this.textHider()}>
            <PinchToZoom>
                <ImageInFull
                    src={item.original}
                    alt={item.originalAlt}
                    srcSet={item.srcSet}
                    style={{ maxWidth: '100%' }}
                    objectFit="contain"
                    isFullscreen={this.state.isFullscreen}
                />
            </PinchToZoom>
            <div className="image-gallery-description" style={{ display: this.state.displayText ? 'inline-block' : 'none' }}>
                <ImageGalleryTitle
                    text={item.info.text}
                    authors={item.info.authors}
                    isFullscreen
                    queryString={`?gallery=${this.props.images[0].uuid}&image=${this.state.currentIndex + 1}`}
                    displayText={this.state.displayText}
                    hideText={() => this.textHider()}
                />
            </div>
        </ImageContainer>
    );
    GalleryFrontImage = item => (
        <Image
            src={item.original}
            alt={item.originalAlt}
            srcSet={item.srcSet}
            style={{ maxWidth: '100%', height: 'unset', maxHeight: '600px', background: '#000000' }}
            objectFit="contain"
        />
    );
    FullscreenButton = () => (
        <button
            type="button"
            className={
                `image-gallery-fullscreen-button${this.state.isFullscreen ? ' active' : ' inactive'}`}
            onClick={this.toggleFullScreen}
        />
    )
    LeftNav = () => (
        <button
            type="button"
            className="image-gallery-left-nav"
            onClick={this.navigateToPrevious}
        />
    )
    RightNav = () => (
        <button
            type="button"
            className="image-gallery-right-nav"
            onClick={this.navigateToNext}
        />
    )
    render() {
        const { images = [] } = this.props;
        const { currentIndex, isFullscreen } = this.state;
        return (
            <GalleryContainer>
                {/* <MediaQuery minWidth={cellPhoneBreakpoint}>
                    <ReactImageGallery
                        ref={(i) => { this.imageGallery = i; }}
                        items={images.map(({ authors, text, url }) => ({
                            original: imageWithWidth(url, 1000),
                            thumbnail: url.replace('preview', 'thumbnail'),
                            info: {
                                authors,
                                text,
                            },
                            srcSet: imageSourceset(url),
                        }))}
                        lazyLoad
                        showNav={!!isFullscreen}
                        showThumbnails={!!isFullscreen}
                        thumbnailPosition={isFullscreen ? 'right' : 'bottom'}
                        useBrowserFullscreen={false}
                        showPlayButton={false}
                        showIndex={!!isFullscreen}
                        disableArrowKeys={!isFullscreen}
                        disableSwipe={!isFullscreen}
                        onThumbnailClick={() => isFullscreen && this.forceUpdate()}
                        onClick={() => !isFullscreen && this.toggleFullScreen()}
                        additionalClass={additionalClass}
                        renderCustomControls={!isFullscreen && this.GallerySize}
                        renderItem={isFullscreen ? this.GalleryMainImage : this.GalleryFrontImage}
                        renderLeftNav={this.LeftNav}
                        renderRightNav={this.RightNav}
                        renderFullscreenButton={this.FullscreenButton}
                    />
                </MediaQuery> */}
                <MediaQuery maxWidth={cellPhoneBreakpoint}>
                    <ReactImageGallery
                        ref={(i) => { this.imageGallery = i; }}
                        items={images.map(({ authors, text, url }) => ({
                            original: imageWithWidth(url, 1000),
                            thumbnail: url.replace('preview', 'thumbnail'),
                            info: {
                                authors,
                                text,
                            },
                            srcSet: imageSourceset(url),
                        }))}
                        lazyLoad
                        showThumbnails={false}
                        useBrowserFullscreen={false}
                        showPlayButton={false}
                        showIndex={!!isFullscreen}
                        disableArrowKeys={!isFullscreen}
                        onClick={() => !isFullscreen && this.toggleFullScreen()}
                        additionalClass={additionalClass}
                        renderCustomControls={!isFullscreen && this.GallerySize}
                        renderItem={isFullscreen ? this.GalleryMainImage : this.GalleryFrontImage}
                        renderLeftNav={this.LeftNav}
                        renderRightNav={this.RightNav}
                        renderFullscreenButton={this.FullscreenButton}
                    />
                </MediaQuery>
                <ImageGalleryTitle authors={images[currentIndex].authors} text={images[currentIndex].text} isFullscreen={false} />
            </GalleryContainer>
        );
    }
}
ImageGallery.propTypes = {
    images: PropTypes.array,
};

export default ImageGallery;
