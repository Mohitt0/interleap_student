import { useContext, useEffect, useRef, useState } from 'react';
import { ReactComponent as RightUp } from '../../Assets/right-up.svg'
import { ReactComponent as Notes_Logo } from '../../Assets/Notes_Logo.svg'
import { ReactComponent as Down_Icon } from '../../Assets/Down_Icon.svg'
import '../../Fonts/Figtree-VariableFont_wght.ttf'
import thumbnail from '../../Assets/thumbnail.png'
import { Box, Collapse, SwipeableDrawer, TextField } from '@mui/material';
import './YoutubeChat.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { YoutubeContext } from '../../Context';
import axios from 'axios';

const YoutubeChat = ({ handleShowChatHistory, handleShowYoutubeComponent, youtubeVideoDetails }) => {

    const { timestampInterval, setTimestampInterval, collapse, setCollapse, currentTimeStamp, setChatYoutubePlayer, selectedChapter, setSelectedChapter, slideChatHistory } = useContext(YoutubeContext);

    const [drawers, setDrawers] = useState([]);
    const youtubePlayerRef = useRef(null);

    useEffect(() => {
        setChatYoutubePlayer(youtubePlayerRef.current.getInternalPlayer())
    }, [])

    const handleShowChapterSummary = (chapterId) => {
        const newOpenDrawers = [];
        const currentDrawer = drawers[chapterId]
        newOpenDrawers[chapterId] = !currentDrawer;
        setDrawers(newOpenDrawers);
    }

    const handleChapterClick = async (chapter, i) => {
        const timestampInSeconds = youtubeVideoDetails?.chapters[i]?.timestamp;
        if (timestampInSeconds !== undefined) {
            const player = youtubePlayerRef.current.getInternalPlayer();

            if (player) {
                player.seekTo(timestampInSeconds, true);
            }
        }
        setSelectedChapter(chapter);
    };

    useEffect(() => {
        clearInterval(timestampInterval)
        // setTimestampInterval(null);
        if (collapse) {
            startTimestampInterval()
        }
    }, [collapse])

    const startTimestampInterval = () => {
        // if (timestampInterval) return;
        const player = youtubePlayerRef.current.getInternalPlayer();

        if (player) {
            const intervalId = setInterval(async () => {
                const currentTime = await player.getCurrentTime()
                checkChapter(currentTime);
            }, 1000);
            setTimestampInterval(intervalId)
        }
    }

    useEffect(() => {
        return () => {
            clearInterval(timestampInterval);
            // setTimestampInterval(null);
        };
    }, []);

    const checkChapter = (currentTime) => {
        for (let i = 0; i < youtubeVideoDetails?.chapters?.length - 1; i++) {
            if (currentTime >= youtubeVideoDetails?.chapters[i].timestamp && currentTime < youtubeVideoDetails?.chapters[i + 1].timestamp) {

                setSelectedChapter(youtubeVideoDetails?.chapters[i]);
                break;
            }
        }
        if (currentTime > youtubeVideoDetails?.chapters[youtubeVideoDetails?.chapters?.length - 1].timestamp) {
            setSelectedChapter(youtubeVideoDetails?.chapters[youtubeVideoDetails?.chapters?.length - 1])
        }
    };

    // const getChapterDescription = async() => {
    //     try {
    //         const { data } = await axios.post(`https://careerplatform-youtube.onrender.com/generate-chapter-descriptions/?video_id=${youtubeVideoDetails.link}`)
    //         console.log(data.data)
    //     }
    //     catch {

    //     }
    // }

    // useEffect(()=>{
    //     getChapterDescription()
    // },[youtubeVideoDetails])

  

    function convertSecondsToMinutesAndSeconds(timestampInSeconds) {
        const minutes = Math.floor(timestampInSeconds / 60);
        const seconds = Math.floor(timestampInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    const youtubeVideoReady = (event) => {
        const player = event.target;

        player.seekTo(currentTimeStamp);
        // player.pauseVideo();
    };


    return (
        <Collapse in={collapse} collapsedSize={40} className='rounded' timeout={1000}>
            <div className='youtube-video-container'>
                <div className="w-full flex gap-2 mt-1 mb-2 items-center">
                    <div className='smart-clip-text'>
                        Smart Clip
                    </div>
                    <div className='chapter-number'>
                        {youtubeVideoDetails?.chapters?.length}
                    </div>
                    {
                        !collapse &&
                        <div className='info-text'>
                            Opened in Side Panel
                        </div>
                    }

                    <div className='ml-auto gap-2 flex'>
                        <p
                            className='text-white w-fit cursor-pointer'
                            onClick={() => {
                                // handleClickEnlarge()
                                // setCollapse(!collapse)
                            }}
                        >
                            <Notes_Logo />
                        </p>
                        <p
                            className='enlarge-view-icon text-white w-fit cursor-pointer '
                            onClick={() => {

                            }}
                        >
                            <RightUp />
                        </p>
                    </div>
                </div>
                <div className="content flex flex-1 w-full">
                    <div className="timestamps-container">
                        {youtubeVideoDetails?.chapters?.map((chapter, i) => (
                            <div>
                                <div
                                    key={chapter.title} // Key should be unique for each element
                                    className={(selectedChapter?.id - 1) === i ? "selected-timestamp timestamp" : "timestamp"} onClick={() => handleChapterClick(chapter, i)}
                                >
                                    <div className="thumbnail relative">
                                        <FontAwesomeIcon icon={faPlay} style={{ color: '#EDEDFF', zIndex: 2, fontSize: 11, left: '50%', top: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', }} />
                                        <img src={thumbnail} alt="" />
                                    </div>
                                    <div className="content">
                                        <div className="title flex gap-1">
                                            <p>{chapter?.title} </p>
                                            <p className={`chapter-type ${chapter?.type === "concept" ? "concept" : "example"}`}>{chapter?.type}</p>
                                        </div>
                                        <div className="time">{convertSecondsToMinutesAndSeconds(chapter.timestamp)}</div>
                                    </div>
                                    <div className='ml-auto cursor-pointer' onClick={(event) => {
                                        event.stopPropagation();
                                        handleShowChapterSummary(i)
                                    }}>
                                        <Down_Icon />
                                    </div>
                                </div>
                                <Collapse in={drawers[i]}>
                                    <div className='chapter-summary' style={{ fontFamily: 'Figtree, sans-serif' }}>
                                        <p style={{ fontSize: '0.7rem', margin: '0px 0px 5px 0px' }}>Clip Summary</p>
                                        <p>{youtubeVideoDetails?.chaptersDescription[i]?.description}</p>
                                    </div>
                                </Collapse>
                            </div>
                        ))}
                    </div>
                    <div className='video'>
                        {/* <YouTube
                            videoId={youtubeVideoDetails?.link}
                            opts={{
                                height: 200,
                                playerVars: {
                                    autoplay: 1,
                                    controls: 0,
                                    fs: 0
                                },
                            }}
                            onReady={youtubeVideoReady}
                            ref={youtubePlayerRef}
                        /> */}
                    </div>

                </div>

            </div>
        </Collapse>

    )
}

export default YoutubeChat