export const profileReducer = (state,action)=>{
    switch (action.type){
        case 'FIRSTNAME' :
            return {
                ...state,
                firstname:action.payload
            }
        case 'LASTNAME' :
            return {
                ...state,
                lastname:action.payload
            }
        case 'MOBILE' :
            return {
                ...state,
                mobile:action.payload
            }
        case 'EMAIL' :
            return {
                ...state,
                email:action.payload
            }
        case 'STREET' :
            return {
                ...state,
                street:action.payload
            }
        case 'CITY' :
            return {
                ...state,
                city:action.payload
            }
        case 'LANDMARK' :
            return {
                ...state,
                landmark:action.payload
            }
        case 'STATE' :
            return {
                ...state,
                state:action.payload
            }
        case 'PINCODE' :
            return {
                ...state,
                pincode:action.payload
            }
    }
}