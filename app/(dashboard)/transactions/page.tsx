"use client"
import React from 'react'
import History from '../_components/History';

function page() {
  return (
    <div className='border-b bg-card'>
        <div className="container flex items-center flex-wrap justify-between gap-6 py-8">
            <div className="">
                <p className="text-3xl font-bold">
                    Transaction history
                </p>
            </div>
        </div>
    </div>
  )
}

export default page
