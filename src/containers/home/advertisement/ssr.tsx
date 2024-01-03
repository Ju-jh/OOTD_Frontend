// SSR (Server Side Rendering) Container
// 주재훈 작성.

import React from 'react';
import AdvertisementComponent from '@/components/home/advertisement/csr';

type Data = {
  serverRenderedData: string;
}

export default function AdvertisementContainer({ serverRenderedData }: Data) {
  return (
    <section
      className='w-full h-[150px] p-[5px]'
    >
      <AdvertisementComponent />
    </section>
  );
};


