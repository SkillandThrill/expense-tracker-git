"use client"

import React from 'react'
import { Period, Timeframe } from '@/lib/types'
import { useQuery } from '@tanstack/react-query';


interface Props{
    period:Period,
    setPeriod:(period:Period) => void;
    timeframe:Timeframe;
    setTimeframe :(timeframe:Timeframe) =>void
}

function HistoryPeriodSelector({
    period,setPeriod, timeframe, setTimeframe}:Props) {
    
    const historyPeriods =useQuery({
        queryKey:["overview","history","periods"],
        queryFn:() => fetch(`/api/history-periods`).then(res =>res.json()),
    });

  return (
    <div>
      
    </div>
  )
}

export default HistoryPeriodSelector
