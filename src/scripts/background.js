import {Map} from "immutable";
import howler from "howler";
import path from "path";

let howls = new Map();

function updateIcon() {
  let count = 0;
  howls.map(_h => _h.playing() ? count++ : null);
  chrome.browserAction.setBadgeBackgroundColor({ color: "#333333" });
  chrome.browserAction.setBadgeText({ text: count ? `${count}` : "" });
  chrome.browserAction.setIcon({ path: { 38: `/favicons/${count ? "icon76" : "icon76-inactive"}.png` }});
}
updateIcon();

function setHowl(sound) {
  return new howler.Howl({
    src: [`http://data.kakapo.co/v2/sounds/${path.basename(sound.file)}.m4a`],
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
  updateIcon();
});
