"use client";


import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/actions/auth.action'
import { toast } from 'sonner'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const handleSignOut = async () => {
    try {
      const result = await signOut();
      if (result.success) {
        toast.success("Signed out successfully");
        window.location.href = '/sign-in';
      } else {
        toast.error("Failed to sign out");
      }
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <div className="root-layout">
      <nav>
        <Link href="/" className ="flex item-center gap-2">
          <Image src="/logo.svg" alt="logo" width={38} height={32} />
        </Link>
        <h2 className="text-primary-100">PrepWise</h2>
        <Button 
          onClick={handleSignOut}
          variant="outline"
          className="ml-auto"
        >
          Sign Out
        </Button>
      </nav>
      {children}
      
    </div>
  )
}

export default RootLayout
