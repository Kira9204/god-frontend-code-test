import React, { FC, ReactNode, useEffect, useState } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getCars } from '../public/api';
import { BodyType, BodyTypeFilter, ICar, SetFilterValue } from '../src/types';
import TopFilter from '../src/components/top-filter';
import Carousel from '../src/components/carousel';
import CarItem from '../src/components/car-item';
import { useFela } from 'react-fela';

const filterCarBodyType = (type: string, cars: ICar[]): ICar[] => {
  if (type === '') {
    return cars;
  }
  return cars.filter((e) => e.bodyType === type);
};

const buildCarItems = (cars: ICar[]): ReactNode[] => {
  return cars.map((car) => {
    return <CarItem key={car.id} car={car} />;
  });
};

interface Props extends InferGetStaticPropsType<typeof getStaticProps> {
  cars: ICar[];
}
const Home: FC<Props> = ({ cars }) => {
  const [bodyTypeFiler, setBodyTypeFilter] = useState<BodyTypeFilter>('');
  // Avoid re-creating carousel items every render
  const [carElements, setCarElements] = useState<ReactNode[]>();
  const { css } = useFela();

  useEffect(() => {
    const filteredCars = filterCarBodyType(bodyTypeFiler, cars);
    const elements = buildCarItems(filteredCars);
    setCarElements(elements);
  }, [bodyTypeFiler, cars]);

  return (
    <>
      <TopFilter
        label={'Body type'}
        options={BodyType}
        value={bodyTypeFiler}
        setValue={setBodyTypeFilter as SetFilterValue}
        allowEmpty
      />
      {carElements && <Carousel data={carElements} />}
    </>
  );
};

export default Home;
export const getStaticProps: GetStaticProps = async () => {
  const cars = await getCars();
  return {
    props: {
      cars,
    },
  };
};
