import React from 'react';

class ScrollLoader extends React.Component {
    state = {
        array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    }



    componentDidMount() {
        this.startScrollCheck();
      }

      componentWillUnmount = () => this.removeScrollCheck();

      getHeight = (i) => {
        const el = document.scrollingElement || document.documentElement;
        return el[i];
      }

      // eslint-disable-next-line no-restricted-globals
      isBottom = () => screen.height + this.getHeight('scrollTop') >= this.getHeight('offsetHeight') - 1500;

      startScrollCheck = () => {
        const self = this;
        setTimeout(self.handleScroll, 500);
      }

      removeScrollCheck = () => {
        const self = this;
        clearTimeout(self.handleScroll);
      }

      handleScroll = () => {
        const isBottom = this.isBottom();
        if (isBottom) {
          const oldArray = this.state.array;
          const newArray = oldArray.concat(oldArray);
          this.setState({array: newArray});
        }
        this.startScrollCheck();
      }

    render() {
        const {array} = this.state;
        return (<ol>
          {
            array.map(article => (
                <li key={article}>
                  {article}
                </li>
                ))
            }
        </ol>);
    }
}

export default ScrollLoader;
