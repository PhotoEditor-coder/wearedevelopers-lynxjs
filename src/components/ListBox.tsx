import './ListBox.css';

import { Button } from './Button.js';
import type { RemarkModel } from '../model/RemarkModel.js';

export interface ListBoxProps {
  items: readonly RemarkModel[];
  selectedItem?: RemarkModel;
  onSelectItem: (listItem: RemarkModel) => void;
  onEditItem: (listItem: RemarkModel) => void;
  onMoveItem: (listItem: RemarkModel) => void;
}

export function ListBox(props: ListBoxProps): JSX.Element {
  const rows: JSX.Element[] = [];

  let index: number = 0;
  for (const item of props.items) {
    const classNames: string[] = ['listboxRow'];
    let buttons: JSX.Element | undefined = undefined;

    if (props.selectedItem === item) {
      buttons = (
        <>
          <Button
            text={'Edit\u2026'}
            style={{ flexShrink: 0 }}
            onClick={() => props.onEditItem(item)}
          />
          <Button
            text={'\u25B2 Move'}
            style={{ flexShrink: 0 }}
            onClick={() => props.onMoveItem(item)}
          />
        </>
      );
      classNames.push('listboxSelectedRow');
    }

    rows.push(
      <view
        key={index}
        className={classNames.join(' ')}
        bindtap={() => props.onSelectItem(item)}
      >
        <text className="listboxText">{item.title}</text>
        {buttons}
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
