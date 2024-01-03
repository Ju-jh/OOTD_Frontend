import LoginContainer from '@/containers/login/csr';

export default async function LoginPage() {


  return(
    <main className='Main flex flex-col items-center justify-center  w-full min-h-[1150px] pt-[80px]'>
      <LoginContainer/>
    </main>
  )
}