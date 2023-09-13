'use client';
import { useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//@ts-ignore
import ImageResize from 'quill-image-resize';
Quill.register('modules/ImageResize', ImageResize);

import { uploadFiles } from '@/utils/uploadthing';

const RichEditor = () => {
  const quillRef = useRef<ReactQuill>(null);

  const imageHandler = async () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file: File | null = input && input.files ? input.files[0] : null;
      if (quillRef.current && file) {
        let quillObj = quillRef.current.getEditor();

        try {
          const uploadFile = await uploadFiles({
            files: [new File([file], file.name, { type: file.type })],
            endpoint: 'imageUploader',
            onUploadBegin: () => {
              alert('upload has begun');
            },
            onUploadProgress: (progress) => {
              console.log(progress);
            },
          });

          const range = quillObj.getSelection()?.index ?? 1;
          quillObj.setSelection(range, 1);

          const uploadImg = uploadFile[0];
          quillObj?.clipboard.dangerouslyPasteHTML(
            range,
            `<img src=${uploadImg.url} alt=${uploadImg.name} />`
          );
        } catch (error) {
          console.error(error, 'This is an error message');
          return false;
        }
      }
    };
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
    <ReactQuill
      style={{ height: '600px', maxWidth: '1000px' }}
      ref={quillRef}
      theme="snow"
      modules={modules}
      onChange={(event) => {
        console.log(event);
      }}
    />
  );
};

export default RichEditor;
