import PropTypes from 'prop-types';

import { color, icon } from './theme';
import Icon from './Icon';

const MediaIcon = Icon.extend`
  font-size: ${icon.xxlarge};
  color: ${props => color[props.name]};
`;
MediaIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MediaIcon;
