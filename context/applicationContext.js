import { createContext } from "react";

export const ApplicationContext = createContext(null);

export const getApplicationInitialState = () => {
    return {
        yearlyReview: {},
        sentimentalReview: {},
        environmentReview: {}
    };
};

export const getApplicationReducer = (oldState, action) => {

    const newState = { ...oldState };
    switch (action.type) {
        case "UPDATE_YEARLY_REVIEW":
            newState.yearlyReview = action.payload;
            break;
        case "UPDATE_SENTIMENTAL_REVIEW":
            newState.sentimentalReview = action.payload;
            break;
        case "UPDATE_ENVIRONMENTAL_REVIEW":
            newState.environmentalReview = action.payload;
            break;
    }

    return newState;
};
