// SSR (Server Side Rendering) Container
// 주재훈 작성.
import React from 'react';

type Data = {
  serverRenderedData: {
    type: string;
    desc: string;
  }[];
};

export default function ProductRankingContainer ({ serverRenderedData }: Data) {
  return (
    <section className='w-[70%] h-[900px] mx-auto flex flex-col items-center justify-between p-[20px]'>
      {serverRenderedData.map((item, index) => (
        <div key={index} className='MiniContainer w-full h-[250px]'>
          <h1 className='font-bold text-[18px]'>{item.desc}</h1>
            <div>
              
            </div>
        </div>
      ))}
    </section>
  );
};


