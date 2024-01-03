// ISR (Incremental Site Regeneration)
// use client 쓰지 마세요.
// 주재훈 작성.

import AdvertisementContainer from '@/containers/home/advertisement/ssr';
import CategoryContainer from '@/containers/home/category/ssr';
import ProductRankingContainer from '@/containers/home/productRanking/ssr';
import { useDarkMode } from '@/hooks/context/darkMode';



async function fetchAdvertisementServerRenderedData() {
  // const response = await fetch('api-endpoint');
  // { cache: 'no-store' } <-- 캐시 강제 (isr)
  // const data = await response.json();
  // return data.serverRenderedData;
  const data = 'AdvertisementContainer'
  return data;
}

async function fetchCategoryServerRenderedData() {
  // const response = await fetch('api-endpoint');
  // { cache: 'no-store' } <-- 캐시 강제 (isr)
  // const data = await response.json();
  // return data.serverRenderedData;
  const categoryData = ['outer', 'top', 'pants', 'shoes', 'hat', 'bag', 'accessary', 'headwear', 'onepiece', 'skirt', 'socks', 'sports', 'underwear']; 
  return categoryData;
}

async function fetchProductRankingServerRenderedData() {
  // const response = await fetch('api-endpoint');
  // { cache: 'no-store' } <-- 캐시 강제 (isr)
  // const data = await response.json();
  // return data.serverRenderedData;
  const ProductRankingData = [
    {
      type: 'popular',
      desc: '위버스몰 인기상품'
    },
    {
      type: 'discount',
      desc: '지금 놓치면 아쉬운 할인전!'
    },
    {
      type: 'point', 
      desc: '포인트가 많이 쌓였다면?'
    }
  ]
  return ProductRankingData;
}


export default async function HomePage() {

  const AdvertisementData = await fetchAdvertisementServerRenderedData();
  const CategoryData = await fetchCategoryServerRenderedData();
  const ProductRankingData = await fetchProductRankingServerRenderedData();
  return (
    <main className='Main flex flex-col  w-full min-h-[1300px] pt-[80px]'>
      <AdvertisementContainer serverRenderedData={AdvertisementData}/>
      <CategoryContainer serverRenderedData={CategoryData}/>
      <ProductRankingContainer serverRenderedData={ProductRankingData}/>
    </main>
  );
};

