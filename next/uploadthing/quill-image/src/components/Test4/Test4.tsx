'use client';
import { useRef } from 'react';
import QuillNoSSRWrapper from './QuillWrapper';
import ReactQuill, { Quill } from 'react-quill';

const EditorComponent = () => {
  const quillInstance = useRef<ReactQuill>(null);

  const imageHandler = async () => {
    console.log('?AS?A?');
  };
  const modules = {
    toolbar: {
      container: [
        //[{ 'font': [] }],
        [{ header: [1, 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link', 'image'],
        [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
        ['clean'],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    ImageResize: {
      parchment: Quill.import('parchment'),
    },
  };

  return (
    <QuillNoSSRWrapper
      forwardedRef={quillInstance}
      modules={modules}
      theme="snow"
      placeholder="내용을 입력해주세요."
    />
  );
};

export default EditorComponent;
