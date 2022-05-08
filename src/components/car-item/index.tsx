import React, { FC } from 'react';
import { Block, Text, useTheme, Link, Flex } from 'vcc-ui';
import { useFela } from 'react-fela';

import { ICar } from '../../types';

interface Props {
  car: ICar;
}

const CarItem: FC<Props> = ({ car }) => {
  const theme = useTheme();
  const { css } = useFela();
  return (
    <Block>
      <Link href={`/learn/${car.id}`} className={css({ color: 'unset', textDecoration: 'none' })}>
        <Flex>
          <Text
            extend={{ color: theme.color.foreground.secondary, textTransform: 'uppercase' }}
            variant="bates"
            subStyle="emphasis"
          >
            {car.bodyType}
          </Text>
          <Flex extend={{ margin: '0', flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text as="span" extend={{ marginRight: '5px' }} subStyle="emphasis" variant="columbus">
              {car.modelName}
            </Text>
            <Text
              as="span"
              extend={{ color: theme.color.foreground.secondary, textTransform: 'capitalize' }}
              variant="columbus"
            >
              {car.modelType}
            </Text>
          </Flex>
          <Block extend={{ margin: '16px 0' }}>
            <img width="100%" src={car.imageUrl} alt={car.modelType} />
          </Block>
        </Flex>
      </Link>
      <Flex extend={{ justifyContent: 'space-around', flexWrap: 'wrap', flexDirection: 'row' }}>
        <Link href={`/learn/${car.id}`} arrow="right">
          Learn
        </Link>
        <Link href={`/shop/${car.id}`} arrow="right">
          Shop
        </Link>
      </Flex>
    </Block>
  );
};

export default CarItem;
