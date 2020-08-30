import Cookie from "js-cookie";
import jwt_decode from "jwt-decode"
export default function ({redirect}){
    try {
        const token = Cookie.get("authorization");
        const decoded = jwt_decode(token);
        const exp = decoded.exp; // in seconds
        const current_time = new Date().getTime() / 1000; // in seconds
        const fiveMinAfter = current_time + 60*5; // five minutes after the current time (this will be used to ask for new token before the old one ends)
        if (fiveMinAfter < exp){ // token is not expired
            redirect("/dashboard");
        }
    }catch(err){

    }
};