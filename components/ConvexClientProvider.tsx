"use client";
import { ClerkProvider, SignIn, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {  ConvexReactClient } from "convex/react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import FullScreenLoading from "./fullscreen-loading";




export  function ConvexClientProvider({ children }: { children: React.ReactNode }) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                <Unauthenticated>
                    <div className="flex justify-center items-center h-screen">
                        <SignIn />
                    </div>
                </Unauthenticated>
                <AuthLoading>
                    <FullScreenLoading message="Authenticating..." />
                </AuthLoading>
                <Authenticated>
                    {children}
                </Authenticated>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}
