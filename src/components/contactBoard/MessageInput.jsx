import { PiMicrophoneFill } from "react-icons/pi";
import { IoSend } from "react-icons/io5";


export default function MessageInput({

    setShowRecorder

}){

    return(

        <div className="message-input">

            <textarea

                placeholder="Type your message..."

            />

            <div className="message-actions">

                {/* MIC */}

                <button

                    className="mic-btn"

                    onClick={() => setShowRecorder(true)}

                >

                    <PiMicrophoneFill size={28}/>

                </button>


                {/* SEND */}

                <button

                    className="send-btn"

                >

                    <IoSend size={24}/>

                </button>

            </div>

        </div>

    )

}