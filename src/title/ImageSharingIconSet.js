import React from 'react';
import styled from 'styled-components';

import { margin } from './theme';

const WrapperDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: 8px;
  width: 160px;
  & > div {
    margin: ${margin.xsmall} 0 ${margin.xsmall} ${margin.small};
    max-width: 25px;
  }

  & > div > div {
    width: 200px;
    text-align: center;
  }
`;


const SharingIconSet = ({ sharedText = '' }) => (
  <WrapperDiv>
    <p>XXX</p>
    <p>XXX</p>
    <p>XXX</p>
  </WrapperDiv>
);

export default SharingIconSet;
