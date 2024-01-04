// CSR (Client Side Rendering) Container
// 주재훈 작성.

import FindAccountComponent from '@/components/find_account/csr';



function FindAccountContainer() {

  return (
    <section className='w-[600px] h-[900px] flex flex-col'>
      <FindAccountComponent/>
    </section>
  );
}

export default FindAccountContainer     

