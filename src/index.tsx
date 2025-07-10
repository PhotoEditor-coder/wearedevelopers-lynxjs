/// <reference path="./typings.d.ts" />

import './global.css';

import { root } from '@lynx-js/react';

import { AppModel } from './model/AppModel.js';
import { MainPage } from './pages/MainPage.js';

const appModel: AppModel = new AppModel();
appModel.createRemark("What's coming in Q3");
appModel.createRemark('Rust+JS', 'Review several new tools');
appModel.createRemark('Share about the meetup');

root.render(<MainPage appModel={appModel} />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
