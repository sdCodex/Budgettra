import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <div className="min-h-screen flex items-start justify-center pt-24"><SignIn /></div>
}