import Reflux from "reflux";
import RefluxPromise from "reflux-promise";

Reflux.use(new RefluxPromise(window.Promise));

export { default as soundActions } from "./soundActions";
