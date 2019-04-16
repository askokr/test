import React, { Component } from 'react';
import './App.css';
import ImageGallery from './gallery';
import IFrameTesTComponent from './iframe';

class App extends Component {
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
        <header className="App-header">
          <h1>Galerii test</h1>
        </header>
        <container style={{ maxWidth: '1200px', }}>
          <ImageGallery images={images} />
          <IFrameTesTComponent />
          <p>
            <a href="http://www.äripäev.ee">LINK</a>
          </p>
        </container>
      </div>
    );
  }
}

export default App;
