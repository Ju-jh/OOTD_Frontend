// CSR (Client Side Rendering) Container
// 주재훈 작성.

import SignUpComponent from '@/components/signup/csr';



function SignUpContainer() {

  return (
    <section className='w-[600px] h-[900px] flex flex-col'>
      <SignUpComponent/>
    </section>
  );
}

export default SignUpContainer     

