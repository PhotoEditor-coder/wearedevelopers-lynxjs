import './MainPage.css';

import { Button } from '../components/Button.js';
import { ListBox } from '../components/ListBox.js';
import type { AppModel } from '../model/AppModel.js';
import type { RemarkModel } from '../model/RemarkModel.js';

export function MainPage(props: { appModel: AppModel }) {
  const appModel = props.appModel;

  const selectedItem: RemarkModel | undefined = appModel.selectedItem;

  return (
    <view className="mainPage">
      <ListBox
        items={appModel.listItems()}
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
            console.log('Clicked button!');
          }}
        />
      </view>
    </view>
  );
}
