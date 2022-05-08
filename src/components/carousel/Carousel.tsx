import React, { FC, ReactNode, Ref, useEffect, useRef, useState } from 'react';
import { Block, Flex, Click, useTheme } from 'vcc-ui';
import { useFela } from 'react-fela';

// Import Swiper React components
import { Swiper, SwiperProps, SwiperSlide, SwiperSlideProps } from 'swiper/react';
// import required modules
import { Pagination, Navigation } from 'swiper';
// Import swiper css
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/pagination';

import Arrow from './Arrow';

// Import types
import { Swiper as SwiperClass } from 'swiper/types';
import { SwiperComponent } from 'swiper/angular';
import { Extendable } from 'vcc-ui/lib/types/shared';

interface Props extends Extendable {
  data: ReactNode[];
}

type SliderButtonRef = HTMLElement | null;
// Not exposed by vcc-ui as a constant
const MOBILE_THRESHOLD = 1024;

const Carousel: FC<Props> = ({ data, extend }) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass>();
  const [nextButtonDisable, setNextButtonDisable] = useState(false);
  const [prevButtonDisable, setPrevButtonDisable] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const { css, renderer } = useFela();
  const theme = useTheme();
  renderer.renderStatic(`
    .swiper-pagination-bullet.swiper-pagination-bullet-active {
      background: ${theme.color.primitive.black};
    }
    .swiper-pagination-bullet {
      background: ${theme.color.ornament.divider};
      opacity: 1;
    }   
  `);

  useEffect(() => {
    const initialResize = window.innerWidth < MOBILE_THRESHOLD;
    if (isMobile !== initialResize) {
      setIsMobile(initialResize);
    }
    const resize = () => {
      const resizeMobile = window.innerWidth < MOBILE_THRESHOLD;
      if (isMobile !== resizeMobile) {
        setIsMobile(resizeMobile);
      }
    };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [theme, isMobile, setIsMobile]);

  const mobileProps: SwiperProps = {
    pagination: { type: 'bullets', dynamicBullets: false },
  };

  // Responsive design to get the best look at certain width thresholds
  const commonProps: SwiperProps = {
    spaceBetween: 25,
    simulateTouch: true,
    updateOnWindowResize: true,
    breakpoints: {
      // Iphone SE
      300: {
        slidesPerView: 1.2,
      },
      400: {
        slidesPerView: 1.4,
      },
      600: {
        slidesPerView: 2.4,
      },
      1200: {
        slidesPerView: 4,
      },
    },
    onSlideChange: (swiper: SwiperClass) => {
      const { activeIndex } = swiper;
      if (activeIndex === 0) {
        if (nextButtonDisable) {
          setNextButtonDisable(false);
        }
        if (!prevButtonDisable) {
          setPrevButtonDisable(true);
        }
      } else if (activeIndex > 0 && activeIndex < data.length) {
        if (nextButtonDisable) {
          setNextButtonDisable(false);
        }
        if (prevButtonDisable) {
          setPrevButtonDisable(false);
        }
      } else if (activeIndex === data.length) {
        if (!nextButtonDisable) {
          setNextButtonDisable(true);
        }
        if (prevButtonDisable) {
          setPrevButtonDisable(false);
        }
      }
    },
    modules: [Pagination, Navigation],
  };

  const SwipterProps = {
    ...commonProps,
    ...(isMobile ? mobileProps : {}),
  };

  return (
    <Block extend={{ padding: '20px 10px 50px 10px', ...extend }}>
      <Swiper key={'' + isMobile} onSwiper={setSwiperInstance} {...SwipterProps}>
        {data.map((rn, index) => {
          return (
            <SwiperSlide key={index} className={css({ marginBottom: isMobile ? '40px' : 0 })}>
              {rn}
            </SwiperSlide>
          );
        })}
        {!isMobile && (
          <Flex extend={{ flexDirection: 'row', justifyContent: 'flex-end', columnGap: '6px' }}>
            <Flex>
              <Arrow onClick={() => swiperInstance?.slidePrev()} disabled={prevButtonDisable} flipped />
            </Flex>
            <Flex>
              <Arrow onClick={() => swiperInstance?.slideNext()} disabled={nextButtonDisable} />
            </Flex>
          </Flex>
        )}
      </Swiper>
    </Block>
  );
};

export default Carousel;
