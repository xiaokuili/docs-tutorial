"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">{error.message}</h2>
      <div className="flex gap-4">
        <Button
          onClick={() => window.location.href = '/'}
          variant="outline"
        >
          Back to Home
        </Button>
        <Button
          onClick={() => reset()}
          variant="outline"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
