import { getFeedsApi, getIngredientsApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TConstructorItems,
  TIngredient,
  TOrder,
  TOrdersData,
  TUser
} from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TInitialState = {
  loading: boolean;
  ingredients: TIngredient[];
  orderModalData: TOrder | null;
  orderRequest: boolean;
  user: TUser;
  // orders: TOrder[]; ///
  // totalOrders: number; ///
  // ordersToday: number; ///
  userOrders: TOrder[] | null;
  isAuthChecked: boolean;
  isInit: boolean;
  isModalOpened: boolean;
  errorText: string;
  constructorItems: TConstructorItems;
  feed: TOrdersData; ///
};

export const initialState: TInitialState = {
  loading: false,
  ingredients: [],
  orderModalData: null,
  orderRequest: false,
  user: {
    name: '',
    email: ''
  },
  userOrders: null,
  isAuthChecked: false,
  isInit: false,
  isModalOpened: false,
  errorText: '',
  constructorItems: {
    bun: {
      price: 0
    },
    ingredients: []
  },
  feed: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

export const burgerApp = createSlice({
  name: 'burgerApp',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    }
  },
  selectors: {
    selectLoading: (state) => state.loading,
    getIngredients: (state) => state.ingredients,
    getFeedSelector: (state) => state.feed,
    selectConstructorItems: (state) => state.constructorItems,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      //получить ингредиенты
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
      })

      //получить заказ
      .addCase(fetchNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchNewOrder.rejected, (state, action) => {
        state.orderRequest = false;
      })
      .addCase(fetchNewOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      })

      //получить ленту
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
      });
  }
});

//САНКИ
export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

export const fetchNewOrder = createAsyncThunk(
  'orders/newOrder',
  async (data: string[]) => orderBurgerApi(data)
);

export const fetchFeed = createAsyncThunk<TOrdersData>('feed/fetch', async () =>
  getFeedsApi()
);

export const {
  selectLoading,
  getIngredients,
  getFeedSelector,
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData
} = burgerApp.selectors;

export const { addIngredient } = burgerApp.actions;

export default burgerApp.reducer;
