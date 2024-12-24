"use client"
import { AlertTriangleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <AlertTriangleIcon className="w-10 h-10 text-rose-600" />
                </div>
                <div className="space-y-2">
                    <h2>Something went wrong </h2>
                    <p>{error.message}</p>
                </div>
            </div>
            <div className="flex items-center gap-x-3">
                <Button onClick={reset} className="font-medium px-6">
                    Try again
                </Button>
                <Button variant="ghost" className="font-medium">
                    <Link href="/">
                        Go Back
                    </Link>
                </Button>
            </div>
        </div>

    )
}