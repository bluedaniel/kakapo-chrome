import semver from "semver";
import Reflux from "reflux";
import {Map} from "immutable";
import axios from "axios";
import throttle from "lodash/function/throttle";
import { soundActions } from "../actions";
import { toasterInstance } from "../utils";
import packageJson from "../../../package.json";

let mute = false;
let sounds = new Map(JSON.parse(localStorage.getItem("sounds")));
let version = localStorage.getItem("version");

if (semver.lte(version || "0.0.1", packageJson.version)) sounds.clear();
localStorage.setItem("version", packageJson.version);

const SoundStore = Reflux.createStore({
  listenables: [soundActions],
  init() {
    this.getSounds().then(data => this.setSounds(data));
  },

  getInitialState() {
    return sounds;
  },

  getSounds() {
    return new Promise(resolve => {
      if (sounds.size) {
        new Promise(res => window.onYouTubeIframeAPIReady = res(true))
          .then(resolve(sounds));
      }
      axios.get("http://data.kakapo.co/v2/data/sounds.json")
        .then(resp => resolve(resp.data));
    });
  },

  setSounds(data) {
    data.forEach(_s => {
      sounds = sounds.set(_s.file, {..._s, ...{ recentlyDownloaded: false }});
      chrome.extension.sendMessage({
        sound: _s,
        action: "set"
      });
    });
    if (mute) this.onToggleMute(mute);
    this.trigger(sounds);
  },

  onToggleMute(muteToggle) {
    mute = muteToggle;
    chrome.extension.sendMessage({
      action: "mute",
      status: mute
    });
  },

  onTogglePlayPause(sound) {
    sounds = sounds.update(sound.file, _s => ({..._s, ...{ playing: !_s.playing }}));
    chrome.extension.sendMessage({
      sound: sound,
      action: "playpause"
    });
    if (mute && !sound.playing) toasterInstance().then(_t => _t.toast("Kakapo is currently muted!"));
    this.trigger(sounds);
  },

  onChangeVolume(sound, volume) {
    sounds = sounds.update(sound.file, _s => ({..._s, ...{ volume: volume }}));
    chrome.extension.sendMessage({
      sound: sound,
      action: "volume",
      status: volume
    });
    this.trigger(sounds);
  }
});

SoundStore.listen(throttle(data => {
  let obj = new Map();
  data.forEach(_s => obj = obj.set(_s.file, {..._s}));
  localStorage.setItem("sounds", JSON.stringify(obj));
}, 1000));

export default SoundStore;
