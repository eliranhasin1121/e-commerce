import {TOGGLE_CART_HIDDEN,ADD_ITEM} from './cart.types'
import {addItemToCart} from './cart.utils'
const INITIAL_STATE = {
  hidden: true,
  cartItems:[]
}

const cartReducer = (state = INITIAL_STATE,action) => {
 switch(action.type){
   case TOGGLE_CART_HIDDEN:
     return{
      ...state,
      hidden:!state.hidden
     }
     case ADD_ITEM:
       const cartItemsFilteredById = state.cartItems.filter(id=>action.payload.id===id)
       return{
         ...state,
         cartItems:addItemToCart(state.cartItems,action.payload)
       }
     default:
       return state;
 }
}

export default cartReducer;