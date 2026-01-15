import Button from "@/components/button/button";


export default function LandingPage() {
  return (
      <main className="max-w-6xl mx-auto px-6 pt-20 pb-32 text-center">
        <span className="bg-mint-light text-pacific-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 inline-block">
          Closing the Clinical Gap
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Your health isn't <br /> 
          <span className="text-pacific-500">a 15-minute story.</span>
        </h1>
        <p className="text-xl text-pacific-700 dark:text-pacific-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Capture the interplay between diet, habits, medication, and symptoms. Give your doctor a 360° view of your month in seconds.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/register" title="Get Started Free" buttonType="getStartedHero"/>
          <Button href="/dashboard" title={`View "Alex" Demo Profile`} buttonType="alexDemoHero"/>
        </div>
      </main>
  );
}