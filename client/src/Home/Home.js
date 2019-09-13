import React, { Component } from "react";
import "../Profile/Profile.css";

import ReactDom from "react-dom";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import posed from 'react-pose';
// import posed, { PoseGroup } from "react-pose";
// (4) Sub components for Animations
// import PokerNews from "./PokerNews";
// import Contact from "./Contact";
// import Calendar from "./Calendar";
// import ClubInfo from "./ClubInfo";

// const RouteContainer = posed.div({
//   enter: { opacity: 1, delay: 300, beforeChildren: true },
//   exit: { opacity: 0 }
// });

const ButtonContainer = posed.div({
  open: {
    x: '0%',
    delayChildren: 200,
    staggerChildren: 50
  },
  closed: { x: '-100%', delay: 300 }
});

const Button = posed.div({
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 }
});

class Home extends Component {
  state = { isOpen: false };
  
  componentDidMount() {
    setTimeout(this.toggle, 1000);
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render(props) {
    const { isOpen } = this.state;
    return (
      <div id="container">
        <ButtonContainer id="content-container" pose={isOpen ? 'open' : 'closed'}>
          <Button className="button-top">
            <button type="button" className="block">
              Poker News - 
            </button>
          </Button>

          <Button className="container-center">
            <h3>San Antonio's Coolest Private Club</h3>
            <h1>RIVER CITY</h1>
            <br />
            <h2>CARD ROOM</h2>
            <h5>Open 7 days a week for good times!</h5>
            <h4>Poker • Arcade & Console Games • Chess</h4>
          </Button>

          <div className="rotate-left">
            <Button className="button-left">
              <button type="button" className="block">
                Club Information 
              </button>
            </Button>
          </div>

          <div className="rotate-right">
            <Button className="button-right">
              <button type="button" className="block">
                Contact - 
              </button>
            </Button>
          </div>

          <Button className="button-bottom">
            <button type="button" className="block">
              Club Calendar - 
            </button>
          </Button>
        </ButtonContainer>
      </div>
    );
  }
}

export default Home;
