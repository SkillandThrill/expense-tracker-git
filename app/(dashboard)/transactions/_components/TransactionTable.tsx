"use client";

import { DateToUTCDate } from '@/lib/helpers';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

interface Props{
    from:Date;
    to:Date;
}

function TransactionTable({from,to}:Props) {

    const history = useQuery({
        queryKey: ["transactions","history",from,to],
        queryFn: () => fetch(`/api/transactions-history?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`).then(res => res.json())
    })
  return (
    <div>
      
    </div>
  )
}

export default TransactionTable
