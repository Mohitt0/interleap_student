import React, { useContext, useEffect, useState } from 'react';
import './CodeEditor.css';
import { CircularProgress } from '@mui/material';
import Editor from "@monaco-editor/react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function CodeEditor() {

    const defaultCode = `// Write your code here`;
    const [code, setCode] = useState(defaultCode);
    const [value, setValue] = useState(code || "");
    const [loading, setLoading] = useState(false);
    const [outputDetails, setOutputDetails] = useState();

    const handleCompile = async () => {
        try {
            // const body = {
            //   input_: JSON.stringify(assignmentData?.unitTests[0]?.input),
            //   output: JSON.stringify(assignmentData?.unitTests[0]?.output),
            //   lang: youtubeVideoDetails?.language || 'python',
            //   code_file: JSON.stringify(code)
            // }
            const transformed = code.split('\n').map(line => line.replace(/^\s+/, match => match.replace(/ {4}/g, '\t'))).join('\n');

            const body = {
                language: "javascript",
                stdin: "string",
                files: "let p = 10;"
            }

            // const body = {
            //   "input_": "[1,2,3]",
            //   "output": "OP",
            //   "lang": "Python",
            //   "code_file": "print(\"OP\")\nprint(\"\")"
            // }
            setLoading(true)

            const result = await axios.post('https://careerplatform-onecompiler.onrender.com/run_code', body);
            // setOutputDetails(result?.data?.result)
            console.log(result)
            setLoading(false)
        }
        catch (e) {
            setLoading(false)
            console.log("Error while calling Code Run API:", e.message)
        }
    };

    return (
        <div className='editor-container'>
            <div className="editor-header">
                <div className="language">JAVA</div>
                <div className="button-container">
                    <button className='editor-button'>
                        CLEAR
                    </button>
                    <button
                        className='editor-button'
                        onClick={() => {
                            handleCompile()
                        }}
                    >
                        <FontAwesomeIcon icon={faPlay} fontSize={10} />
                        RUN
                    </button>
                </div>
            </div>
            <div className="editor">
                <Editor
                    className='rounded code-editor'
                    language={'python'}
                    wrapperClassName="font-mono"
                    value={value}
                    theme="vs-dark"
                    defaultValue="// some comment"
                    onChange={(value) => {
                        setCode(value);
                    }}
                    options={{
                        scrollbar: {
                            alwaysConsumeMouseWheel: false,
                        },
                        scrollBeyondLastLine: false,
                    }}
                />
            </div>
        </div>

    );
}

export default CodeEditor;
