// CSR (Client Side Rendering) Container
// 주재훈 작성.

import LikesComponent from '@/components/likes/csr';


function LikesContainer() {

  return (
    <section className='w-[70%] min-h-[900px] flex flex-col'>
      <LikesComponent />
    </section>
  );
}

export default LikesContainer     

