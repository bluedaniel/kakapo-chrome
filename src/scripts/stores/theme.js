import Reflux from "reflux";
import { themeActions } from "../actions";
import defaultTheme from "../../data/theme.json";

const Theme = Reflux.createStore({
  listenables: [themeActions],
  init() {
    this.styles = JSON.parse(localStorage.getItem("theme")) || defaultTheme;
  },

  getInitialState() {
    return this.styles;
  }
});

export default Theme;
