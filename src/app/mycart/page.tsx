import MyCartContainer from '@/containers/mycart/ssr';

export default async function MyCartPage() {


  return(
    <main className='Main flex flex-col items-center w-full min-h-[1150px] pt-[80px]'>
      <MyCartContainer /> 
    </main>
  )
}