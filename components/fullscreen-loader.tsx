import { Loader2 } from "lucide-react";

interface FullscreenLoaderProps {
    label?: string;
}

const FullscreenLoader = ({ label }: FullscreenLoaderProps) => {
    return <div className="min-h-screen  flex flex-col gap-2 items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
        {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>;
}

export default FullscreenLoader;