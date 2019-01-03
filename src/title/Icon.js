import PropTypes from 'prop-types';
import styled from 'styled-components';

import { icon } from './theme';

const iconNames = {
  'aripaev-a': '\\31',
  aripaev: '\\32',
  investor: '\\33',
  'investor-aripaev': '\\34',
  infopank: '\\35',
  konto: '\\36',
  raadio: '\\37',
  st: '\\38',
  dv: '\\3f',
  'chevron-right': '\\41',
  'chevron-left': '\\42',
  'chevron-up': '\\43',
  'chevron-down': '\\44',
  'arrow-up': '\\45',
  'arrow-down': '\\46',
  'arrow-left': '\\47',
  'arrow-right': '\\48',
  'arrow-forward': '\\49',
  plus: '\\2b',
  minus: '\\2d',
  close: '\\58',
  'rounded-close': '\\78',
  'rounded-up': '\\61',
  'rounded-down': '\\62',
  'rounded-left': '\\63',
  'rounded-right': '\\64',
  exit: '\\39',
  'exit-2': '\\30',
  menu: '\\4d',
  'screen-rotate': '\\72',
  'full-screen': '\\71',
  'full-screen-exit': '\\51',
  email: '\\65',
  message: '\\6d',
  'key-rounded': '\\6b',
  key: '\\4b',
  date: '\\5a',
  print: '\\7a',
  warning: '\\77',
  chart: '\\21',
  search: '\\73',
  'rounded-info': '\\69',
  info: '\\6c',
  file: '\\66',
  user: '\\75',
  multiuser: '\\67',
  'a-user': '\\55',
  photo: '\\50',
  video: '\\56',
  mic: '\\4c',
  play: '\\70',
  pause: '\\74',
  stop: '\\53',
  quotes: '\\22',
  bullet: '\\2a',
  'dropdown-arrow': '\\54',
  facebook: '\\23',
  twitter: '\\25',
  rss: '\\26',
  linkedin: '\\2f',
  skype: '\\28',
  'google+': '\\29',
  youtube: '\\79',
  vimeo: '\\6f',
  share: '\\6e',
  'facebook-2': '\\3b',
  'twitter-2': '\\3a',
  'rss-2': '\\52',
  'linkedin-2': '\\5f',
  'skype-2': '\\3e',
  'google+2': '\\40',
  'youtube-2': '\\59',
  'vimeo-2': '\\4f',
  'share-2': '\\4e',
};

const Icon = styled.span`
  font-family: aripaev;
  font-size: ${icon.medium};
  vertical-align: text-bottom;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  &::before {
    content: '${props => iconNames[props.name]}';
  }
`;
Icon.propTypes = {
  name: PropTypes.string.isRequired,
  // To change icon size, use Icon.extend`` to override font-size
};

export default Icon;
