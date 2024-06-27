export const appGlobalState: any = {
    items: [],
    bills: {},
    customer: []
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
        default:
            return state
    }
}