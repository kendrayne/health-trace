import Navbar from '@/components/navbar/navbar';
import LandingPage from './LandingPage';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full bg-surface-light dark:bg-surface-dark">
      <main className="flex flex-col w-full">
        <Navbar />
        <LandingPage/>
      </main>
    </div>
  );
}