/// <reference path="./typings.d.ts" />

import './global.css';

import { MemoryRouter, Navigate, Route, Routes, useParams } from 'react-router';
import { root } from '@lynx-js/react';

import { AppModel } from './model/AppModel.js';
import { MainPage } from './pages/MainPage.js';
import { EditPage } from './pages/EditPage.js';
import type { RemarkModel } from './model/RemarkModel.js';

const appModel: AppModel = new AppModel();
appModel.createRemark('not-ready', 'Example #1');
appModel.createRemark('not-ready', 'Example #2');
appModel.createRemark('not-ready', 'Example #3');
appModel.createRemark('not-ready', 'Example #4');
appModel.createRemark(
  'ready',
  'TikTok Font',
  'TikTok Sans released on GitHub!'
);
appModel.createRemark('archived', 'Q2 retrospective');
appModel.createRemark(4, 'Suggest one new conference', 'TBD');
appModel.createRemark(7, "What's coming in Q3");
appModel.createRemark(7, 'Rust+JS', 'Review several new tools');
appModel.createRemark(7, 'Share about the meetup');

function EditRoute() {
  const { id } = useParams<{ id: string }>();
  const remarkId: number = parseInt(id ?? '');
  if (!isNaN(remarkId)) {
    const remark: RemarkModel | undefined = appModel.findRemarkById(remarkId);
    if (remark) {
      return <EditPage remarkModel={remark} />;
    }
  }
  console.error(`Remark not found with id #${id}`);
  return <Navigate to={'/'} replace />;
}

root.render(
  <MemoryRouter>
    <Routes>
      <Route path="/" element={<MainPage appModel={appModel} />} />
      <Route path="/edit/:id" element={<EditRoute />} />
    </Routes>
  </MemoryRouter>
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
