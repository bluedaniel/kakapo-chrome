import getHowlerObj from "./howler";

function createSoundObj(sound) {
  return new Promise(resolve => resolve(getHowlerObj(sound)));
}

export default {
  createSoundObj
};
