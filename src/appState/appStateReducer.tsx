export const appGlobalState: any = {
  items: [],
  bills: {},
  isOpen: true
};
// import this in every component to access global state

export const appStateReducer = (state: any, action: any) => {
  switch (action.type) {
    case "TOGGLE_DRAWER":
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    case "ADD_ITEM_TO_BILL":
      const newItems = [...state.items];
      newItems.push(action.payload);
      return { ...state, items: newItems };
    case "REMOVE_ITEM_FROM_BILL":
      return { ...state };
    default:
      return state;
  }
};
