export const getCartList = () => {
    if(localStorage.getItem("cart-items")){
        return localStorage.getItem("cart-items")
    }else{
        return false
    }
}

export const addProduct = (id,name,price,quantity,image,type) => { 
    let list = [];
    if(getCartList()){
      let cartItems = JSON.parse(getCartList() || "[]")
      cartItems.map((item, key) => {
        list[key] = item
      })
      if(list.filter(value=> value.id == id && value.type == type).length > 0){
        return false;
      }else{
        list[cartItems.length] = {id:id, name:name, price:price, quantity, image:image, type:type}
        addToCart(list);
        return true;
      }    
    }else{
      list[0] = {id:id, name:name, price:price, quantity, image:image, type:type}
      addToCart(list);
      return true;
    }
    
  }

export const addToCart = (cartItems) => { 
     if(cartItems){          
        localStorage.setItem("cart-items", JSON.stringify(cartItems));
        return true;
     }else{
        return false;
     }
}

export const editQuantity = (id,type,quantity) => {
    let cartItems = JSON.parse(getCartList() || "[]")
    cartItems.filter(item => item.id == id && item.type == type)
       .forEach(obj => obj.quantity = quantity )
    addToCart(cartItems)
}

export const removeCart = (id,type) => {
    let cartItems = JSON.parse(getCartList() || "[]")
    addToCart(cartItems.filter(item => item.id !== id && item.type == type))
}

