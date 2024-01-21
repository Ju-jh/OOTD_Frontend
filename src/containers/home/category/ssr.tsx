// SSR (Server Side Rendering) Container
// 주재훈 작성.

import CategoryComponent from '@/components/home/category/csr';
import React from 'react';

type Data = {
  serverRenderedData: string[];
}


const CategoryContainer = ({ serverRenderedData }: Data) => {
  return (
    <section className='w-[100%] h-[150px] mx-auto p-[20px] mb-[5px] '>
      <CategoryComponent serverRenderedData={serverRenderedData} />
    </section>
  );
};

export default CategoryContainer