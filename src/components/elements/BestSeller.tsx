import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../../context/ShopContext"

type products={
    bestseller:boolean
}

const BestSeller = () => {
    const {products}=useContext(ShopContext);
    const [bestSeller,setBestSeller]=useState<products[]>([])

    useEffect(()=>{
const bestProduct=(products.filter((item:void) => (item.bestseller:tru)))
    },[])

  return (
    <div>
      
    </div>
  )
}

export default BestSeller
