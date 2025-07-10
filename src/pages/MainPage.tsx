import './MainPage.css';

import { useSyncExternalStore } from '@lynx-js/react';

import { Bucket } from '../components/Bucket.js';
import { Button } from '../components/Button.js';
import { ListBox } from '../components/ListBox.js';
import type { AppModel } from '../model/AppModel.js';
import type { BucketId, RemarkModel } from '../model/RemarkModel.js';

export function MainPage(props: { appModel: AppModel }) {
  const appModel = props.appModel;

  useSyncExternalStore(
    appModel.subscribeCallback,
    // Render whenever any model has any kind of change
    () => appModel.generation
  );

  const selectedBucketId: BucketId = appModel.selectedBucketId;
  const selectedItem: RemarkModel | undefined = appModel.selectedItem;

  function clickBucket(bucketId: BucketId): void {
    appModel.selectedBucketId = bucketId;
  }

  return (
    <view className="mainPage">
          <view
        style={{
          linearDirection: 'row',
          justifyContent: 'end'
        }}
      >
        <Bucket
          bucketId="archived"
          highlightedBucketId={selectedBucketId}
          label="ARCHIVED"
          onClick={clickBucket}
          appModel={appModel}
        />
      </view>

      <view
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '20px'
        }}
      >
        <Bucket
          bucketId="not-ready"
          highlightedBucketId={selectedBucketId}
          label="NOT READY"
          onClick={clickBucket}
          appModel={props.appModel}
        />
        <Bucket
          bucketId="ready"
          highlightedBucketId={selectedBucketId}
          label="READY"
          onClick={clickBucket}
          appModel={props.appModel}
        />
      </view>

      <ListBox
        items={appModel.listBucket(selectedBucketId)}
        selectedItem={selectedItem}
        onSelectItem={(listItem) => {
          appModel.selectedItem = listItem;
        }}
      />
      <view
        style={{
          linearDirection: 'row',
          justifyContent: 'end'
        }}
      >
        <Button
          text={'New\u2026'}
          onClick={() => {
            let counter: number = 1;
            let title: string = `New remark`;
            while (
              Array.from(appModel.remarks).some((x) => x.title === title)
            ) {
              title = `New remark #${++counter}`;
            }
            const newRemark: RemarkModel = appModel.createRemark(
              'not-ready',
              title
            );
            appModel.selectedItem = newRemark;
            appModel.selectedBucketId = newRemark.bucketId;
          }}
        />
      </view>
    </view>
  );
}
