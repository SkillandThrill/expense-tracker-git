"use client"

import React from 'react'
import { UserSettings } from '@prisma/client';

interface Props{
    userSettings:UserSettings;
    from:Date;
    to:Date;
}

function CategoriesStats({userSettings,from,to}:Props) {
  return (
    <div>
    
    </div>
  )
}

export default CategoriesStats
