"use client";

import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { ClerkProvider, useAuth, SignIn } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import FullscreenLoader from "./fullscreen-loader";
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <Authenticated>
                    {children}
                </Authenticated>
                <Unauthenticated>
                    <div className='h-screen flex items-center justify-center'>
                        <SignIn />
                    </div>
                </Unauthenticated>
                <AuthLoading>
                    <FullscreenLoader label="Authenticating..." />
                </AuthLoading>
            </ConvexProviderWithClerk>

        </ClerkProvider>
    );
}