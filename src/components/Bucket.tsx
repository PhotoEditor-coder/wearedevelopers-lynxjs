import { useSyncExternalStore } from '@lynx-js/react';

import type { BucketId } from '../model/RemarkModel.js';
import type { AppModel } from '../model/AppModel.js';
import './Bucket.css';

export interface BucketProps {
  label: string;

  bucketId: BucketId;
  highlightedBucketId?: BucketId;

  appModel: AppModel;

  onClick?: (bucketId: BucketId) => void;
}

export function Bucket(props: BucketProps): JSX.Element {
  const appModel = props.appModel;
  const onClick = props.onClick;

  useSyncExternalStore(
    appModel.subscribeCallback,
    // Rerender only if itemCount will change (i.e. the cached object is recreated)
    () => appModel.listBucket(props.bucketId)
  );

  const classNames: string[] = ['bucket'];
  if (props.highlightedBucketId === props.bucketId) {
    classNames.push('bucketSelected');
  }

  const itemCount: number = appModel.listBucket(props.bucketId).length;
  const label: string = `${props.label} (${itemCount})`;

  return (
    <view
      className={classNames.join(' ')}
      bindtouchstart={onClick ? () => onClick(props.bucketId) : undefined}
    >
      <text className="bucketText">{label}</text>
    </view>
  );
}
