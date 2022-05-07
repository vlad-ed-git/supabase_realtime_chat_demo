import React from 'react'
import Messages from '../../components/public_chat/messages'
import SendMessages from '../../components/public_chat/send_messages'

function PublicChat() {
    return (
    <div className='flex flex-col justify-start mt-5 p-5'>
    <Messages />
    <SendMessages />
    </div>
  )
}

export default PublicChat