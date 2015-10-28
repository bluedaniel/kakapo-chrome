import Reflux from "reflux";

const soundActions = Reflux.createActions([
  "toggleMute",
  "togglePlayPause",
  "changeVolume",
  "removeSound",
  "editSound"
]);

export default soundActions;
