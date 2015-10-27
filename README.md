<img src="http://www.kakapo.co/icons/social/kakapo.png" width="128" height="128" align="right" />

[Kakapo](http://kakapo.co) is an open source ambient sound mixer for relaxation or productivity.

There is also an offline Mac/Windows/Linux version in development using [Electron](https://github.com/atom/electron) at [https://github.com/bluedaniel/Kakapo-app](https://github.com/bluedaniel/Kakapo-app).

It's built with [ReactJS](https://github.com/facebook/react) in ES6. It also uses some of the following frameworks/libraries:

- [Babel](https://github.com/babel/babel) - To transform ES6 code.
- [Reflux](https://github.com/reflux/refluxjs) - Data stores and state management.
- [ImmutableJs](https://github.com/facebook/immutable-js) - Sound data store uses immutable maps.
- [HowlerJs](https://github.com/goldfire/howler.js) - Handles audio objects.
- [ReactIntl](https://github.com/yahoo/react-intl) - Internationalisation.
- [RxJS](https://github.com/Reactive-Extensions/RxJS) - Search functionality uses observables.
- [Webpack](https://github.com/webpack/webpack) for building.

<img src="http://www.kakapo.co/images/screenshot.png" width="728" height="533" />

## Install and build
Simply clone the repo, install dependencies and run the npm build task.

``` bash
$ git clone https://github.com/bluedaniel/Kakapo-web.git

$ cd Kakapo-web && npm install && bower install

$ npm run start
```

The app should now be running at `http://localhost:3000` with live reloading enabled.

## Deploy
At present, the deploy process is tightly coupled to AWS S3 and the domain [http://kakapo.co](http://kakapo.co). It shouldn't be too difficult to modify if you want to do so.

## Contribute
You are most welcome to do with this repo what you will :smile:.

It would be cool to have the app translated into other languages (json files in `app/i18n`) but any types of contribution, be it ideas, bug fixes, fixing typos, will be appreciated !
