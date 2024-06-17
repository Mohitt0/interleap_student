import React, { createContext, useEffect, useState } from 'react';

// Create a new context
export const YoutubeContext = createContext();

// Provider component
export const YoutubeProvider = ({ children }) => {

    const [collapse, setCollapse] = useState(true);
    const [youtubeVideoDetails, setYoutubeVideoDetails] = useState();
    const [currentTimeStamp, setCurrentTimeStamp] = useState(0);
    const [chatYoutubePlayer, setChatYoutubePlayer] = useState();
    const [selectedChapter, setSelectedChapter] = useState({ id: 1, timestamp: 0 });
    const [slideChatHistory, setSlideChatHistory] = useState(false);
    const [timestampInterval, setTimestampInterval] = useState()

    return (
        <YoutubeContext.Provider value={{ timestampInterval, setTimestampInterval, collapse, setCollapse, youtubeVideoDetails, setYoutubeVideoDetails, currentTimeStamp, setCurrentTimeStamp, chatYoutubePlayer, setChatYoutubePlayer, selectedChapter, setSelectedChapter, slideChatHistory, setSlideChatHistory }}>
            {children}
        </YoutubeContext.Provider>
    );
};