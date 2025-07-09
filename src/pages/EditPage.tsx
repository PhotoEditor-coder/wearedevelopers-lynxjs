import './EditPage.css';

import { useNavigate } from 'react-router';
import {
  type RefObject,
  useEffect,
  useRef,
  useSyncExternalStore
} from '@lynx-js/react';
import type { NodesRef } from '@lynx-js/types';

import type {
  InputGetValueMethod,
  InputSetValueMethod,
  TextAreaGetValueMethod,
  TextAreaSetValueMethod
} from '../typings.js';
import { Button } from '../components/Button.js';
import type { RemarkModel } from '../model/RemarkModel.js';

export function EditPage(props: { remarkModel: RemarkModel }) {
  const navigate = useNavigate();
  const remarkModel = props.remarkModel;
  const appModel = remarkModel.appModel;

  useSyncExternalStore(
    appModel.subscribeCallback,
    // Rerender only when this specific remarkModel has changed
    () => remarkModel.generation
  );

  const titleRef: RefObject<NodesRef> = useRef(null);
  const detailsRef: RefObject<NodesRef> = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current
        .invoke({
          method: 'setValue',
          params: { value: remarkModel.title }
        } satisfies InputSetValueMethod)
        .exec();
    }
    if (detailsRef.current) {
      detailsRef.current
        .invoke({
          method: 'setValue',
          params: { value: remarkModel.details }
        } satisfies TextAreaSetValueMethod)
        .exec();
    }
  }, []);

  return (
    <view className="editPage">
      <text className="editPageHeading">REMARK TITLE</text>
      <input
        ref={titleRef}
        bindinput={() => {
          if (titleRef.current) {
            titleRef.current
              .invoke({
                method: 'getValue',
                success: (result): void => {
                  if (result.value !== undefined) {
                    remarkModel.title = result.value;
                  }
                }
              } satisfies InputGetValueMethod)
              .exec();
          }
        }}
      />
      <text className="editPageHeading">DETAILS</text>
      <textarea
        placeholder="Add some notes..."
        ref={detailsRef}
        bindinput={() => {
          if (detailsRef.current) {
            detailsRef.current
              .invoke({
                method: 'getValue',
                success: (result): void => {
                  if (result.value !== undefined) {
                    remarkModel.details = result.value;
                  }
                }
              } satisfies TextAreaGetValueMethod)
              .exec();
          }
        }}
      />
      <view
        style={{
          display: 'linear',
          linearDirection: 'row',
          justifyContent: 'end',
          marginTop: '10px'
        }}
      >
          <Button text={'Delete\u2026'} />
        <Button
          text="Done"
          style={{ marginLeft: '10px' }}
          onClick={() => navigate('/')}
        />
      </view>
    </view>
  );
}
