import MyPageContainer from '@/containers/mypage/csr';

export default async function MyPage() {


  return(
    <main className='Main flex flex-col items-center w-full min-h-[1150px] pt-[80px]'>
      <MyPageContainer />
    </main>
  )
}