// SSR (Server Side Rendering) Container
// 주재훈 작성.

import MyCartComponent from '@/components/mycart/csr';

function MyCartContainer() {

  return (
    <section className='w-[70%] min-h-[900px] flex flex-col'>
      <MyCartComponent/>
    </section>
  );
}

export default MyCartContainer     

