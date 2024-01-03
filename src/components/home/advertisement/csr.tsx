// CSR (Client Side Rendering) Component
// 주재훈 작성.

'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AdvertisementButton } from './advertisementButton/csr';
import { ADS_LINK } from '@/constants/link';

function AdvertisementComponent() {

  const [currentImage, setCurrentImage] = useState(1);

  const clickCircleBtn = (num : number) => {
    setCurrentImage(num)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextImage = (currentImage % 3) + 1;
      setCurrentImage(nextImage);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentImage]);

  return (
    <>
      <Link href={`/ads/${currentImage}`}>
        <div className='w-full h-full rounded-lg overflow-hidden relative'>
          <Image src={`${ADS_LINK}${currentImage}.png`} alt={'adImage'} fill={true}	priority={true}	/>
        </div>
      </Link>
      <AdvertisementButton currentImage={currentImage} clickCircleBtn={clickCircleBtn} />
    </>
  );
};

export default AdvertisementComponent


