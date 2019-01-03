/* global _kmq:true */

const shareUrls = {
  facebook: 'http://www.facebook.com/sharer/sharer.php?s=100&u=',
  twitter: 'https://twitter.com/intent/tweet?via=aripaev_ee&text=',
  linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=',
};

// https://en.wikipedia.org/wiki/UTM_parameters
const trackingQueryParams = {
  facebook: '%3Futm_medium%3Darticle%26utm_campaign%3Dbutton%26utm_source%3DFacebook.com',
  twitter: '%3Futm_medium%3Darticle%26utm_campaign%3Dbutton%26utm_source%3DTwitter.com',
  linkedin: '%3Futm_medium%3Darticle%26utm_campaign%3Dbutton%26utm_source%3DLinkedin.com&source=Aripaev',
};

export const sharePopup = (service, sharedText, winWidth = 550, winHeight = 420) => () => {
  const winTop = (window.screen.height / 2) - (winHeight / 2);
  const winLeft = (window.screen.width / 2) - (winWidth / 2);
  const shareWindowOptions = `top=${winTop},left=${winLeft},toolbar=0,status=0,width=${winWidth},height=${winHeight}`;
  const shareWindowTitle = `${service}-share`;
  let shareServiceUrl;
  // there is no universal way to share
  switch (service) {
    case 'twitter':
      shareServiceUrl =
        `${shareUrls[service]}${encodeURIComponent(sharedText)}&url=${window.location.href}${trackingQueryParams[service]}`;
      // open a popup window
      window.open(shareServiceUrl, shareWindowTitle, shareWindowOptions);
      // send data to kissmetrics
      _kmq.push(['record', 'Social media click', { service }]);
      break;
    case 'linkedin': // linkedin has description and soure, but they are overwritten
      shareServiceUrl =
        `${shareUrls[service]}${encodeURIComponent(window.location.href)}${trackingQueryParams[service]}`;
      window.open(shareServiceUrl, shareWindowTitle, shareWindowOptions);
      _kmq.push(['record', 'Social media click', { service }]);
      break;
    default: // for facebook
      shareServiceUrl =
        `${shareUrls[service]}${window.location.href}${trackingQueryParams[service]}`;
      window.open(shareServiceUrl, shareWindowTitle, shareWindowOptions);
      _kmq.push(['record', 'Social media click', { service }]);
      break;
  }
};
