export default function registerReducer(state,action){
    switch(action.type){
        case 'name' :
            return {
                ...state,
                name : action.payload
            }
        case 'email' :
            return {
                ...state,
                email : action.payload
            }
        case 'password' :
            return {
                ...state,
                password : action.payload
            }
        default: 
            break;
    }
}