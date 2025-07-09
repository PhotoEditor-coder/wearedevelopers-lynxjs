import './MainPage.css';

import { Button } from '../components/Button.js';

export function MainPage() {
  return (
    <view className="mainPage">
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
