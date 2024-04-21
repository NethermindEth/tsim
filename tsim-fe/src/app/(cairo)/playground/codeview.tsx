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
      className='w-full p-2 rounded-lg '
      value={code} 
      height='65vh' 
      extensions={[javascript({ jsx: true })]} 
      onChange={upd}  
      theme={okaidia} 
    />
  );
}

