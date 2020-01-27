import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { path } from 'ramda';
import PropTypes from 'prop-types';

const Image = styled.img`
  object-fit: ${props => props.fit_par};
`;

const CoverPolyfillImage = styled.div`
  background-image: url(${props => props.src});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: ${props => props.fit_par};
  bottom: 0;
  height: ${props => (props.height ? `${props.height}px` : '100%')};
  left: 0;
  right: 0;
  top: 0;
`;

const PolyfilledImageContainer = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const ObjectFitImage = (props) => {
  const [isModernBrowser, changeBrowserModernityStatus] = useState(true);

  useEffect(() => {
    if (path(['CSS', 'supports'], window)) {
      changeBrowserModernityStatus(CSS.supports('object-fit', 'cover'));
    } else {
      changeBrowserModernityStatus(false);
    }
  }, []);

  const { heightIE, objectFit, src } = props;

  if (!isModernBrowser) {
    return (
      <PolyfilledImageContainer>
        <CoverPolyfillImage
          fit_par={objectFit || 'cover'}
          height={heightIE}
          src={src}
        />
      </PolyfilledImageContainer>
    );
  }
  return <Image fit_par={objectFit || 'cover'} {...props} />;
};

ObjectFitImage.propTypes = {
  heightIE: PropTypes.number,
  objectFit: PropTypes.string,
  src: PropTypes.string,
};

export default ObjectFitImage;
