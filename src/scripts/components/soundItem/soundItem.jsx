import React from "react";
import Reflux from "reflux";
import classNames from "classnames";
import waves from "node-waves";
import throttle from "lodash/function/throttle";
import PureRenderMixin from "react-addons-pure-render-mixin";
import { soundActions } from "../../actions";
import { Theme } from "../../stores";
import SoundClass from "../../classes/sound";
import { Image } from "../ui";
import "./soundItem.css";

export default React.createClass({
  propTypes: SoundClass,
  mixins: [Reflux.connect(Theme, "theme"), PureRenderMixin],
  componentWillMount() {
    this.handleChangeVolume = throttle(this.handleChangeVolume, 250);
  },
  handleToggle() {
    waves.ripple(this.refs.item);
    soundActions.togglePlayPause(this.props);
  },
  handleChangeVolume() {
    soundActions.changeVolume(this.props, parseFloat(this.refs.volume.value));
  },
  handleStopPropagation(el) {
    el.preventDefault();
    el.stopPropagation();
  },
  render() {
    let objStyle = this.state.theme.soundList.item;
    if (this.props.playing) objStyle = {...objStyle, ...this.state.theme.soundList.itemPlaying};
    // Image size is relative to the volume
    const itemClass = classNames({
      "playing": this.props.playing,
      "paused": !this.props.playing
    });
    const img = "http://data.kakapo.co/v2/images/" + (this.props.playing ? "light_" : "dark_") + this.props.img.replace(/^.*[\\\/]/, "") + ".png";
    return (
      <div
        className={classNames("item", "waves-effect", "waves-block", itemClass)}
        onClick={this.handleToggle}
        ref="item"
        style={objStyle}
      >
        <div className="inner">
          <Image img={img}/>
          <span className="title">
            {this.props.name}
          </span>
          <input
            defaultValue={this.props.volume}
            max="1"
            min="0"
            onChange={this.handleChangeVolume}
            onClick={this.handleStopPropagation}
            ref="volume"
            step="0.001"
            type="range"
          />
        </div>
      </div>
    );
  }
});
