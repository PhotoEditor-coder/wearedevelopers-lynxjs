import './Button.css';

import type { CSSProperties } from '@lynx-js/types';

export interface ButtonProps {
  text: string;
  style?: string | CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element {
  return (
    <view className={'buttonView'} style={props.style}>
      <text className="buttonText">{props.text}</text>
    </view>
  );
}
