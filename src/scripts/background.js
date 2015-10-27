import howler from "howler";
import {Map} from "immutable";

let howls = new Map();

function setHowl(sound) {
  return new howler.Howl({
    src: [sound.file],
    html5: true,
    loop: true,
    volume: sound.volume,
    autoplay: sound.playing
  });
}

chrome.extension.onMessage.addListener(req => {
  if (req.action === "set") {
    if (!howls.get(req.sound.file)) howls = howls.set(req.sound.file, setHowl(req.sound));
  }
  if (req.action === "mute") {
    howls.map(_h => _h.mute(req.status));
  }
  if (req.action === "playpause") {
    if (req.sound.playing) {
      howls.get(req.sound.file).pause();
    } else {
      howls.get(req.sound.file).play();
    }
  }
  if (req.action === "volume") {
    howls.get(req.sound.file).volume(req.status);
  }
});
