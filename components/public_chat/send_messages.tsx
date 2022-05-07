import React, { useState, useRef, useEffect,  } from 'react'
import autosize from 'autosize'
import { sendMsg } from '../../services/chat_service'

function SendMessages() {

    const [message, setMessage] = useState<string>('')
    const msgTxtArea = useRef<any>()

    useEffect(() => {
        autosize(msgTxtArea.current);
    }, [])

    /** MESSAGE SENDING **/
    const [isSending, setIsSending] = useState(false)
    const [sendingMsgErr, setSendingMsgErr] = useState('')
    const sendMessage = async() => {
        if(isSending || message.trim().length == 0 )return;
        setIsSending(true)
        setSendingMsgErr('')

        try {
            const result = await sendMsg(message);
            if(!result.isSuccessful)
                setSendingMsgErr('Sending message failed!')
            else
                setMessage('')
        } catch (error) {
                setSendingMsgErr('Sending message failed!')
        }finally{
                setIsSending(false)
        }
    }

  return (
    <div className='mt-auto mx-3 border-2 p-3 rounded-md shadow-md hover:shadow-lg'>

    <div className="flex flex-row justify-between items-center">
    <textarea 
        rows={1}
        name="message"
        value={message}
        onChange={(e) =>
            setMessage(e.target.value)
        }
        ref={msgTxtArea}
        className='w-3/5 rounded-lg font-mono form-input max-h-36'
        placeholder="type here..."
    />
    <button  type='button' 
    className='w-1/5 h-14 border-1 rounded-full font-mono uppercase bg-green-600 text-white hover:bg-green-400 focus:bg-green-400' 
    onClick={() => sendMessage()}>{!isSending ? 'Send' : '...'}</button>
    </div>
    <p className='font-mono text-red-600'>{sendingMsgErr}</p>
        
    </div>
  )
}

export default SendMessages