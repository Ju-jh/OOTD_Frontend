import FindAccountContainer from '@/containers/find_account/ssr';


export default async function FindAccountPage() {


  return(
    <main className='Main flex flex-col items-center justify-center  w-full min-h-[1150px] pt-[80px]'>
      <FindAccountContainer />
    </main>
  )
}