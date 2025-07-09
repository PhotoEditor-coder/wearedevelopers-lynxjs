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

  const classNames: string[] = ['bucket'];
  if (props.highlightedBucketId === props.bucketId) {
    classNames.push('bucketSelected');
  }

  return (
    <view
      className={classNames.join(' ')}
      bindtouchstart={onClick ? () => onClick(props.bucketId) : undefined}
    >
      <text className="bucketText">{props.label}</text>
    </view>
  );
}
