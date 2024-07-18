"use client"

import React from 'react'
import { Period, Timeframe } from '@/lib/types'


interface Props{
    period:Period,
    setPeriod:(period:Period) => void;
    timeframe:Timeframe;
    setTimeframe :(timeframe:Timeframe) =>void
}

function HistoryPeriodSelector({
    period,setPeriod, timeframe, setTimeframe}:Props) {
  return (
    <div>
      
    </div>
  )
}

export default HistoryPeriodSelector
