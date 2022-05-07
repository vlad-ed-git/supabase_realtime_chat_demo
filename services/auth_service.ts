import { ServiceResponse } from "./service_response";
import supabase from "./supabase_config";


export async function SignOut() :  Promise<ServiceResponse> {
   const {error} =  await supabase.auth.signOut();
   return {isSuccessful : error == null };
}

export async function signIn(email :string, password : string, ) :  Promise<ServiceResponse> {
    let { user, error } =  await supabase.auth.signIn({ email, password });
    if(error != null){
        console.log(`${error.status} : Sign In Error -> ${error.message}`);

        if(error.message == 'Invalid login credentials'){
            return {isSuccessful : false, messageIfFailed : 'Invalid email or password'}; 
        }else{
            return {isSuccessful : false, messageIfFailed : 'An unknown error occurred! Please retry'}
        }
    }
    else return  {isSuccessful : true, data : user}
  
}

export async function signUp(email:string, password : string, username : string) :  Promise<ServiceResponse> {
    let { user, error } =  await supabase.auth.signUp({ email, password }, {data : {username}});
    if(error != null){
        console.log(`${error.status} : Sign Up Error -> ${error.message}`);
        var msg :string = 'An unknown error occurred! Please retry'
        
        if(error.message == 'Unable to validate email address: invalid format'){
            msg = 'Please enter a valid email';
        }else if(error.message == 'Password should be at least 6 characters'){
            msg = 'Your password is too weak! Try at least 6 characters';
        }else if(error.message == 'User already registered'){
            msg = 'A user with that email has already registered!'
        }else if(error.message == 'Database error saving new user'){
            msg = 'Please try a different username'
        }
        return {isSuccessful : false, messageIfFailed : msg}
    }else{
        return {isSuccessful : true, data : user}
    }
}

export function getSignedInUserId() {
    const user = supabase.auth.user();
    return user?.id;
}