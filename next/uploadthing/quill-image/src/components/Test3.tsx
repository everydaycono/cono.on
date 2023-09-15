'use client';
import { uploadFiles } from '@/utils/uploadthing';
import dynamic from 'next/dynamic';
import { useRef, LegacyRef, useState, useEffect, useCallback } from 'react';
import type ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
interface IWrappedComponent extends React.ComponentProps<typeof ReactQuill> {
  forwardedRef: LegacyRef<ReactQuill>;
}

const ReactQuillBase = dynamic(
  async () => {
    const { default: ReactQuill } = await import('react-quill');

    function QuillJS({ forwardedRef, ...props }: IWrappedComponent) {
      return <ReactQuill ref={forwardedRef} {...props} />;
    }

    return QuillJS;
  },
  {
    ssr: false,
  }
);

export function Box() {
  const quillRef = useRef<ReactQuill>(null);
  return (
    <>
      <div>
        <ReactQuillBase className="h-96" forwardedRef={quillRef} />
      </div>
    </>
  );
}

export default function Test3() {
  return <Box />;
}
