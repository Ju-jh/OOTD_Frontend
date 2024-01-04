interface adNum {
  currentImage: number;
  clickCircleBtn(num: number): void;
}

export const AdvertisementButton: React.FC<adNum> = ({ currentImage, clickCircleBtn }) => {
  return (
    <div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-[40px] flex items-center justify-center gap-[10px] w-[200px] h-[50px]'>
      <button className={`w-[15px] h-[15px] ${currentImage === 1 ? 'bg-slate-600' : 'bg-slate-300 hover:bg-slate-500'} opacity-80 rounded-full transition-all duration-500  border-[1px] border-white`} onClick={() => clickCircleBtn(1)}></button>
      <button className={`w-[15px] h-[15px] ${currentImage === 2 ? 'bg-slate-600' : 'bg-slate-300 hover:bg-slate-500'} opacity-80 rounded-full transition-all duration-500  border-[1px] border-white`} onClick={() => clickCircleBtn(2)}></button>
      <button className={`w-[15px] h-[15px] ${currentImage === 3 ? 'bg-slate-600' : 'bg-slate-300 hover:bg-slate-500'} opacity-80 rounded-full transition-all duration-500  border-[1px] border-white`} onClick={() => clickCircleBtn(3)}></button>
    </div>
  );
};
