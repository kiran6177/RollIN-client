import {load} from '@cashfreepayments/cashfree-js'; 

let cashfree;
var initializeSDK = async function () {          
    cashfree = await load({
        mode: "sandbox"
    });
};
export const doPayment = async (session_id)=>{
    await initializeSDK();
    let checkoutOptions = {
        paymentSessionId:session_id,
        redirectTarget: '_modal'
    }

    return await cashfree.checkout(checkoutOptions) 
}