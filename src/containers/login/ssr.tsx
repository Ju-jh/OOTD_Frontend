// CSR (Client Side Rendering) Container
// 주재훈 작성.

import LoginComponent from '@/components/login/csr';



function LoginContainer() {

  return (
    <section className='w-[600px] h-[900px] flex flex-col'>
      <LoginComponent/>
    </section>
  );
}

export default LoginContainer     

