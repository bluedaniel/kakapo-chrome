import React from "react";
import Reflux from "reflux";
import { Settings, Sounds, Theme } from "../stores";
import { Nav, SoundList } from "../components";
import "../styles/base.css";

export default React.createClass({
  propTypes: {
    children: React.PropTypes.object
  },
  mixins: [ Reflux.connect(Sounds, "sounds"), Reflux.connect(Theme, "theme"), Reflux.connect(Settings, "settings") ],
  getInitialState() {
    return {};
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
