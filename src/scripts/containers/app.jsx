import React from "react";
import Reflux from "reflux";
import Rx from "rx";
import { Settings, Sounds, Theme } from "../stores";
import { Nav, SoundList } from "../components";
import "../styles/base.css";

export const Konami = Rx.Observable.fromEvent(window, "keyup")
  .map(el => el.keyCode)
  .windowWithCount(10, 1)
  .selectMany(_x => _x.toArray())
  .filter(seq => seq.toString() === [38, 38, 40, 40, 37, 39, 37, 39, 66, 65].toString());

export default React.createClass({
  propTypes: {
    children: React.PropTypes.object
  },
  mixins: [ Reflux.connect(Sounds, "sounds"), Reflux.connect(Theme, "theme"), Reflux.connect(Settings, "settings") ],
  getInitialState() {
    return { konami: false };
  },
  componentDidMount() {
    Konami.subscribe(this.konamiEntered);
  },
  konamiEntered() {
    this.setState({ konami: !this.state.konami });
  },
  render() {
    return (
      <div className="wrapper">
        <Nav {...this.state.settings.intlData}/>
        <div className="container">
          <SoundList sounds={this.state.sounds} {...this.state.settings.intlData}/>
          {this.props.children && React.cloneElement(this.props.children, {...this.state.settings.intlData})}
          <aside className="toast-view"></aside>
        </div>
      </div>
    );
  }
});
