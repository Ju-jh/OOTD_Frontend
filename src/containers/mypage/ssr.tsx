// SSR (Server Side Rendering) Container
// 주재훈 작성.

import { MyBasicInfoComponent } from '@/components/mypage/csr';
import { MyPageInfoComponent } from '@/components/mypage/csr';

function MyPageContainer() {

  return (
    <section className='w-[70%] min-h-[900px] flex flex-col'>
      <MyBasicInfoComponent />
      <MyPageInfoComponent />
    </section>
  );
}

export default MyPageContainer     

