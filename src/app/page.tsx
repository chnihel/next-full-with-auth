'use client';

import { useEffect } from 'react'; import UserDashboard from './components/Dashboard';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';





const Home = () => {
  const { data: session, status } = useSession();
  
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login'); 
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>; // 
  }


  return ( <>
    <UserDashboard session={session} />
  </>  
)}
export default Home ;
