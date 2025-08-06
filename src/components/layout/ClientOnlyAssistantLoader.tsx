"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load the VirtualAssistant to improve initial page load performance
// This is done in a dedicated client component to avoid build errors with `ssr: false` in Server Components.
const VirtualAssistant = dynamic(
  () => import('@/components/layout/VirtualAssistant').then(mod => mod.VirtualAssistant),
  { 
    ssr: false,
    loading: () => (
      <Skeleton className="fixed bottom-6 right-6 h-16 w-16 rounded-full" />
    )
  }
);

export function ClientOnlyAssistantLoader() {
  return <VirtualAssistant />;
}
