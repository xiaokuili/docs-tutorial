import { Loader2Icon } from "lucide-react";

type FullScreenLoadingProps = {
    message?: string;
}

export default function FullScreenLoader({ message }: FullScreenLoadingProps) {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="animate-spin ">
                <Loader2Icon className="h-6 w-6 text-gray-500" />
            </div>
            <span className="mt-2 text-sm text-gray-400">{message}</span>
        </div>
    )
}
