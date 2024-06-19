import React, { useState } from 'react'
import Select from 'react-dropdown-select'

const Progress = ({ courseDetails }) => {

    const [modules, setModules] = useState();
    const [topics, setTopics] = useState();

    return (
        <div className='chat-header w-full flex gap-2 px-2'>
            <Select
                className='select-topic'
                options={modules}
                labelField="node_name"
                valueField="node_id"
                onChange={(values) => console.log(values)}
                menuClassName="custom-menu"
            />
            <Select
                className='select-topic'
                options={topics}
                labelField="node_name"
                valueField="node_id"
                onChange={(values) => console.log(values)}
                menuClassName="custom-menu"
            />
        </div>
    )
}

export default Progress