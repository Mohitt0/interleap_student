import React, { useContext, useEffect, useRef, useState } from 'react';
import './YoutubeSmartClip.css';
import thumbnail from '../../Assets/thumbnail.png'
import { ReactComponent as Down_Icon } from '../../Assets/Down_Icon.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Notes_Logo } from '../../Assets/Notes_Logo.svg'
import '../../Fonts/Figtree-VariableFont_wght.ttf'
import ReactPlayer from 'react-player';
import { Collapse } from '@mui/material';

function YoutubeSmartClip({expandYoutubeComponent, setExpandYoutubeComponent}) {

    return (
        <Collapse className='w-full h-full ml-5 rounded-[8px]' in={expandYoutubeComponent} collapsedSize={200} timeout={900}>
            <div className="youtube-smart-clip-container">
                <div className="w-full flex">
                    <div className="w-full flex gap-2 my-1 items-center">
                        <div className='smart-clip-text'>
                            Videos
                        </div>
                        <div className='chapter-number'>
                            {/* {youtubeVideoDetails?.chapters?.length} */}
                        </div>
                    </div>
                    <div className='ml-auto gap-2 flex items-center'>
                        <p
                            className='text-white w-fit cursor-pointer'
                            onClick={() => {
                                // handleClickEnlarge()
                                // setCollapse(!collapse)
                            }}
                        >
                            <Notes_Logo />
                        </p>
                    </div>
                </div>
                <div className='video'>
                    <ReactPlayer
                        url="https://vimeo.com/583715912/08c1e486b8"
                        controls={true}
                        width="100%"
                        height='300px'
                    />
                </div>
                <div className="timestamps-container">
                    {/* {
          youtubeVideoDetails?.chapters?.map((chapter, i) => ( */}
                    <div>
                        <div className={`"selected-timestamp timestamp" : "timestamp"}`} >
                            <div className="thumbnail relative">
                                <FontAwesomeIcon icon={faPlay} style={{ color: '#EDEDFF', zIndex: 2, fontSize: 11, left: '50%', top: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', }} />

                                {/* <img src={thumbnail} alt="" /> */}

                            </div>

                            <div className="content">
                                <div className="title flex gap-1">
                                    <p></p>
                                    <p className={`chapter-type`}></p>
                                </div>
                            </div>
                            <div className='ml-auto cursor-pointer' onClick={(event) => {
                                event.stopPropagation();
                                // handleShowChapterSummary(i)
                            }}>
                                <Down_Icon />
                            </div>
                        </div>
                        {/* <Collapse in={drawers[i]}>
                <div className='chapter-summary text-left' style={{ fontFamily: 'Figtree, sans-serif' }}>
                  <p style={{ fontSize: '0.7rem', margin: '0px 0px 5px 0px' }}>Clip Summary</p>
                  <p>{chapter?.description}</p>
                </div>
              </Collapse> */}
                    </div>
                    {/* ))
        } */}
                </div>



            </div >
        </Collapse>
    );
}

export default YoutubeSmartClip;
