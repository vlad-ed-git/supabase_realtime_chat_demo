import { RealtimeSubscription } from "@supabase/supabase-js";
import { ServiceResponse } from "./service_response";
import supabase from "./supabase_config";

export type Message ={
    message : string,
    sender_id : string,
    id : string,
    created_at : string
}

export async function sendMsg(message : string,) : Promise<ServiceResponse> {
    //sender_id is auto made in supabase
   const {error }  = await supabase.from('messages')
    .insert(
        {message : message,}
    )
    if(error){
        console.log(`{error.code} {error.message}`)
        return {isSuccessful:false,}
    }else{
        return {isSuccessful: true}
    }
}

export async function getOldPublicMessages() {
    const {data} = await supabase
            .from<Message>('messages')
            .select('*')
            .order('created_at', { ascending: true }) //we are getting old messages 
            ;
    return data;
}


export function subscribeToNewMessages(onNewMessage : Function) : RealtimeSubscription {
    const subscription = supabase
    .from<Message>('messages')
    .on('INSERT', (payload) => {
        onNewMessage(payload.new)
    }).subscribe()
return subscription;
}

export function removeSubscription(sub  : RealtimeSubscription | null){
    if(sub)
    supabase.removeSubscription(sub)
}