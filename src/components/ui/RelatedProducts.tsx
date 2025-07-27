import  { useContext, useEffect, useState } from 'react'
import type { relatedprops } from '../../Types/Category'
import { ShopContext } from '../../context/ShopContext'
import Title from '../common/title/Title'
import ProductItem from '../product/components/ProductItem'
import type { Products } from '../../Types/Product'

const RelatedProducts = ({category,subCategory}:relatedprops) => {
    const {products}=useContext(ShopContext)
      const [related, setRelated] = useState<typeof products>([]);

    useEffect(()=>{


        if(products.length>0){
let productsCopy=products.slice();

productsCopy=productsCopy.filter((item:Products)=>category===item.category)
productsCopy=productsCopy.filter((item:Products)=>subCategory===item.subCategory)
setRelated(productsCopy.slice(0,5))
        }
},[products])
  return (
    <div className='my-34'>
        <div className="text-center text-3xl py-2">
            <Title text1={'RELATED'} text2='PRODUCTS'/>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                related.map((item:Products,index:number)=>(
                    <ProductItem key={index} id={item._id} name={item.name} price={item.price} images={item.images} />
                ))
            }
        </div>
      
    </div>
  )
}

export default RelatedProducts
