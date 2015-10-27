import getHowlerObj from "./howler";
import { getCustomURL, getKakapoFavourites } from "./customUrl";
import { getYoutubeObj, getYoutubeSearch, getYoutubeURL } from "./youtube";
import { getSoundCloudSearch, getSoundCloudURL, getSoundCloudObj } from "./soundcloud";

function createSoundObj(sound) {
  return new Promise(resolve => {
    switch (sound.source) {
    case "soundcloudStream":
      resolve(getSoundCloudObj(sound));
      break;
    case "youtubeStream":
      resolve(getYoutubeObj(sound));
      break;
    default:
      resolve(getHowlerObj(sound));
    }
  });
}

export default {
  getCustomURL,
  getKakapoFavourites,
  getSoundCloudSearch,
  getSoundCloudURL,
  getYoutubeSearch,
  getYoutubeURL,
  createSoundObj
};
