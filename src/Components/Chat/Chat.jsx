import React, { useContext, useEffect, useRef, useState } from 'react';
import './Chat.css';
import { Collapse, Fade, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import CodeEditor from '../CodeEditor/CodeEditor';
import Select from 'react-dropdown-select';
import { ReactComponent as Code } from '../../Assets/Code.svg'
import { ReactComponent as Avatar } from '../../Assets/Avatar.svg'
import { ReactComponent as Profile_Picture } from '../../Assets/Profile_Picture.svg'
import Progress from '../Progress/Progress';
import { GeneralContext } from '../../Context';

function Chat({ courseDetails }) {

    const [modules, setModules] = useState();
    const [topics, setTopics] = useState();
    const [messages, setMessages] = useState([]);

    const { studentInfo } = useContext(GeneralContext);

    const initialMessage = () => {
        setTimeout(() => {
            setMessages((m) => [
                {
                    sender: "avatar",
                    message: `Hey ${studentInfo?.name}! 👋🏼`
                },
                {
                    sender: "avatar",
                    message: "I'm your AI assistant and I will be helping you learn Java Full Stack Development in faster, simpler and more practical ways. You can call me Praxi."
                },
            ])
        }, 500);
    }

    useEffect(() => {
        initialMessage()
    }, [])

    return (
        <Fade in={true} timeout={500}>

            <div className="chat-container">
                {console.log(studentInfo)}
                <Progress courseDetails={courseDetails} />
                <div className="chats" style={{}} >
                    <TransitionGroup >
                        {messages.map((item, i) => (
                            <Collapse key={item.text} timeout={1000}>
                                {/* <ListItem className={item.text === "Start learning any technical topic more easily. Just add a relevant Youtube video link below to get bite-sized videos, summaries and more." ? "second-message" : "first-message"}>
                                    <ListItemText primary={item} />
                                </ListItem> */}
                                <div className={`${item.sender}-message message`}>
                                    {item.sender === 'avatar' ? <Avatar /> : < Profile_Picture />}
                                    <div className={`${item.sender}-message-content`}>
                                        {item.message}
                                    </div>
                                </div>

                            </Collapse>
                        ))}
                    </TransitionGroup>
                </div>

                <div className="flex flex-col w-full px-2">
                    <div className='flex gap-2 px-3 pb-2'>
                        <button
                            className='recommendation'
                            onClick={() => {
                                setMessages((m) => [
                                    ...m,
                                    {
                                        sender: "user",
                                        message: "Got It!"
                                    }
                                ])
                                setMessages((m) => [
                                    ...m,
                                    {
                                        sender: "avatar",
                                        message: "Before we get started, here are some simple controls highlighted for you, in this Chat Panel, to check your Course Progress and access specific modes like Code Editor which can appear depending on the current learning context."
                                    }
                                ])

                            }}
                        >
                            Got It!
                        </button>
                    </div>
                    <div className='flex w-full justify-between px-2'>
                        <TextField
                            className='chat-input-box pr-0'
                            placeholder="Paste youtube video URL"
                            variant="filled"
                            InputProps={{
                                endAdornment: (
                                    // <div className='flex gap-1'>
                                    //     <div className='rounded-md bg-[#0000001A] px-3 py-1 cursor-pointer'>
                                    //         <FontAwesomeIcon icon={faMicrophone} fontSize={15} color='black' />
                                    //     </div>
                                    //     <div className='rounded-md bg-[#0000001A] px-2 py-1 cursor-pointer flex items-center'>
                                    //         <div className='bg-black flex rounded-sm p-1'>
                                    //             <FontAwesomeIcon icon={faCode} fontSize={11} color='white' />
                                    //         </div>
                                    //     </div>
                                    // </div>
                                    <FontAwesomeIcon icon={faMicrophone} fontSize={15} color='black' />


                                ),
                            }}
                        // value={message}
                        // onChange={(e) => setMessage(e.target.value)}
                        // onKeyDown={handleEnter}
                        />
                        <div className='rounded-md bg-[#F5F5FF] px-3 py-1 cursor-pointer flex items-center justify-center ml-2'>
                            <Code />
                        </div>
                    </div>

                </div>
            </div>
        </Fade >

    );
}

export default Chat;
