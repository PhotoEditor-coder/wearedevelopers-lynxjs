/// <reference path="./typings.d.ts" />

import './global.css';

import { root } from '@lynx-js/react';

import { AppModel } from './model/AppModel.js';
import { MainPage } from './pages/MainPage.js';
import { EditPage } from './pages/EditPage.js';

const appModel: AppModel = new AppModel();
appModel.createRemark('not-ready', 'Example #1');
appModel.createRemark('not-ready', 'Example #2');
appModel.createRemark('not-ready', 'Example #3');
appModel.createRemark('not-ready', 'Example #4');
const testRemark = appModel.createRemark(
  'ready',
  'TikTok Font',
  'TikTok Sans released on GitHub!'
);
appModel.createRemark('archived', 'Q2 retrospective');
appModel.createRemark(4, 'Suggest one new conference', 'TBD');
appModel.createRemark(7, "What's coming in Q3");
appModel.createRemark(7, 'Rust+JS', 'Review several new tools');
appModel.createRemark(7, 'Share about the meetup');

// root.render(<MainPage appModel={appModel} />);
root.render(<EditPage remarkModel={testRemark} />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
