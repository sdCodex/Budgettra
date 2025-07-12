import { Card, CardContent } from "@/components/ui/card";

import LogoScroller from "./_components/infinite-scroll-cards";
import BuiltWithSection from "./_components/built-with-section";

export default function About() {
  return (
    <>
      <div className="container">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-br from-blue-600 to-purple-600 text-transparent bg-clip-text">
          About
        </h1>

        <Card className="mt-5">
          <CardContent>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight bg-gradient-to-br from-green-400 to-purple-700 text-transparent bg-clip-text">
              Budgettra
            </h1>
            <p className="text-md mt-3 text-gray-700">
              Budgettra is your intelligent, easy-to-use expense tracker
              designed to help you take control of your finances with clarity
              and confidence. Start by signing up or logging in — from there,
              you can create multiple accounts and add transactions as you go.
              Whether you prefer entering them manually or scanning receipts
              with our AI-powered scanner, tracking your spending has never been
              simpler. Set a monthly budget and let Budgettra keep an eye on
              things for you. If you cross 85% of your budget, we’ll send you a
              friendly email alert so you can adjust before it’s too late. Have
              recurring expenses like rent or subscriptions? Just set them once,
              and we’ll update them automatically at the scheduled time. Your
              data is presented visually to make sense at a glance — the
              dashboard includes a detailed pie chart of your monthly expenses
              by category, along with your five most recent transactions. You
              can also filter transactions by date range to see how your
              spending changes over time. And at the end of each month,
              Budgettra sends you a smart, AI-generated summary straight to your
              inbox — so you’re always informed and one step ahead in your
              financial journey.
            </p>
          </CardContent>
        </Card>

        <Card className="mt-[60px]">
          <CardContent>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight bg-gradient-to-br from-gray-300 to-black text-transparent bg-clip-text">
              Built With
            </h1>
            <p className="text-md mt-3 text-gray-700">
              Budgettra is a solo-built project crafted to explore real-time
              features, AI integrations, and secure full-stack development using
              modern web technologies.
            </p>

            <BuiltWithSection/>

            <LogoScroller />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
