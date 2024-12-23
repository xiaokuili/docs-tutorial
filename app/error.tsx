"use client"
import { AlertTriangleIcon } from "lucide-react"

export default function Error() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <AlertTriangleIcon className="w-10 h-10 text-rose-600" />
                </div>
            </div>
        </div>
    )
}