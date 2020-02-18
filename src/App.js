import React, { Component } from 'react';
import Helmet from 'react-helmet';

import './App.css';
import ImageGallery from './gallery';
// import IFrameTesTComponent from './iframe';
// import ScrollLoader from './scrollLoader';

// const content = 'See siin on maailma tähtsaim <a href="http://www.äripäev.ee" target="_blank" rel="noopener noreferrer">LINK</a>';

const MAIN_URL = "https://testgalerii.netlify.com/";

class App extends Component {
  state = {
    color: false
  }
  render() {
    const images = [
      {
        url: 'https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        author: 'Mina',
        text: 'sss',
      },
      {
        url: 'https://images.pexels.com/photos/39317/chihuahua-dog-puppy-cute-39317.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        author: 'Sina',
        text: 'zzz',
      },
      {
        url: 'https://images.pexels.com/photos/374898/pexels-photo-374898.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
        author: 'Sina',
        text: 'auh!',
      }
    ]
    return (
      <div className="App">
        <Helmet>
          <title>test gallery</title>
          <meta name="description" content="test description" />
          <meta property="og:image" content={`${MAIN_URL}/icons/icon-512x512.png`} />
          <meta property="og:image:width" content="512" />
          <meta property="og:image:height" content="512" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@aripaev_ee" />
          <meta name="twitter:title" content="Twitter demo title" />
          <meta name="twitter:description" content="test description for twitter" />
          <meta name="twitter:image" content={`${MAIN_URL}/icons/icon-512x512.png`} />
          {/* <meta name="twitter:image:alt" content={`${MAIN_URL}/icons/icon-512x512.png`} /> */}
          {/* <meta property="og:title" content="testgalerii: Värsked uudised Eestist ja välismaalt"></meta>
          <meta property="og:url" content={MAIN_URL}></meta>
          <meta property="og:site_name" content="testgalerii"></meta>
          <meta property="og:description" content="testgalerii: Värsked uudised Eestist ja välismaalt. Loe lähemalt"></meta>
          <meta property="og:type" content="website"></meta>
        </Helmet> */}

        <header className="App-header">
          <h1>Galerii test</h1>
        </header>
        <div className="content">
          <ImageGallery images={images} />
          {/* <IFrameTesTComponent />
          <p
            onClick={() => this.setState({color: !this.state.color})}
            style={{color: this.state.color ? 'hotpink' : 'green'}}
            dangerouslySetInnerHTML={{ __html: content }}
          /> */}
          {/* <ScrollLoader /> */}
        </div>
      </div>
    );
  }
}

export default App;
