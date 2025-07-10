import './ListBox.css';

import type { RemarkModel } from '../model/RemarkModel.js';

export interface ListBoxProps {
  items: readonly RemarkModel[];
  selectedItem?: RemarkModel;
  onSelectItem: (listItem: RemarkModel) => void;
}

export function ListBox(props: ListBoxProps): JSX.Element {
  const rows: JSX.Element[] = [];

  let index: number = 0;
  for (const item of props.items) {
    const classNames: string[] = ['listboxRow'];

    if (props.selectedItem === item) {
      classNames.push('listboxSelectedRow');
    }

    rows.push(
      <view
        key={index}
        className={classNames.join(' ')}
        bindtap={() => props.onSelectItem(item)}
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
