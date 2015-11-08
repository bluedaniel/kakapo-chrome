import Reflux from "reflux";
import axios from "axios";
import { windowActions } from "../actions";
import kakapoAssets from "kakapo-assets";

export default Reflux.createStore({
  listenables: [windowActions],
  init() {
    const lang = localStorage.getItem("language") || "en";
    this.opts = {
      lang: lang,
      intlData: kakapoAssets.i18n.en
    };
    if (lang !== "en") {
      this.onChangeLanguage(lang);
    }
  },

  getInitialState() {
    return this.opts;
  },

  onChangeLanguage(lang) {
    axios.get(`http://data.kakapo.co/v2/i18n/${lang}.json`)
      .then(response => {
        localStorage.setItem("language", lang);
        this.opts = {
          lang: lang,
          intlData: response.data
        };
        this.trigger(this.opts);
      });
  }
});
