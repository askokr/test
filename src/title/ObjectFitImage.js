import React, { Component } from 'react';
import styled from 'styled-components';
import { path } from 'ramda';

const Image = styled.img`
  object-fit: ${props => props.objectFit};
`;

const PolyfilledImageContainer = styled.div`
  overflow: hidden;
  position: relative;
`;

const CoverPolyfillImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-size: ${props => props.objectFit};
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-image: url(${props => props.src});
`;

export default class ObjectFitImage extends Component {
  state = {
    isModernBrowser: true,
  };

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    if (path(['CSS', 'supports'], window)) {
      this.setState({ isModernBrowser: CSS.supports('object-fit', 'cover') });
    } else {
      this.setState({ isModernBrowser: false });
    }
  }

  render() {
    if (!this.state.isModernBrowser) {
      const { className, objectFit, src } = this.props;
      return (
        <PolyfilledImageContainer className={className}>
          <CoverPolyfillImage
            objectFit={objectFit || 'cover'}
            src={src}
          />
        </PolyfilledImageContainer>
      );
    }
    return <Image objectFit="cover" {...this.props} />;
  }
}
