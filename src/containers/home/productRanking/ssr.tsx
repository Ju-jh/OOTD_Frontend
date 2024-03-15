'use client'
import axios from 'axios';
// 주재훈 작성.
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';

type Data = {
  serverRenderedData: {
    type: string;
    desc: string;
  }[];
};

type FetchData = {
  i_id: number,
  count: number,
  category: string,
  photo: string,
  title: string,
  price: number,
  brand: string,
  discount: number
}

export default function ProductRankingContainer({ serverRenderedData }: Data) {
const [rankData, setRankData] = useState<FetchData[]>([]);
const [discountData, setDiscountData] = useState<FetchData[]>([])
const [pointData, setPointData] = useState<FetchData[]>([])


  const getRankingData = () => {
    axios
      .get(`api/item/ranks`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response) {
          setRankData(response.data)
        }

      })
      .catch((error) => {
        console.error("getRankingData API 호출 중 오류 발생:", error, error.errors);
      });
  }

  const getDiscountData = () => {
    axios
      .get(`api/item/discounts`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response) {
          setDiscountData(response.data)
        }

      })
      .catch((error) => {
        console.error("getDiscountData API 호출 중 오류 발생:", error, error.errors);
      });
  }

  const getPointData = () => {
    axios
      .get(`api/item/points`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response) {
          setPointData(response.data)
        }

      })
      .catch((error) => {
        console.error("getPointData API 호출 중 오류 발생:", error, error.errors);
      });
  }
  
  
  useEffect(() => {
    getRankingData()
    getDiscountData()
    getPointData()
    const pollInterval = 10 * 1000; 
    const intervalId = setInterval(() => {
      getRankingData()
      getDiscountData()
      getPointData()
    }, pollInterval);
    return () => {
      clearInterval(intervalId);
    };
  },[])


  return (
    <section className='w-[70%] h-[1000px] mx-auto flex flex-col items-center justify-between p-[20px] mb-[100px]'>
      {serverRenderedData.map((item, index) => (
        <div key={index} className='MiniContainer w-full h-[300px]  overflow-hidden'>
          <h1 className='font-bold text-[18px] mb-[20px]'>{item.desc}</h1>
          {
            item.type === 'popular' ?
            <div className=' w-[5000px] h-full flex gap-3 items-start justify-start'>
            {rankData.map((item, i) => (
              <div key={i} className='w-[180px] h-[180px] '>
                <Link href={`category/${item.category}/item/${item.i_id}`}>
                  <Image src={item.photo} width={"230"} height={"230"} alt={""} style={{objectFit: 'cover', width: '100%', height: '100%', borderRadius: '10px' }} className='hover:opacity-[80%]'></Image>
                  <div>
                    <p className=''>{ item.title.length > 17 ? (item.title.substring(0, 17) + (item.title.length > 17 ? '...' : '')) : item.title }</p>
                    <em>{ Intl.NumberFormat().format(Math.floor(item.price)) }원</em>
                  </div>
                </Link>
              </div>
            ))}
            </div>
            : null
          }
          
          {
            item.type === 'discount' ?
            <div className=' w-[5000px] h-full flex gap-3 items-start justify-start'>
            {discountData.map((item, i) => (
              <div key={i} className='w-[180px] h-[180px]'>
                <Link href={`category/${item.category}/item/${item.i_id}`}>
                  <Image src={item.photo} width={"230"} height={"230"} alt={""} style={{objectFit: 'cover', width: '100%', height: '100%', borderRadius: '10px'}} className='hover:opacity-[80%]' ></Image>
                  <div>
                    <p className=''>{ item.title.length > 17 ? (item.title.substring(0, 17) + (item.title.length > 17 ? '...' : '')) : item.title }</p>
                    <em>{ Intl.NumberFormat().format(Math.floor(item.price)) }원</em>
                  </div>
                </Link>
              </div>
            ))}
            </div>
            : null
          }

          {
            item.type === 'point' ?
            <div className=' w-[5000px] h-full flex gap-3 items-start justify-start'>
            {pointData.map((item, i) => (
              <div key={i} className='w-[180px] h-[180px] '>
                <Link href={`category/${item.category}/item/${item.i_id}`}>
                  <Image src={item.photo} width={"230"} height={"230"} alt={""} style={{objectFit: 'cover', width: '100%', height: '100%', borderRadius: '10px' }} className='hover:opacity-[80%]'></Image>
                  <div>
                    <p className=''>{ item.title.length > 13 ? (item.title.substring(0, 11) + (item.title.length > 17 ? '...' : '')) : item.title }</p>
                    <em>{ Intl.NumberFormat().format(Math.floor(item.price)) }원</em>
                  </div>
                </Link>
              </div>
            ))}
            </div>
            : null
          }
        </div>
      ))}
    </section>
  );
};


