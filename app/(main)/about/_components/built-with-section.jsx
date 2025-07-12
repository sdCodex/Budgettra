import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function BuiltWithSection() {
  return (
    <section className="mt-5 mb-6 space-y-5">
      <Card>
        <CardContent className="p-3 space-y-3">
          <h3 className="text-lg font-semibold">🌐 Frontend</h3>
          <ul className="list-disc list-inside text-md leading-relaxed  text-muted-foreground space-y-2">
            <li className="flex gap-2">
              <Badge variant="outline">HTML</Badge>
              <Badge variant="outline">CSS</Badge>
              <Badge variant="outline">JavaScript</Badge>
              <Badge variant="outline">React.js</Badge>
              <Badge variant="outline">Next.js (App Router)</Badge>
            </li>
            <li>
              <strong>Tailwind CSS</strong> for utility-first styling
            </li>
            <li>
              <strong>ShadCN UI</strong> for accessible, customizable components
            </li>
            <li>
              <strong>react-hook-form + Zod</strong> for robust, type-safe form
              handling
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3 space-y-3">
          <h3 className="text-lg font-semibold">🖥️ Backend</h3>
          <ul className="list-disc list-inside text-md leading-relaxed  text-muted-foreground space-y-2">
            <li>
              <strong>Next.js Server Actions</strong> for handling API logic and
              mutations
            </li>
            <li>
              <strong>PostgreSQL + Prisma</strong> for scalable, type-safe data
              handling
            </li>
            <li>
              <strong>Inngest</strong> for background jobs and scheduled tasks
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3 space-y-3">
          <h3 className="text-lg font-semibold">🤖 AI Integration</h3>
          <p className="text-md  text-muted-foreground space-y-2">
            Gemini AI for smart features and enhanced interactivity
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3 space-y-3">
          <h3 className="text-lg font-semibold">🛡️ Security & Protection</h3>
          <p className="text-md  text-muted-foreground space-y-2">
            Arcjet for advanced bot protection and rate-limiting
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3 space-y-3">
          <h3 className="text-lg font-semibold">✉️ Email & Authentication</h3>
          <ul className="list-disc list-inside text-md  text-muted-foreground space-y-2">
            <li>
              <strong>Resend</strong> for sending alerts
            </li>
            <li>
              <strong>Clerk</strong> for user authentication and session
              management
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
