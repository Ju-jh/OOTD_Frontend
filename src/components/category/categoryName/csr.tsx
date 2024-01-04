// CSR (Client Side Rendering) Component
// 이기웅 작성.

'use client'

import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type Data = {
  categoryParma: string;
}

export default function CategoryNameComponent({ categoryParma }: Data) {
  const [isButton, setIsButton] = useState(true)
  const [isList, setIsList] = useState("인기순")

  const iconBtn = () => {
    setIsButton(!isButton)
  }

  const listBtn = (list: string) => {
    switch (list) {
      case "인기순":
        return setIsList(list),setIsButton(true)
      case "최신순":
        return setIsList(list),setIsButton(true)
      case "장바구니 많은 순":
        return setIsList(list),setIsButton(true)
      case "찜 많은 순":
        return setIsList(list),setIsButton(true)
      case "가격낮은순":
        return setIsList(list),setIsButton(true)
      case "가격높은순":
        return setIsList(list),setIsButton(true)
      case "정확도":
        return setIsList(list),setIsButton(true)
    }
  }

  return (
    <div className="flex justify-between place-items-center w-full h-[106px] border-solid border-b-2 border-black">
      <p className="text-[24px] font-bold">{categoryParma}</p>
      <div className="flex text-[16px]">
        <button className="text-violet-600">가격 낮은순으로 보기</button>
        <div className="w-[1px] h-[20px] bg-gray-200 mx-[10px]"></div>
        <button className="flex" onClick={iconBtn}>
          <p>{isList}</p>
          {isButton == true ? <FontAwesomeIcon className="mx-[10px] mt-[3px]" icon={faCaretDown} /> : <FontAwesomeIcon className="mx-[10px] mt-[5px]" icon={faCaretUp} />}
        </button>
        <ul className={isButton == false ? "absolute w-[120px] mt-[25px] right-[35px] border-solid border-1 rounded-md" : "hidden"}>
          <li className={`p-[5px] cursor-pointer hover:font-bold ${isList == "인기순" ? "font-bold":""}`} onClick={() => listBtn("인기순")}>인기순</li>
          <li className={`p-[5px] cursor-pointer hover:font-bold ${isList == "최신순" ? "font-bold":""}`} onClick={() => listBtn("최신순")}>최신순</li>
          <li className={`p-[5px] cursor-pointer hover:font-bold ${isList == "장바구니 많은 순" ? "font-bold":""}`} onClick={() => listBtn("장바구니 많은 순")}>장바구니 많은 순</li>
          <li className={`p-[5px] cursor-pointer hover:font-bold ${isList == "찜 많은 순" ? "font-bold":""}`} onClick={() => listBtn("찜 많은 순")}>찜 많은 순</li>
          <li className={`p-[5px] cursor-pointer hover:font-bold ${isList == "가격낮은순" ? "font-bold":""}`} onClick={() => listBtn("가격낮은순")}>가격낮은순</li>
          <li className={`p-[5px] cursor-pointer hover:font-bold ${isList == "가격높은순" ? "font-bold":""}`} onClick={() => listBtn("가격높은순")}>가격높은순</li>
          <li className={`p-[5px] cursor-pointer hover:font-bold ${isList == "정확도" ? "font-bold":""}`} onClick={() => listBtn("정확도")}>정확도</li>
        </ul>
      </div>
    </div>
  );
}