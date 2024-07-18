"use client"

import React from 'react'
import { Period, Timeframe } from '@/lib/types'
import { useQuery } from '@tanstack/react-query';
import SkeletonWrapper from '@/components/SkeletonWrapper';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GetHistoryPeriodsResponseType } from '@/app/api/history-periods/route';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


interface Props{
    period:Period,
    setPeriod:(period:Period) => void;
    timeframe:Timeframe;
    setTimeframe :(timeframe:Timeframe) =>void
}

function HistoryPeriodSelector({
    period,setPeriod, timeframe, setTimeframe}:Props) {
    
    const historyPeriods =useQuery<GetHistoryPeriodsResponseType>({
        queryKey:["overview","history","periods"],
        queryFn:() => fetch(`/api/history-periods`).then(res =>res.json()),
    });

  return (
    <div className='flex flex-wrap items-center gap-4'>
      <SkeletonWrapper
        isLoading={historyPeriods.isFetching}
        fullWidth={false}
      >
        <Tabs 
          value={timeframe}
          onValueChange={(value) =>setTimeframe(value as Timeframe)}
        >
          <TabsList>
            <TabsTrigger value="Year">Year</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </SkeletonWrapper>

      <div className="flex flex-wrap items-center gap-2">
        <SkeletonWrapper
          isLoading={historyPeriods.isFetching}
        >
          <YearSelector period={period} setPeriod={setPeriod} years={historyPeriods.data || []}/>
        </SkeletonWrapper>
      </div>
    </div>
  )
}

export default HistoryPeriodSelector


function YearSelector({period, setPeriod, years}:{
  period:Period,
  setPeriod:(period:Period) =>void;
  years: GetHistoryPeriodsResponseType;
}){
  return(
    <Select value={period.year.toString()} onValueChange={value =>{
      setPeriod({
        month:period.month,
        year:parseInt(value),
      })
  }}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue/>
      </SelectTrigger>
      <SelectContent>
        {years.map(year=>(
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}