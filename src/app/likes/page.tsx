import LikesContainer from '@/containers/likes/ssr';

export default async function LikesPage() {

  return(
    <main className='Main flex flex-col items-center justify-center  w-full min-h-[1150px] pt-[80px]'>
      <LikesContainer /> 
    </main>
  )
}