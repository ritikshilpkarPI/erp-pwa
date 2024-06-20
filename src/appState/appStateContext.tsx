import { createContext, useReducer } from "react";
import { appGlobalState, appStateReducer } from "./appStateReducer";


const AppStateProvider = ({ children }: any) => {
    const [globalState, dispatch] = useReducer(appStateReducer, appGlobalState);
    return (
        <AppStateContext.Provider value={{ globalState, dispatch }}>
            {children}
        </AppStateContext.Provider>
    )
}


export const AppStateContext = createContext(appGlobalState)
export default AppStateProvider;