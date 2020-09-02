import Cookie from "js-cookie";
import jwt_decode from "jwt-decode"
export default function ({redirect,store}){
    try {
        const token = Cookie.get("authorization");
        const decoded = jwt_decode(token);
        const exp = decoded.exp; // in seconds
        const current_time = new Date().getTime() / 1000; // in seconds
        const fiveMinAfter = current_time + 60*5; // five minutes after the current time (this will be used to ask for new token before the old one ends)
        if (fiveMinAfter > exp){ // token is expired
            redirect("/");
        }
        if(store.getters.getAccountData === ''){
            store.dispatch('setAccountData', {username: decoded.username,account_id: decoded.cinemaAccount_id,cinema_id: decoded.cinema_id,name_ar: decoded.name_ar,name_en: decoded.name_en,role: decoded.role})
        }
    }catch(err){
        redirect("/");
    }
  
};