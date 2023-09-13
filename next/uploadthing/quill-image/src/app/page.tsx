import RichEditor from '@/components/RichEditor';
// import { UploadButton } from '@/utils/uploadthing';
// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import '@uploadthing/react/styles.css';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RichEditor />
    </main>
  );
}
