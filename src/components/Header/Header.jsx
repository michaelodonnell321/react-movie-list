import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <h1 className="headerText">
                    The Movie List App
                </h1>
                <div id="headerQuoteDiv">
                    <img id="servoCrow" src="images/mst3k.png" />
                    <h4 id="servoQuote">
                        "They must've spent 10's of dollars on this!"
                </h4>
                </div>
            </div>
        );
    }
}

export default Header;