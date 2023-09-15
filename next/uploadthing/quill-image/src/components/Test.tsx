// 'use client';
// import dynamic from 'next/dynamic';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import 'react-quill/dist/quill.snow.css';
// import type ReactQuill from 'react-quill';
// const QuillWrapper = dynamic(() => import('react-quill'), {
//   ssr: false,
//   loading: () => <p>Loading ...</p>,
// });

// export default function Test() {
//   const [isMounted, setIsMounted] = useState<boolean>(false);
//   const quillRef = useRef<ReactQuill>(null);
//   const imageHanlder = useCallback(async () => {
//     if (!isMounted) return;
//     if (typeof window !== 'undefined') return;

//     const input = document.createElement('input');
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click();
//     input.onchange = async () => {
//       const file: File | null = input && input.files ? input.files[0] : null;
//       if (quillRef.current && file) {
//         let quillObj = quillRef.current.getEditor();

//         try {
//           const uploadFile = await uploadFiles({
//             files: [new File([file], file.name, { type: file.type })],
//             endpoint: 'imageUploader',
//             onUploadBegin: () => {
//               alert('upload has begun');
//             },
//             onUploadProgress: (progress) => {
//               console.log(progress);
//             },
//           });

//           const range = quillObj.getSelection()?.index ?? 1;
//           quillObj.setSelection(range, 1);
//           const uploadImg = uploadFile[0];
//           quillObj?.clipboard.dangerouslyPasteHTML(
//             range,
//             `<img src=${uploadImg.url} alt=${uploadImg.name} />`
//           );
//         } catch (error) {
//           console.error(error, 'This is an error message');
//           return false;
//         }
//       }
//     };
//   }, [isMounted]);
//   const modules = {
//     toolbar: {
//       container: [
//         //[{ 'font': [] }],
//         [{ header: [1, 2, 3, 4, false] }],
//         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//         [
//           { list: 'ordered' },
//           { list: 'bullet' },
//           { indent: '-1' },
//           { indent: '+1' },
//         ],
//         ['link', 'image'],
//         [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
//         ['clean'],
//       ],
//       handler: {
//         image: imageHanlder,
//       },
//     },
//   };

//   const formats = [
//     'header',
//     'font',
//     'size',
//     'bold',
//     'italic',
//     'underline',
//     'strike',
//     'blockquote',
//     'list',
//     'bullet',
//     'indent',
//     'link',
//     'image',
//     'video',
//   ];

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       setIsMounted(true);
//     }
//   }, []);

//   if (!isMounted) return null;

//   return (
//     <QuillWrapper
//       ref={quillRef}
//       style={{ height: '600px', maxWidth: '1000px' }}
//       theme="snow"
//       modules={modules}
//       formats={formats}
//     />
//   );
// }
// Type '{ ref: RefObject<ReactQuill>; style: { height: string; maxWidth: string; }; theme: string; modules: { toolbar: { container: (string[] | { header: (number | boolean)[]; }[] | ({ ...; } | { ...; })[] | ({ ...; } | ... 1 more ... | { ...; })[])[]; handler: { ...; }; }; }; formats: string[]; }' is not assignable to type 'IntrinsicAttributes & ReactQuillProps'.
//   Property 'ref' does not exist on type 'IntrinsicAttributes & ReactQuillProps'
