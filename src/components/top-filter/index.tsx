import React, { FC } from 'react';
import { SelectInput, Flex, useTheme, Block } from 'vcc-ui';
import { BodyType, BodyTypeFilter } from '../../types';

interface Option {
  [key: string]: string;
}
interface Props {
  options: Option;
  label: string;
  allowEmpty?: boolean;
  value: string;
  setValue: (v: string) => void;
}

const TopFilter: FC<Props> = ({ options, label, allowEmpty, value, setValue }) => {
  const theme = useTheme();
  return (
    <>
      <Block extend={{ padding: '20px', background: theme.color.primitive.black }}>
        <Block extend={{ maxWidth: '400px' }}>
          <SelectInput value={value} allowEmpty={allowEmpty} label={label} onChange={(e) => setValue(e.target.value)}>
            {Object.entries(options).map((e) => {
              const [value, name] = e;
              return (
                <option key={value} value={value}>
                  {name}
                </option>
              );
            })}
          </SelectInput>
        </Block>
      </Block>
    </>
  );
};

export default TopFilter;
