"use client"

import React, { useMemo } from 'react'
import { UserSettings } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { DateToUTCDate, GetFormatterForCurrency } from '@/lib/helpers';
import SkeletonWrapper from '@/components/SkeletonWrapper';
import { TransactionType } from '@/lib/types';
import { GetCategoriesStatsResponseType } from '@/app/api/stats/categories/route';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

interface Props{
    userSettings:UserSettings;
    from:Date;
    to:Date;
}

function CategoriesStats({userSettings,from,to}:Props) {

  const statsQuery = useQuery<GetCategoriesStatsResponseType>({
    queryKey:["overview","stats","categories",from ,to ],
    queryFn: () => fetch(`/api/stats/categories?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`).then (res => res.json()),
  });

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency)
  },[userSettings.currency])

  return (
    <div className='flex w-full flex-wrap gap-2 md:flex-nowrap'>
      <SkeletonWrapper
        isLoading={statsQuery.isFetching}
      >
        <CategoriesCard
          formatter={formatter}
          type="income"
          data={statsQuery.data || []}
        />
      </SkeletonWrapper>
    </div>
  )
}

export default CategoriesStats


function CategoriesCard({data,type,formatter}:{
  type:TransactionType,
  formatter: Intl.NumberFormat,
  data: GetCategoriesStatsResponseType
}){
  const filteredData = data.filter(el => el.type === type);
  const total =  filteredData.reduce((acc,el) => acc + (el._sum?.amount || 0),0)
  return (
    <Card className='h-80 w-full col-span-6'>
      <CardHeader>
        <CardTitle className='grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col'>

        </CardTitle>
      </CardHeader>
      <div className="flex items-center justify-between gap-2">
        {filteredData.length === 0 && (
          <div className='flex h-60 w-full flex-col items-center justify-center'>
            No data for the selected period
            <p className='text-sm text-muted-foreground'>
              Try selecting a different period or try adding new{" "} {type === "income"? "incomes" : "expenses"}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
