import React, { useEffect, useRef, useState } from 'react';
import './YoutubeSmallContainer.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const YoutubeSmallContainer = ({ youtubeSmallContainerVisible, youtubeVideoDetails, youtubeMetaData }) => {

    return (

        <div key={youtubeVideoDetails} className={"youtube-small-container" + (youtubeSmallContainerVisible ? '' : ' hidden')}>
            <div className="video">
                {
                    youtubeVideoDetails ?
                        <FontAwesomeIcon icon={faPlay} style={{ color: '#EDEDFF', zIndex: 2, fontSize: 11, margin: 'auto' }} />
                        :
                        <div class="stage">
                            <div class="dot-flashing">
                            </div>
                        </div>
                }
                <div style={{ display: '' }}>{youtubeVideoDetails?.lesson_title}</div>
                <img src={youtubeMetaData?.data?.thumbnail_url} alt="" style={{ height: '100%', borderRadius: '3px', position: 'absolute', top: 0, maxWidth: 'none' }} />

            </div>
            <p className='font-semibold'>{youtubeMetaData?.data?.title}</p>
        </div>

    );
}

export default YoutubeSmallContainer;
