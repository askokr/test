import React from 'react';
import ReactHtmlParser from 'react-html-parser';

export default () => {
    const embedding = `
  <div class="iframely-embed"><div class="iframely-responsive" style="height: 168px; padding-bottom: 0;"><a href="https://podcast-dev.aripaev.info/episood/valisuudiste-kaleidoskoop-kust-tulevad-poosatagused-relvaaritsejad" data-iframely-url="//cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fpodcast-dev.aripaev.info%2Fepisood%2Fvalisuudiste-kaleidoskoop-kust-tulevad-poosatagused-relvaaritsejad&amp;key=cdeea809a37ce7b4b48d544d15c02180"></a></div></div><script async src="//cdn.iframe.ly/embed.js" charset="utf-8"></script>
  `;
    console.log(embedding);
    return (
        <div>
            <p>ohtlik</p>
            <div dangerouslySetInnerHTML={{ __html: embedding }} />
            <p>parseriga</p>
            {ReactHtmlParser(embedding)}
        </div>
    );
};
