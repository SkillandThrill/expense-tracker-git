import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'
import prisma from '@/lib/prisma';

async function page() {
  const user = await currentUser();;
  if(!user){
      redirect("/sign-in");
  }

  const userSettings = await prisma.userSettings.findUnique({
    where:{
      userId: user.id,
    },
  });

  if(!userSettings){
    redirect("/wizard");
  }
  return (
    <div className="h-full bg-background ">
      <div className="border-b bg-card">
        <div className='container flex items-center flex-wrap justify-between gap-6 py-8'>
          <p className='text-3xl font-bold'>
            Hello, {user.firstName}! 👋
          </p>
        </div>
      </div>
    </div>
  )
}

export default page
