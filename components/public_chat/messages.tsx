import { RealtimeSubscription } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react'
import { getSignedInUserId } from '../../services/auth_service';
import { getOldPublicMessages, Message, removeSubscription, subscribeToNewMessages } from '../../services/chat_service';

function Messages() {
   const [userId, setUserId] = useState('') 
   const [messages, setMessages] = useState<Array<Message>>([])

    async function getOldMessages() {
      const oldMessages = await getOldPublicMessages();
      if(oldMessages != null){
          setMessages(oldMessages);
      }
    }

    function onNewMsgReceived(newMessage : Message) {
        setMessages(messages => [...messages, newMessage])
    }

useEffect(() => {
    const userIdIfDefined = getSignedInUserId()
    var subScription : RealtimeSubscription | null;

    if(typeof userIdIfDefined === 'string'){
        setUserId(userIdIfDefined)
        getOldMessages()
        subScription = subscribeToNewMessages(onNewMsgReceived)
    }
    return () => {
        removeSubscription(subScription)
    }
  }, [])
   

 return (
    <div className='h-96 mx-3 p-3 mb-3 flex flex-col justify-start overflow-y-auto'>
        {messages.map(
            (aMsg) => <p key={aMsg.id} className={`rounded-md h-fit p-3 mb-2 font-mono ${aMsg.sender_id == userId ? 'bg-green-200 text-black ml-auto' : 'bg-green-900 text-white mr-auto'}`}>{aMsg.message}</p>
        )}
    </div>
  )
}

export default Messages