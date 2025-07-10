import './Calendar.css';

import { useSyncExternalStore } from '@lynx-js/react';

import type { BucketId } from '../model/RemarkModel.js';
import type { AppModel } from '../model/AppModel.js';

export interface CalendarProps {
  appModel: AppModel;

  highlightedBucketId?: BucketId;
  currentDay: number;

  onClickBucket: (bucketId: BucketId) => void;
}

const DAY_NAMES: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function Calendar(props: CalendarProps): JSX.Element {
  const appModel = props.appModel;

  useSyncExternalStore(
    appModel.subscribeCallback,
    // Render whenever any model has any kind of change
    () => appModel.generation
  );

  const cells: JSX.Element[] = [];

  let i: number = 0;
  for (; i < 7; ++i) {
    const classNames: string[] = ['calendarCell'];
    classNames.push('calendarFirstRow');

    if (i === props.currentDay) {
      classNames.push('calendarCurrentDay');
    }

    cells.push(
      <text className={classNames.join(' ')} key={i}>
        {DAY_NAMES[i]}
      </text>
    );
  }
  for (; i < 21; ++i) {
    const cellIndex: number = i - 7;
    const classNames: string[] = ['calendarCell'];

    const enabled: boolean =
      cellIndex >= props.currentDay - 1 && cellIndex <= props.currentDay + 6;
    if (!enabled) {
      classNames.push('calendarDisabledCell');
    }
    if (cellIndex === props.highlightedBucketId) {
      classNames.push('calendarSelectedCell');
    }

    const itemCount: number = appModel.listBucket(cellIndex).length;

    const label: string | undefined =
      itemCount > 0 ? `(${itemCount})` : undefined;

    cells.push(
      <text
        className={classNames.join(' ')}
        key={i}
        bindtouchstart={
          enabled ? () => props.onClickBucket(cellIndex) : undefined
        }
      >
        {label}
      </text>
    );
  }

  return <view className="calendarGrid">{cells}</view>;
}
