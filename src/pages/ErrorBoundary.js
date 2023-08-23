import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import './ErrorBoundary.scss';

import fourOhFour from '../assets/ErrorBoundary/img/fourOhFour.svg';
import astrodude from '../assets/ErrorBoundary/img/astrodude.png';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoaded: false,
      fourOhFourLoaded: false,
      astrotop: '0px',
      astroright: '0px',
    };
    
    // Create refs
    this.fourOhFourRef = React.createRef();
    this.astrodudeRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      pageLoaded: true,
    });
  }

  onMouseMove = (e) => {
    this.setState({
      astrotop: e.clientY / 8 + 'px',
      astroright: e.clientX / 8 + 'px',
    });
  };

  render() {
    return (
      <div className="flex main-wrap justifyCenter">
        <div className="main-container flex">
          <CSSTransition
            in={this.state.pageLoaded}
            timeout={600}
            classNames="fourOhFour"
            onEntered={() => {
              this.setState({
                fourOhFourLoaded: true,
                astrotop: '10px',
                astroright: '30px',
              });
            }}
            unmountOnExit
          >
            {(state) => (
              <div
                className="fourOhFour flex justifyCenter"
                onMouseMove={this.onMouseMove}
                onMouseOut={() => {
                  this.setState({
                    astrotop: '10px',
                    astroright: '30px',
                  });
                }}
                ref={this.fourOhFourRef}
              >
                <img src={fourOhFour} alt="404" />
                <img
                  src={astrodude}
                  className="astrodude"
                  style={{
                    paddingTop: this.state.astrotop,
                    paddingRight: this.state.astroright,
                  }}
                  alt="Astrodude"
                  ref={this.astrodudeRef}
                />
              </div>
            )}
          </CSSTransition>
          <CSSTransition
            in={this.state.fourOhFourLoaded}
            timeout={600}
            classNames="error-text"
            unmountOnExit
          >
            {(state) => (
              <div className="error-text flex justifyCenter">
                <h3>Oops… Looks like you got lost</h3>
              </div>
            )}
          </CSSTransition>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
