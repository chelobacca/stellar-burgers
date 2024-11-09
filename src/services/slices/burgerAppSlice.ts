import { createSlice } from "@reduxjs/toolkit";
import { TIngredient, TOrder, TUser } from "@utils-types";

type TInitialState = {
    ingredients: TIngredient[];
    loading: boolean;
    orderModalData: TOrder | null;
    orderRequest: boolean;
    user: TUser;
    orders: TOrder[];
    totalOrders: number;
    ordersToday: number;
    userOrders: TOrder[] | null;
    isAuthenticated: boolean;
    isInit: boolean;
    isModalOpened: boolean;
    errorText: string;
    // constructorItems: TConstructorItems;

  };

  export const initialState: TInitialState = {
    ingredients: [],
    loading: false,
    orderModalData: null,
    orderRequest: false,
    user: {
      name: '',
      email: ''
    },
    orders: [],
    totalOrders: 0,
    ordersToday: 0,
    userOrders: null,
    isAuthenticated: false,
    isInit: false,
    isModalOpened: false,
    errorText: '', 
        // constructorItems: {
    //   bun: {
    //     price: 0
    //   },
    //   ingredients: []
    // },
  };

  export const burgerApp = createSlice({
    name: 'burgerApp',
    initialState,
    reducers: {

    },
    selectors: {

    },
    extraReducers: (builder) => {

    }

  });

  export const {
    
  } = burgerApp.selectors;
  
  export const {
   
  } = burgerApp.actions;

  export default burgerApp.reducer;