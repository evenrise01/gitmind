import { FeatureCarousel } from "./ui/animated-feature-carousel";

export function HowGitMindWorks() {
  const images = {
    alt: "Feature screenshot",
    step1img1:
      "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=1740&auto=format&fit=crop",
    step1img2:
      "https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?q=80&w=1740&auto=format&fit=crop",
    step2img1:
      "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    step2img2:
      "https://images.unsplash.com/photo-1739036868260-c26b292cd85d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    step3img:
      "https://images.unsplash.com/photo-1617777934845-a818fd6e1bcb?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    step4img:
      "https://images.unsplash.com/photo-1537724326059-2ea20251b9c8?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };
  return (
    <div className="min-h-screen bg-gray-50 py-4 dark:bg-transparent">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-gray-100 sm:mb-8 sm:text-3xl md:text-4xl lg:text-5xl">
          How GitMind Works?
        </h1>
        <div className="w-full font-sans">
          <FeatureCarousel image={images} />
        </div>
      </div>
    </div>
  );
}
