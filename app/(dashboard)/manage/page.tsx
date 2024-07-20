"use client"


import { CurrencyComboBox } from '@/components/CurrencyComboBox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Calendar } from '@/components/ui/calendar';
import { TransactionType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import SkeletonWrapper from '@/components/SkeletonWrapper';

function page() {
  return (
    <>
    {/* Header */}
        <div className="border-b bg-card">
            <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
                <div className="">
                    <p className='text-3xl font-bold'>Manage</p>
                    <p className="text-muted-foreground">Manage your account settings and categories</p>
                </div>
            </div>
        </div>
        {/* End header */}

        <div className="container flex flex-col gap-4 p-4">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Currency
                    </CardTitle>
                    <CardDescription>
                        Set your default currency for transactions
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <CurrencyComboBox/>
                </CardContent>
            </Card>

            <CategoryList type="income"/>
            <CategoryList type="expense"/>
        </div>
    </>
  )
}

export default page

function  CategoryList({type}:{type:TransactionType}){
    const categoriesQuery = useQuery({
        queryKey:["categories",type],
        queryFn: () => fetch(`api/categories?type=${type}`).then(res => res.json())
    });

    return (
        <SkeletonWrapper isLoading>

        </SkeletonWrapper>
    )
}