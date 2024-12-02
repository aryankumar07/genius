'use client'

import { useEffect, useState } from "react"
import ProModel from "./promodel"

export const ModalProvider = ()=>{
  const [isMounted, setisMounted] = useState<boolean>(false)
  useEffect(()=>{
    setisMounted(true)
  },[])

  if(!isMounted){
    return null;
  }

  return(
    <>
      <ProModel/>
    </>
  )

}