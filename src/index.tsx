/// <reference path="./typings.d.ts" />

import './global.css';

import { root } from '@lynx-js/react';

import { MainPage } from './pages/MainPage.js';

root.render(<MainPage />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
