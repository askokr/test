import React, { Component } from 'react';
import styled from 'styled-components';

import { font } from './theme';

const ShareArea = styled.div`
  display: flex;
  font: ${font.articleHeaderInfo};
`;

const Hidden = styled.div`
  display: flex;
  align-items: center;
  transform: translateY(-140%);
  right: 10px;
  top: 60px;
  position: relative;
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s ease-out;
  &.visible {
    visibility: visible;
    opacity: 1;
  }
`;


const StyledSpan = styled.span`
  min-width: 70px;
`;

class MobileSharing extends Component {
  componentDidMount() {
    this.ShareArea.parentElement.style.marginTop = '0px';
  }

  changeHidden = () => {
    if (this.Hidden.classList.contains('visible')) {
      this.ShareArea.parentElement.style.marginTop = '0px';
      this.Hidden.classList.remove('visible');
    } else {
      this.ShareArea.parentElement.style.marginTop = '40px';
      this.Hidden.classList.add('visible');
    }
  };

  render() {
    return (
      <ShareArea innerRef={(el) => { this.ShareArea = el; }}>
        <Hidden innerRef={(el) => { this.Hidden = el; }}>
          <StyledSpan>shareArticle</StyledSpan>
        </Hidden>
        <p>XXX</p>
      </ShareArea>
    );
  }
}

export default MobileSharing;
