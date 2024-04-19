"use client"

import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import { useCodeContext } from '@/lib/store/code';

export const CodeView = () => {
  const {code, upd} = useCodeContext();
  return (
    <CodeMirror 
      value={code} 
      height='800px' 
      extensions={[javascript({ jsx: true })]} 
      onChange={upd}  
      theme={okaidia} 
    />
  );
}

