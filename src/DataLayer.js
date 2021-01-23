import React, {
    createContext,
    useContext,
    useReducer
} from 'react';

export const DataLayerContext = createContext(); // prepares data layer for what's to come

export const DataLayer = ({ initialState, reducer, children }) => ( // children is whatever the data layer wraps in index.js
    // create context API
    <DataLayerContext.Provider value={useReducer(reducer, initialState)}> 
        {children}
    </DataLayerContext.Provider>
)

export const useDataLayerValue = () => useContext(DataLayerContext);