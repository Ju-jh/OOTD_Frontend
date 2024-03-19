// CSR (Client Side Rendering) Component
// 이기웅 작성.

'use client'

import { EVENT_COLOR } from "@/constants/color";
import { faChevronDown, faChevronRight, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RequestPayParams, RequestPayResponse } from "iamport-typings";
import { SetStateAction, useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from 'next/navigation'
import { useModal } from "@/hooks/context/modal";
import { BOTTOMCLOTHES, FREECLOTHES, SHOESCLOTHES, TOPCLOTHES } from "@/constants/array";
import { useDarkMode } from "@/hooks/context/darkMode";

interface Item {
    c_id: number;
    item: {
        i_id: number;
        photo: string;
        category: string;
        brand: string;
        title: string;
        discount: string;
        price: string;
    }
    quantity: number;
    size: string;
}

export default function PaymentWindowComponent() {
    const searchParams = useSearchParams()
    const carts = searchParams.get("carts")
    const [isCartArray, setIsCartArray] = useState<Item[]>([])
    const ShippingAddress = useRef<HTMLButtonElement>(null)
    const { openModal, isModalOpen } = useModal()
    const darkMode = useDarkMode()

    // 바로구매 누를시 들어오는 데이터값
    const [isPG, setIsPG] = useState("")
    const [isPay, setIsPay] = useState("card")
    const [isAmount, setIsAmount] = useState(1000)
    const [isName, setIsName] = useState("")
    const [isAddr, setIsAddr] = useState('');
    const [isDetailAddr, setIsDetailAddr] = useState('');
    const [isTel, setIsTel] = useState("");
    const [isEmail, setIsEmail] = useState('');
    const [isPostcode, setIsPostcode] = useState("")
    // 요청값저장
    const [isTotal, setIsTotal] = useState(0)
    const [isTotalPrice, setIsTotalPrice] = useState(0)
    const [isTotalDiscount, setIsTotalDiscount] = useState(0)
    const [isCancel, setIsCancel] = useState(false)
    const [isBuy, setIsBuy] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const [isShipping, setIsShipping] = useState(false)

    const cancelCheckboxChange = () => {
        setIsCancel(!isCancel)
    }

    const buyCheckboxChange = () => {
        setIsBuy(!isBuy)
    }

    const allCheckboxChange = () => {
        if (!isCancel) {
            setIsCancel(!isCancel)
            if (!isBuy) {
                setIsBuy(!isBuy)
            }
        } else if (isCancel && isBuy) {
            setIsBuy(!isBuy)
            setIsCancel(!isCancel)
        }

    }

    const onClickPg = (pg: string) => {
        setIsPG(pg)
    }

    const userDataModifyBtn = () => {
        if (isUser) {
            console.log(isTel);
            axios.post("/api/order/userupdate", { isName, isTel, isEmail }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
                .then((response) => {
                    console.log(response.data);
                })
            setIsUser(false)
        } else {
            setIsUser(true)
        }
    }

    const shippingDataModifyBtn = () => {
        if (isShipping) {
            axios.post("/api/order/useraddress", { isAddr, isDetailAddr }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
                .then((response) => {
                    console.log(response.data);
                })
            setIsShipping(false)
        } else {
            setIsShipping(true)
        }
    }

    const nameChange = (e: string) => {
        setIsName(e);
    };

    const phonenumberChange = (e: string) => {
        setIsTel(e);
    };

    const emailChange = (e: string) => {
        setIsEmail(e);
    };

    const addrChange = (e: SetStateAction<string>) => {
        setIsDetailAddr(e);
    }

    const cartSizeChangeBtn = (cartId: any, value: string, index: number) => {
        axios.post("/api/order/sizechange", { cartId, value }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
            .then((response) => {
                const updateIsCartArray = [...isCartArray];
                updateIsCartArray[index].size = response.data.order.size;
                setIsCartArray(updateIsCartArray);
            })
    }

    const cartQuantityChangeBtn = (cartId: any, value: string, index: number) => {
        axios.post("/api/order/quantitychange", { cartId, value }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
            .then((response) => {
                const updateIsCartArray = [...isCartArray];
                updateIsCartArray[index].quantity = response.data.order.quantity;
                setIsCartArray(updateIsCartArray);
                totalPriceDiscount(updateIsCartArray)
            })
    }

    const onClickPayment = () => {
        order(true,isCartArray)
        if (isCancel && isBuy) {
            if (!window.IMP) return;
            /* 1. 가맹점 식별하기 */
            const { IMP } = window;
            IMP.init("imp57123366"); // 가맹점 식별코드

            /* 2. 결제 데이터 정의하기 */
            const data: RequestPayParams = {
                pg: isPG, // PG사 : https://developers.portone.io/docs/ko/tip/pg-2 참고
                pay_method: isPay, // 결제수단
                merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
                amount: isAmount, // 결제금액
                name: "아임포트 결제 데이터 분석", // 주문명
                buyer_name: isName, // 구매자 이름
                buyer_tel: isTel, // 구매자 전화번호
                buyer_email: isEmail, // 구매자 이메일
                buyer_addr: isAddr, // 구매자 주소
                buyer_postcode: isPostcode, // 구매자 우편번호
            };

            /* 4. 결제 창 호출하기 */
            IMP.request_pay(data, callback);

        } else {
            alert("필수 약관에 동의해주세요.");
        }
    };

    function callback(response: RequestPayResponse) {
        const { success, error_msg } = response;

        if (success) {
            order(success,isCartArray)
            alert("결제 성공");
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
    }

    const order = (success: boolean, categoryArray: Item[]) => {
        axios
            .post("/api/order/requst", {categoryArray}, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            .then((response) => {
                console.log(response.data);
            })
    }

    const orderItems = (str: string, cartArray: any[]) => {
        axios.get(`/api/order/${str}`, {
            headers: {
                "Content-Type": "application/json",
            },
            params: {
                cart: cartArray
            },
            withCredentials: true,
        })
            .then((response) => {
                setIsCartArray(response.data[0])
                setIsName(response.data[1].name);
                setIsTel(response.data[1].phone_number)
                setIsEmail(response.data[1].email)
                setIsAddr(response.data[1].address)
                setIsDetailAddr(response.data[1].detailAddress)
                totalPriceDiscount(response.data[0])
            })
    }

    const totalPriceDiscount = (cartArray: any) => {
        const total = (cartArray).map((item: any) => parseInt(item.item.price) * item.quantity - parseInt(item.item.discount) * item.quantity)
            .reduce((total: any, price: any) => total + price, 0);
        const totalPrice = (cartArray).map((item: any) => parseInt(item.item.price) * item.quantity)
            .reduce((total: any, price: any) => total + price, 0);
        const totalDiscount = (cartArray).map((item: any) => parseInt(item.item.discount) * item.quantity)
            .reduce((total: any, price: any) => total + price, 0);
        setIsTotal(total);
        setIsTotalPrice(totalPrice);
        setIsTotalDiscount(totalDiscount);
    }

    useEffect(() => {
        const cartArray = JSON.parse(carts!)
        if (cartArray[0] == "cart") {
            orderItems("carts", cartArray[1])
        } else {
            orderItems("items", cartArray[1])
        }
    }, [carts, isModalOpen])

    return (
        <div>
            <div>
                <p className="text-[40px] font-bold my-[50px]">주문/결제</p>
            </div>
            <div className="flex justify-between w-full">
                <div className="w-[49%] mb-[15px]">
                    <div className="flex flex-col justify-between">
                        <div className="font-bold mb-[15px] py-[5%] px-[10%] bg-white">
                            <div className="flex mb-[30px] justify-between">
                                <p className="text-[25px]">주문자 정보</p>
                                <button onClick={userDataModifyBtn} className="p-[8px] text-[12px] border">{isUser ? "주문자 정보저장" : "주문자 정보변경"}</button>
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="p-[10px]">이름</td>
                                        {isUser ? <td><input value={isName} onChange={e => nameChange(e.target.value)} type="text" className="border border-slate-300" /></td> : <td>{isName ? isName : "이름을 입력해주세요"}</td>}
                                    </tr>
                                    <tr>
                                        <td className="p-[10px]">연락처</td>
                                        {isUser ? <td><input defaultValue={isTel} onChange={e => phonenumberChange(e.target.value)} type="text" className="border border-slate-300" /></td> : <td>{isTel ? isTel : "전화번호을 입력해주세요"}</td>}
                                    </tr>
                                    <tr>
                                        <td className="p-[10px]">이메일</td>
                                        {isUser ? <td><input value={isEmail} onChange={e => emailChange(e.target.value)} type="text" className="border border-slate-300" /></td> : <td>{isEmail ? isEmail : "이메일을 입력해주세요"}</td>}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="font-bold mb-[15px] py-[5%] px-[10%] bg-white">
                            <div className="flex justify-between mb-[30px]">
                                <p className="text-[25px]">배송 정보</p>
                                <button onClick={shippingDataModifyBtn} className="p-[8px] text-[12px] border">{isShipping ? "배송정보 자장" : "배송정보 변경"}</button>
                            </div>
                            <div className="mb-[25px]">
                                <p className="font-bold text-[25px] mb-[10px] pl-[10px]">{isName}</p>
                                <table className="w-[100%]">
                                    <tbody>
                                        <tr>
                                            {isShipping ?
                                                <td className="flex w-[100%] p-[10px]">
                                                    <input placeholder={"배달주소을 입력해주세요"} value={isAddr} onChange={(e) => setIsAddr(e.target.value)} type="text" onClick={() => { if (ShippingAddress !== null && ShippingAddress.current !== null) { ShippingAddress.current.click() } }} className="w-[75%] h-[25px] border border-slate-300" />
                                                    <button ref={ShippingAddress} onClick={() => { openModal('ShippingAddressComponent') }}>주소 찾기</button></td> : <td className="p-[10px]">{isAddr ? isAddr : "배달주소을 입력해주세요"}</td>}
                                        </tr>
                                        <tr>
                                            {isShipping ? <td className="p-[10px]"><input placeholder={"상세주소를 입력해주세요"} value={isDetailAddr} onChange={e => addrChange(e.target.value)} type="text" className="w-[75%] h-[25px] border border-slate-300" /></td> : <td className="p-[10px]">{isDetailAddr ? isDetailAddr : "상세주소를 입력해주세요"}</td>}
                                        </tr>
                                        <tr>
                                            {isShipping ?
                                                <td className="p-[10px]">
                                                    <input
                                                        placeholder={"전화번호을 입력해주세요"}
                                                        defaultValue={isTel}
                                                        onChange={e => phonenumberChange(e.target.value)}
                                                        type="text"
                                                        className="w-[75%] h-[25px] border border-slate-300" />
                                                </td>
                                                : <td className="p-[10px]">
                                                    {isTel ? isTel : "전화번호을 입력해주세요"}
                                                </td>}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="">
                                <p className="text-[25px]">배송 요청사항</p>
                            </div>
                            <ul>
                                <li>문 앞</li>
                                <li>직접 받고 부재 시 문앞</li>
                                <li>경비실</li>
                                <li>택배함</li>
                            </ul>
                        </div>
                    </div>
                    <div className="py-[5%] px-[10%] mb-[15px] bg-white">
                        <p className="font-bold text-[25px] mb-[15px]">한국 배송 상품</p>
                        <div className="max-h-[600px] overflow-y-auto scrollbar-hide">
                            {isCartArray.map((item: any, index: number) => {
                                return (
                                    <div key={index} className="mb-[20px]">
                                        <div className="mb-[20px]">
                                            <div className="flex w-full h-[200px]">
                                                <div className="w-[200px] h-[200px]">
                                                    <Image src={item.item.photo} alt={""} style={{ width: '200px', height: '200px' }} width={200} height={200} />
                                                </div>
                                                <div className="flex flex-col flex-1 text-[20px] pl-[5px]">
                                                    <p className="text-[20px] font-bold">{item.item.brand}</p>
                                                    <p className="my-[7px]">{item.item.title}</p>
                                                    <div className='w-[200px] h-[30%] rounded-md flex items-center justify-between '>
                                                        {
                                                            TOPCLOTHES.includes(item.item.category) ?
                                                                <div
                                                                    className={`w-[50%] h-full flex items-center justify-center  hover:cursor-pointer hover:rounded-md ${darkMode ? '' : 'hover:bg-[#F7F8F9]'}`}
                                                                >
                                                                    <label htmlFor={`${index}`}></label>
                                                                    <select
                                                                        value={item.size}
                                                                        onChange={(e) => cartSizeChangeBtn(item.c_id, e.target.value, index)}
                                                                        name="size"
                                                                        id={`${index}`}
                                                                        style={{ backgroundColor: 'transparent', border: 'none', padding: '5px', fontSize: '16px' }}>
                                                                        <option value="S" className="text-black">S</option>
                                                                        <option value="M" className="text-black">M</option>
                                                                        <option value="L" className="text-black">L</option>
                                                                        <option value="XL" className="text-black">XL</option>
                                                                        <option value="XXL" className="text-black">XXL</option>
                                                                    </select>
                                                                </div>
                                                                :
                                                                BOTTOMCLOTHES.includes(item.item.category) ?
                                                                    <div
                                                                        className={`w-[50%] h-full flex items-center justify-center  hover:cursor-pointer hover:rounded-md ${darkMode ? '' : 'hover:bg-[#F7F8F9]'}`}
                                                                    >
                                                                        <label htmlFor={`${index}`}></label>
                                                                        <select
                                                                            value={item.size}
                                                                            onChange={(e) => cartSizeChangeBtn(item.c_id, e.target.value, index)}
                                                                            name="size"
                                                                            id={`${index}`}
                                                                            style={{ backgroundColor: 'transparent', border: 'none', padding: '5px', fontSize: '16px' }}>
                                                                            <option value="26" className="text-black">26</option>
                                                                            <option value="28" className="text-black">28</option>
                                                                            <option value="30" className="text-black">30</option>
                                                                            <option value="32" className="text-black">32</option>
                                                                            <option value="34" className="text-black">34</option>
                                                                        </select>
                                                                    </div>
                                                                    :
                                                                    SHOESCLOTHES.includes(item.item.category) ?
                                                                        <div
                                                                            className={`w-[50%] h-full flex items-center justify-center  hover:cursor-pointer hover:rounded-md ${darkMode ? '' : 'hover:bg-[#F7F8F9]'}`}
                                                                        >
                                                                            <label htmlFor={`${index}`}></label>
                                                                            <select
                                                                                value={item.size}
                                                                                onChange={(e) => cartSizeChangeBtn(item.c_id, e.target.value, index)}
                                                                                name="size"
                                                                                id={`${index}`}
                                                                                style={{ backgroundColor: 'transparent', border: 'none', padding: '5px', fontSize: '16px' }}>
                                                                                <option value="220" className="text-black">220</option>
                                                                                <option value="230" className="text-black">230</option>
                                                                                <option value="240" className="text-black">240</option>
                                                                                <option value="250" className="text-black">250</option>
                                                                                <option value="260" className="text-black">260</option>
                                                                                <option value="270" className="text-black">270</option>
                                                                                <option value="280" className="text-black">280</option>
                                                                                <option value="290" className="text-black">290</option>
                                                                                <option value="300" className="text-black">300</option>
                                                                            </select>
                                                                        </div>
                                                                        :
                                                                        FREECLOTHES.includes(item.item.category) ?
                                                                            <div
                                                                                className={`w-[50%] h-full flex items-center justify-center ${darkMode ? '' : 'hover:bg-[#F7F8F9]'}`}
                                                                            >
                                                                                {item.size}
                                                                            </div>
                                                                            :
                                                                            null
                                                        }
                                                        <div
                                                            className={`w-[50%] h-[30%] flex items-center justify-center gap-[10px] hover:rounded-md ${darkMode ? '' : 'hover:bg-[#F7F8F9]'}`}
                                                        >
                                                            <button
                                                                className="p-[5px] shadow-sm shadow-black rounded-md hover:bg-[#7732FF]"
                                                                onClick={() => { cartQuantityChangeBtn(item.c_id, '-', index) }}
                                                            >-</button>
                                                            <span className="w-[10px] mx-[10px]">{item.quantity}</span>
                                                            <button
                                                                className="p-[5px] shadow-sm shadow-black rounded-md hover:bg-[#7732FF]"
                                                                onClick={() => { cartQuantityChangeBtn(item.c_id, '+', index) }}
                                                            >+</button>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center h-full text-[20px] font-bold">
                                                        <p>{(parseInt(item.item.price) - parseInt(item.item.discount)).toLocaleString()}원</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full h-[4px] bg-black"></div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex justify-between text-[25px] font-bold py-[20px]">
                            <p>총 <span style={{ color: EVENT_COLOR }}>{isCartArray.length}</span>개</p>
                            <p>
                                {isTotal.toLocaleString()}원
                            </p>
                        </div>
                    </div>
                    <div className="py-[5%] px-[10%] mb-[10px] bg-white">
                        <div>
                            <p className="text-[25px] font-bold mb-[20px]">쿠폰/쿠폰코드</p>
                            <div className="flex items-center w-full border p-[10px]">
                                <div className="flex-1">
                                    <p className="text-[15px]">2024년 신년세일 이벤트 한정 3% 쿠폰</p>
                                    <p className="text-[15px]">(할인 금액: -금액)</p>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </div>
                            </div>
                            <p>보유한 쿠폰의 최대할인가가 적용되었습니다.</p>
                            <p>네이버페이 이용 불가 쿠폰입니다.</p>
                        </div>
                        <div>
                            <p className="text-[25px] font-bold my-[20px]">O머니</p>
                            <p>보유한 O머니 4000원</p>
                            <div className="flex justify-between h-[50px]">
                                <div className="flex-1 h-full">
                                    <input className="w-[100%] h-[39px]" type="text" />
                                    <div className=" h-[1px] bg-gray-200 mt-[10px]"></div>
                                </div>
                                <button className="w-[150px] text-center text-[15px] text-white font-bold border ml-[10px] bg-black rounded-lg">최대 금액 사용</button>
                            </div>
                            <p className="mt-[10px]">적립금은 총 결제 금액의 최대 5% 사용 가능합니다.</p>
                        </div>
                    </div>
                    <div className="py-[5%] px-[10%] mb-[15px] bg-white">
                        <p className="text-[25px] font-bold mb-[20px]">결제수단</p>
                        <div>
                            <p className="text-[18px] mb-[10px]">일반결제</p>
                            <div className="flex">
                                {/* <button className="w-[120px] h-[40px] border font-bold mr-[10px]">가상계좌</button> */}
                                <button className="w-[120px] h-[40px] border font-bold">신용카드</button>
                            </div>
                            <div className="w-[100%] h-[1px] bg-gray-200 my-[20px]"></div>
                        </div>
                        <div>
                            <p className="text-[18px] mb-[10px]">간편결제</p>
                            <div className="flex">
                                <button onClick={e => onClickPg("kakaopay")} className={`w-[120px] h-[40px] ${isPG == "kakaopay" ? "border border-black" : "border"} mr-[10px] bg-yellow-300`}>
                                    <FontAwesomeIcon className="w-[15px] h-[15px] text-[15px]" icon={faComment} />
                                    <span className="ml-[3px] text-[20px] font-bold">pay</span>
                                </button>
                                <button onClick={e => onClickPg("tosspay")} className={`w-[120px] h-[40px] ${isPG == "tosspay" ? "border border-black" : "border"} font-bold mr-[10px]`}>
                                    <div className="flex justify-center place-items-center">
                                        <Image src={"/images/tossicon.png"} alt={""} width={20} height={20} />
                                        <p className="text-[20px] font-bold">toss</p>
                                        <p className="text-[15px]">pay</p>
                                    </div>
                                </button>
                                <button onClick={e => onClickPg("naverpay")} className={`w-[120px] h-[40px] ${isPG == "naverpay" ? "border border-black" : "border"} font-bold`}>
                                    <div className="flex justify-center place-items-center">
                                        <Image src={"/images/navericon.png"} alt={""} width={20} height={20} />
                                        <p className="text-[15px] ml-[3px]">pay</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="py-[5%] px-[10%] bg-white">
                        <div className="flex justify-between font-bold">
                            <p className="text-[25px]">적립 예정 O머니</p>
                            <button className="text-[25px]">가격</button>
                        </div>
                        <div className="w-[100%] h-[1px] bg-gray-200 my-[10px]"></div>
                        <div className="flex justify-between text-[20px] font-bold">
                            <p className="">구매 적립</p>
                            <button className="p-[8px]">가격</button>
                        </div>
                        <div className="flex justify-between text-[20px] font-bold">
                            <p className="">리뷰 적립</p>
                            <button className="p-[8px]">가격</button>
                        </div>
                    </div>
                </div>
                <div className="w-[49%] mb-[15px]">
                    <div className="font-bold mb-[15px] py-[5%] px-[10%] bg-white">
                        <p className="text-[25px] mb-[30px]">결제금액</p>
                        <table className="w-full mb-[15px]">
                            <tbody>
                                <tr>
                                    <td className="min-w-[120px] p-[10px] text-[20px]">주문 상품수</td>
                                    {/* <td className="text-right font-bold">{items[1].length}개</td> */}
                                </tr>
                                <tr>
                                    <td className="min-w-[120px] p-[10px] text-[20px]">총 상품 가격</td>
                                    <td className="text-right font-bold">{isTotalPrice.toLocaleString()}원</td>
                                </tr>
                                <tr>
                                    <td className="min-w-[120px] p-[10px] text-[20px]">상품 할인</td>
                                    <td style={{ color: EVENT_COLOR }} className="text-right font-bold">{isTotalDiscount.toLocaleString()}원</td>
                                </tr>
                                <tr>
                                    <td className="min-w-[120px] p-[10px] text-[20px]">O머니 사용</td>
                                    <td style={{ color: EVENT_COLOR }} className="text-right font-bold">가격</td>
                                </tr>
                                <tr>
                                    <td className="min-w-[120px] p-[10px] text-[20px]">관부가세</td>
                                    <td className="text-right font-bold">관부가세 없음</td>
                                </tr>
                                <tr>
                                    <td className="min-w-[120px] p-[10px] text-[20px]">배송비</td>
                                    <td className="text-right font-bold">전상품 무료 배송</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex justify-between py-[15px] border-y-2">
                            <p className="text-[25px] font-bold">총 결제금액</p>
                            <p className="text-[25px] font-bold">{isTotal.toLocaleString()}원</p>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex w-full py-[15px] border-b border-black">
                                <input type="checkbox" checked={isBuy && isCancel ? true : false} style={{ zoom: 1.5 }} onChange={allCheckboxChange} />
                                <span className="ml-[5px]">주문 정보를 확인하였으며, 약관 전체에 동의합니다.</span>
                            </div>
                            <div className="flex flex-col w-full py-[15px] mt-[10px]">
                                <div className="flex w-full mb-[15px]">
                                    <input type="checkbox" checked={isBuy} style={{ zoom: 1.5 }} onChange={buyCheckboxChange} />
                                    <span className="flex-1 ml-[5px] text-[18px] font-bold">[필수] 구매 전 필수 동의사항</span>
                                    <FontAwesomeIcon className="w-[20px] h-[20px] text-[20px]" icon={faChevronDown} />
                                </div>
                                <div className="flex w-full mb-[10px]">
                                    <input type="checkbox" checked={isCancel} style={{ zoom: 1.5 }} onChange={cancelCheckboxChange} />
                                    <span className="ml-[5px] text-[18px] font-bold">[필수] 상품별 취소/반품 조건 안내</span>
                                </div>
                                <table className="w-full border">
                                    <tbody>
                                        <tr>
                                            <td className="text-center border-r border-b p-[10px]">상품분류</td>
                                            <td className="border-b">클래식 캐비어 지퍼 동전 지갑 블랙 금장</td>
                                        </tr>
                                        <tr>
                                            <td className="text-center border-r border-b">반품 가능 기간</td>
                                            <td className="p-[10px] border-b">
                                                <div className="flex">
                                                    <p>입금 대기 ~ 상품 준비중:</p>
                                                    <span>무료</span>
                                                </div>
                                                <div className="flex">
                                                    <p>배송 준비 중부터:</p>
                                                    <span>10,000원</span>
                                                </div>
                                                <p>(제주/도서 산간 16,000)</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center p-[10px] border-r">하차 발생시</td>
                                            <td>
                                                <div className="flex">
                                                    <p>반품가능:</p>
                                                    <span>하자 기준 참고</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <button onClick={onClickPayment} style={{ backgroundColor: EVENT_COLOR }} className="w-full py-[15px] border rounded-lg text-white text-[20px]">{isTotal.toLocaleString()}원 결제하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}