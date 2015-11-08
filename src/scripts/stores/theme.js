import Reflux from "reflux";
import { themeActions } from "../actions";
import kakapoAssets from "kakapo-assets";

const Theme = Reflux.createStore({
  listenables: [themeActions],
  init() {
    this.styles = JSON.parse(localStorage.getItem("theme")) || kakapoAssets.theme;
  },

  getInitialState() {
    return this.styles;
  }
});

export default Theme;
