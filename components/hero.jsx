import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-br from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Manage Your Finances <br className="hidden md:block" />
          with Intelligence
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto mt-5">
          An AI powered financial management platform that helps you track,
          analyze and optimize your spending with real time insights
        </p>

        <div>
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
        </div>

          <div className="max-w-5xl mx-auto px-4 mt-5">
          <Image
            src="/banner.jpg"
            alt="Dashboard Preview"
            width={1280}
            height={720}
            className="w-full h-auto rounded-lg shadow-2xl border"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
