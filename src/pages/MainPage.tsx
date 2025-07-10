import './MainPage.css';

import { useNavigate } from 'react-router';
import { useState } from '@lynx-js/react';
import { useSyncExternalStore } from '@lynx-js/react';

import { Bucket } from '../components/Bucket.js';
import { Button } from '../components/Button.js';
import { Calendar } from '../components/Calendar.js';
import { ListBox } from '../components/ListBox.js';
import type { AppModel } from '../model/AppModel.js';
import type { BucketId, RemarkModel } from '../model/RemarkModel.js';

export function MainPage(props: { appModel: AppModel }) {
  const navigate = useNavigate();

  const appModel = props.appModel;

  useSyncExternalStore(
    appModel.subscribeCallback,
    // Render whenever any model has any kind of change
    () => appModel.generation
  );

  const selectedBucketId: BucketId = appModel.selectedBucketId;
  const selectedItem: RemarkModel | undefined = appModel.selectedItem;

  const [moving, setMoving] = useState(false);

  function clickBucket(bucketId: BucketId): void {
    if (!moving) {
      // Normal behavior; select the clicked bucket
      appModel.selectedBucketId = bucketId;
    } else {
      // The "move" button was clicked, sp move the current item to the clicked bucket
      if (selectedItem) {
        selectedItem.bucketId = bucketId;
      }
      setMoving(false);
    }
  }

  const bottomPane: JSX.Element = moving ? (
    <view className="movingNotice">
      <text style={{ fontSize: '20px' }}>Select a bucket for this item.</text>
      <Button
        text="Cancel"
        onClick={() => {
          setMoving(false);
        }}
      />
    </view>
  ) : (
    <ListBox
      items={appModel.listBucket(selectedBucketId)}
      selectedItem={selectedItem}
      onSelectItem={(listItem) => {
        appModel.selectedItem = listItem;
      }}
      onEditItem={(listItem) => {
        navigate(`/edit/${listItem.remarkId}`);
      }}
      onMoveItem={() => {
        setMoving(true);
      }}
    />
  );

  const highlightedBucketId: BucketId | undefined = moving
    ? undefined
    : selectedBucketId;

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
          highlightedBucketId={highlightedBucketId}
          label="ARCHIVED"
          onClick={clickBucket}
          appModel={appModel}
        />
      </view>

      <Calendar
        appModel={props.appModel}
        highlightedBucketId={highlightedBucketId}
        currentDay={4}
        onClickBucket={clickBucket}
      />

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

      {bottomPane}

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
