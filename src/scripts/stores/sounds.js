import Reflux from "reflux";
import {Map} from "immutable";
import axios from "axios";
import throttle from "lodash/function/throttle";
import { createSoundObj } from "../api";
import { soundActions } from "../actions";
import { toasterInstance } from "../utils";

let sounds = new Map(JSON.parse(localStorage.getItem("sounds")));
let howls = new Map();
let mute = false;

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
      axios.get("http://data.kakapo.co/data/sounds.json")
        .then(resp => resolve(resp.data));
    });
  },

  getHowl(_s) {
    return new Promise(resolve => {
      const currentHowl = howls.get(_s.file);
      if (currentHowl) return resolve(currentHowl);
      createSoundObj(_s)
        .then(res => howls = howls.set(_s.file, res))
        .then(() => resolve(howls.get(_s.file)));
    });
  },

  setSounds(data) {
    data.forEach(_s => sounds = sounds.set(_s.file, {..._s, ...{ recentlyDownloaded: false }}));
    this.setAutoPlay();
    this.trigger(sounds);
  },

  setAutoPlay() {
    sounds.forEach(_s => {
      if (_s.playing) this.getHowl(_s).then(howl => howl.play());
    });
    if (mute) this.onToggleMute(mute);
  },

  onToggleMute(muteToggle) {
    mute = muteToggle;
    sounds.forEach(_s => this.getHowl(_s).then(howl => howl.mute(muteToggle)));
  },

  onTogglePlayPause(sound) {
    sounds = sounds.update(sound.file, _s => ({..._s, ...{ playing: !_s.playing }}));
    this.getHowl(sound).then(howl => {
      if (sound.playing) return howl.pause();
      howl.play();
      if (mute) toasterInstance().then(_t => _t.toast("Kakapo is currently muted!"));
    });
    this.trigger(sounds);
  },

  onChangeVolume(sound, volume) {
    sounds = sounds.update(sound.file, _s => ({..._s, ...{ volume: volume }}));
    this.getHowl(sound).then(howl => howl.volume(volume));
    this.trigger(sounds);
  },

  onEditSound(sound, newData) {
    let opts = { editing: !sound.editing };
    if (typeof (newData) !== "undefined") opts = {...opts, ...newData};
    sounds = sounds.update(sound.file, _s => ({..._s, ...opts}));
    this.trigger(sounds);
  },

  onRemoveSound(sound) {
    this.getHowl(sound).then(howl => howl.unload());
    sounds = sounds.delete(sound.file);
    this.trigger(sounds);
  },

  soundDownloaded(sound) {
    toasterInstance().then(_t => _t.toast(`${sound.name} has been added.`));
    sounds = sounds.set(sound.file, {...sound, ...{ progress: 1 }});
    this.trigger(sounds);
    howls = howls.set(sound.file, createSoundObj(sound));
    if (mute) this.onToggleMute(mute);
  },

  // SoundCloud Listeners
  onGetSoundCloudURLCompleted(sound) {
    this.soundDownloaded(sound);
  },

  onGetSoundCloudURLFailed(error) {
    toasterInstance().then(_t => _t.toast(error));
  },

  // YouTube Listeners
  onGetYoutubeURLCompleted(sound) {
    this.soundDownloaded(sound);
  },

  onGetYoutubeURLFailed(error) {
    toasterInstance().then(_t => _t.toast(error));
  },

  // Custom url Listeners
  onGetCustomURLCompleted(sound) {
    this.soundDownloaded(sound);
  },

  onGetCustomURLFailed(error) {
    toasterInstance().then(_t => _t.toast(error));
  }
});

SoundStore.listen(throttle(data => {
  let obj = new Map();
  data.forEach(_s => obj = obj.set(_s.file, {..._s}));
  localStorage.setItem("sounds", JSON.stringify(obj));
}, 1000));

export default SoundStore;
