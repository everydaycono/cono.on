import QuillWrapper, { formats, modules } from '@/components/RichEditor';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <QuillWrapper modules={modules} formats={formats} />
    </main>
  );
}
