import React, { FC } from 'react';
import { useFela } from 'react-fela';
import { Click } from 'vcc-ui';
import ArrowIconSvg from '../../../docs/chevron-circled.svg';

interface Props {
  onClick: () => void;
  disabled: boolean;
  flipped?: boolean;
}

const Arrow: FC<Props> = ({ onClick, disabled, flipped }) => {
  const { css } = useFela();
  return (
    <Click onClick={onClick}>
      <img
        {...ArrowIconSvg}
        alt={'arrow.svg'}
        className={css({ transform: `rotate(${flipped ? '180deg' : '0deg'})`, opacity: disabled ? 0.5 : 1 })}
      />
    </Click>
  );
};

export default Arrow;
