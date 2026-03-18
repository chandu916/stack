const currentUserReducer = (state = null, action) => {
    switch(action.type){
        case 'FETCH_CURRENT_USER' :
            return action.payload ;
        case 'UPDATE_CURRENT_USER' : {
            if (!action.payload) return state;
            if (action.payload.result) return action.payload;
            if (state?.result) {
                return {
                    ...state,
                    result: {
                        ...state.result,
                        ...action.payload,
                    },
                };
            }
            return action.payload;
        }
        default:
            return state;
    }
}
export default currentUserReducer;