import { filter, map, pipe, join } from 'ramda';
import qs from 'qs';
/*
  Image widths are chosen according to probable screen sizes. Mobile screens tend to be close to 300-500
  pixsels wide. To support images half the screen width, 200 was added. Since we don't have imges larger
  than 800px (currenlty) and loading 1000+ wide images caused api to return 502 in some cases, then 800 is
  the biggest size currently supported.
 */
const imageWidths = [200, 300, 400, 600, 800, 1200, 1400, 1600, 2000];
export const imageWithWidth = (imageUrl, width, quality = 85) => `${imageUrl}&width=${width}&q=${quality}`;
export const imageSourceset = (imageUrl, maxWidth, quality = 85) =>
  pipe(
    filter(width => !maxWidth || width <= maxWidth),
    map(width => `${imageWithWidth(imageUrl, width, quality)} ${width}w`),
    join(','),
  )(imageWidths);

const cropStringToWidth = (cropString, newWidth) => {
  const { width, height, ...other } = qs.parse(cropString);
  const newHeigth = (height / width) * newWidth;
  return qs.stringify({ ...other, width: newWidth, height: newHeigth });
};
export const cropWithWidth = (imageUrl, cropString, width) => `${imageUrl}&${cropStringToWidth(cropString, width)}`;
export const cropSourceset = (imageUrl, cropString, maxWidth) =>
  pipe(
    filter(width => !maxWidth || width <= maxWidth),
    map(width => `${cropWithWidth(imageUrl, cropString, width)} ${width}w`),
    join(','),
  )(imageWidths);

export const uuidFromUrl = url => url.substring(url.lastIndexOf('=') + 1);
export const updateHistory = (history, input) => {
  history.replaceState(null, null, `${input}`);
};
