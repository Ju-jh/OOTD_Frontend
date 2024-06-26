// CSR (Client Side Rendering) Container
// 주재훈 작성.
'use client';

import { MyBasicInfoComponent } from '@/components/mypage/csr';
import { MyPageInfoComponent } from '@/components/mypage/csr';
import { useAuth } from '@/hooks/context/isLogined';

function MyPageContainer() {
  const { isLogined } = useAuth();
  

  return (
    <section className='w-[70%] min-h-[900px] flex flex-col'>
      {isLogined && (
        <>
          <MyBasicInfoComponent />
          <MyPageInfoComponent />
        </>
      )}
    </section>
  );
}

export default MyPageContainer;
