const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
  
  // Debug log
  store.subscribe(() => {
    console.log('Store Updated:', store.getState());
  });
  
export default store;
  