
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <main className="flex flex-col items-center gap-8 p-8">
        <h1 className="text-4xl font-bold text-foreground">Hello World</h1>
        <p className="text-lg text-muted-foreground">
          Welcome to my Next.js application
        </p>
        <div className="rounded-lg border bg-card p-8 shadow-sm">
          <p className="text-card-foreground">
            This is styled with Tailwind CSS and shadcn/ui colors
          </p>
        </div>
      </main>
    </div>
  );
}
