'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card'; 
import { useEffect, useState } from 'react';

const logos = [
  "CSS3.png",
    "JavaScript.png",
    "React.png",
    "Next.js.png",
    "Tailwind CSS.png",
    "shadcn-ui.png",
    "prisma.png",
    "PostgresSQL.png",
    "clerk.png",
    "arcjet.jpeg",
    "inngest.png",
    "react-hook-form.png",
    "zod.png",
    "gemini.png",
    "resend.png",
  
];

export default function LogoScroller() {
  // Doubling the logos to fake an infinite loop
  const [duplicatedLogos, setDuplicatedLogos] = useState([]);

  useEffect(() => {
    const repeatedLogos=logos.concat(logos); // duplicate the list
    setDuplicatedLogos(repeatedLogos);
  }, []);

  return (
    <div className="overflow-hidden w-full py-4">
      <div className="animate-scroll flex w-max gap-4">
        {duplicatedLogos.map((logo, index) => (
          <Card
            key={index}
            className="w-20 h-20 flex justify-center items-center shrink-0" //w-max= width:max-content, shrink-0= flex-shrink:0
          >
            <CardContent className="flex justify-center items-center p-2">
              <Image
                src={`/tech-icons/${logo}`}
                width={40}
                height={40}
                alt={`${logo} logo`}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
