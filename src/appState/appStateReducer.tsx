export const appGlobalState: any = {
    items: [],
    bills: {},
    customer: [],
    isOpen: false
}
// import this in every component to access global state

export const appStateReducer = (state: any, action: any) => {
    switch (action.type) {
        case "ADD_ITEM_TO_BILL":
            const newItems = [...state.items]
            newItems.push(action.payload)
            return { ...state, items: newItems };
        case "REMOVE_ITEM_FROM_BILL":
            return { ...state }
        case "ADD_CUSTOMER":
            const newCustomer = [...state.customer];
            newCustomer.push(action.payload);
            return { ...state, customer: newCustomer };
        case "SET_CUSTOMER_LIST":
            return { ...state, customer: action.payload };
            case "TOGGLE_DRAWER":
                return {
                  ...state,
                  isOpen: !state.isOpen,
                };
        default:
            return state
    }
}