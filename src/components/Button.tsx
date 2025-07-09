import './Button.css';

import { useState } from '@lynx-js/react';
import type { CSSProperties } from '@lynx-js/types';

export interface ButtonProps {
  text: string;
  style?: string | CSSProperties;
  onClick?: () => void;
}

export function Button(props: ButtonProps): JSX.Element {
  const [isActive, setActive] = useState<boolean>(false);

  function onTouchEnd(): void {
    setActive(false);
  }

  return (
    <view
      className={isActive ? 'buttonViewTouched' : 'buttonView'}
      style={props.style}
      bindtap={props.onClick}
      bindtouchstart={() => setActive(true)}
      bindtouchend={onTouchEnd}
      bindtouchcancel={onTouchEnd}
    >
      <text className="buttonText">{props.text}</text>
    </view>
  );
}
