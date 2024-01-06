// CSR (Client Side Rendering) Component
// 이기웅 작성.

'use client'

import { EVENT_COLOR, STAR_COLOR } from "@/constants/color";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ItemOrderComponent() {

    return (
        <div className="flex flex-col w-[45%] bg-green-200">
            <div className="yellow">
                <div className="flex justify-between">
                    <button className="font-bold">
                        <span className="text-[16px]">톰브라운</span>
                        <FontAwesomeIcon className="h-[16px] w-[16px] text-[16px]" icon={faChevronRight} />
                    </button>
                    <div>
                        <button className="w-[40px] h-[40px]">
                            <FontAwesomeIcon className="w-[28px] h-[28px]" icon={faHeart} />
                        </button>
                        <button className="w-[40px] h-[40px]">
                            <FontAwesomeIcon className="w-[28px] h-[28px]" icon={faShareNodes} />
                        </button>
                    </div>
                </div>
                <p className="text-[16px] my-[4px]">상품이름</p>
                <div className="flex h-[16px]">
                    <div className="relative h-[16px] w-[70px] leading-[16px]">
                        <div className={`absolute text-white h-[16px] text-[16px]`}>★★★★★</div>
                        <div style={{ color: STAR_COLOR }} className="absolute h-[16px] text-[16px] w-[30%] overflow-hidden">★★★★★</div>
                    </div>
                    <span className="h-[16px] text-[16px]">(2)</span>
                </div>

                <div className="flex flex-col mt-[10px]">
                    <div className="text-[14px]">
                        <span style={{ color: EVENT_COLOR }}>50%</span>
                        <span className="line-through text-gray-300 mx-[5px]">500,000</span>
                    </div>
                    <div>
                        <span>250,000</span>
                    </div>
                </div>
            </div>
            <div>배송비</div>
            <div>관부가세</div>
            <div>배송예정일</div>
            <div>포인트 적립</div>
            <div>반품/교환</div>
            <div>-----------</div>
            <div>결제안내</div>
            <div>
                <span>사이즈</span>
                <div>사이즈 선택창</div>
            </div>
            <div>
                <button>장바구니</button>
                <button>구매하기</button>
            </div>
        </div>
    );
}