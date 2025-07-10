import './ListBox.css';

import { useState } from '@lynx-js/react';

interface MockItem {
  title: string;
}

const items = [
  { title: "What's coming in Q3" },
  { title: 'Rust+JS' },
  { title: 'Share about the meetup' }
];

export function ListBox(): JSX.Element {
  const [selectedItem, setSelectedItem] = useState<MockItem | undefined>(
    undefined
  );

  const rows: JSX.Element[] = [];

  let index: number = 0;
  for (const item of items) {
    const classNames: string[] = ['listboxRow'];

    if (selectedItem === item) {
      classNames.push('listboxSelectedRow');
    }

    rows.push(
      <view
        key={index}
        className={classNames.join(' ')}
        bindtap={() => setSelectedItem(item)}
      >
        <text className="listboxText">{item.title}</text>
      </view>
    );

    ++index;
  }

  return (
    <scroll-view scroll-orientation="vertical" className="listbox">
      {rows}
    </scroll-view>
  );
}
