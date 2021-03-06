import React, { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';

import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {

   const [cart,setCart]= useState([])

   const [orderPlaced,setOrderPlaced]=useState(false)

   const history=useHistory()

   const handleProceedCheckout=()=>{

    history.push('/shipment');


    //    setCart([]);

    //    setOrderPlaced(true)
    //    processOrder()

   }

   const removeProduct=(productKey)=>{
    //    console.log('clicked',productKey)

       const newCart=cart.filter(pd=>pd.key!== productKey);
       setCart(newCart);

       removeFromDatabaseCart(productKey);
   }

   useEffect(() =>{

    // cart
    const savedCart= getDatabaseCart();
    const productKeys=Object.keys(savedCart);

    fetch('https://thawing-dawn-33508.herokuapp.com/productsByKeys',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productKeys)
    })

    .then(res=>res.json())
    .then(data=>setCart(data))    

    // const cartProducts=productKeys.map(key=>{
    //     const product=fakeData.find(pd=>pd.key===key);

    //     product.quantity=savedCart[key];

    //     return product;
    // });

    // setCart(cartProducts);

   },[]);

   let thankYou;

   if(orderPlaced){
  thankYou =  <img src={happyImage} alt=""/>
   }

    return (
        <div className='twin-container'>

           <div className='product-container'>
           {
                cart.map(pd=> <ReviewItem 
                    key={pd.key}

                    removeProduct={removeProduct}
                    product={pd}></ReviewItem>)
            }

            {thankYou}
           </div>

           <div className='cart-container'>

               <Cart cart={cart}>
                   <button onClick={handleProceedCheckout} className='main-button'>Proceed Checkout</button>
               </Cart>

           </div>


           
            
        </div>
    );
};

export default Review;