<img src="https://raw.githubusercontent.com/bluedaniel/Kakapo-assets/master/images/kakapo_border.png" width="128" height="128" align="right" />

[Kakapo](http://kakapo.co) is an open source ambient sound mixer for relaxation or productivity, available on the [Chrome Web Store](https://chrome.google.com/webstore/detail/kakapo-for-chrome/hjbpmbeapabclfmopcoblnhcglplffmp).

See also: [Kakapo for Desktop & Web](https://github.com/bluedaniel/Kakapo-app) - [Kakapo for iOS & Android](https://github.com/bluedaniel/Kakapo-native).

It's built with [ReactJS](https://github.com/facebook/react) in ES6. It also uses some of the following frameworks/libraries:

- [Babel](https://github.com/babel/babel) - To transform ES6 code.
- [Reflux](https://github.com/reflux/refluxjs) - Data stores and state management.
- [ImmutableJs](https://github.com/facebook/immutable-js) - Sound data store uses immutable maps.
- [HowlerJs](https://github.com/goldfire/howler.js) - Handles audio objects.
- [Webpack](https://github.com/webpack/webpack) for building.

<img src="https://raw.githubusercontent.com/bluedaniel/Kakapo-assets/master/images/screenshots/chrome.png" width="500" height="654" />

## Install and build
Simply clone the repo, install dependencies and run the npm build task.

``` bash
$ git clone https://github.com/bluedaniel/Kakapo-chrome.git

$ cd kakapo-chrome && npm install && bower install

# Deployment with watch task
$ npm run serve

# Production with minification
$ npm run build release
```

To add the local extension to Chrome, go to `Settings > Load unpacked extension` and point to the `kakapo-chrome/build` folder.

## Contribute
You are most welcome to do with this repo what you will :smile:.

It would be cool to have the app translated into other languages (json files in `app/i18n`) but any types of contribution, be it ideas, bug fixes, fixing typos, will be appreciated !
