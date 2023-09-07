// reducers/dataReducer.js
const initialState = localStorage.getItem("AccountToken") != null;

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default:
            return state;
    }
};

export default dataReducer;
