'use client';
import { uploadFiles } from '@/utils/uploadthing';
import dynamic from 'next/dynamic';
import { useRef, LegacyRef, useState, useEffect, useCallback } from 'react';
import type ReactQuill from 'react-quill';
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
interface IWrappedComponent extends React.ComponentProps<typeof ReactQuill> {
  forwardedRef: LegacyRef<ReactQuill>;
}

const ReactQuillBase = dynamic(
  async () => {
    const { default: ReactQuill } = await import('react-quill');
    //@ts-ignore
    // const { default: ImageResize } = await import('quill-image-resize');
    // Quill.register('modules/ImageResize', ImageResize);

    function QuillJS({ forwardedRef, ...props }: IWrappedComponent) {
      return <ReactQuill ref={forwardedRef} {...props} />;
    }

    return QuillJS;
  },
  {
    ssr: false,
  }
);

export function Test2() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const quillRef = useRef<ReactQuill>(null);

  const imageHandler = useCallback(async () => {
    console.log(quillRef.current, 'quillRef.current');
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    console.log('aaaa');
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
  }, [quillRef.current]);

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
    // ImageResize: {
    //   parchment: Quill.import('parchment'),
    // },
  };
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <div>
        <ReactQuillBase
          className="h-96"
          onChange={(data) => console.log(data)}
          modules={modules}
          formats={formats}
          forwardedRef={quillRef}
        />
      </div>
    </>
  );
}
