"use client";

import { DateToUTCDate } from '@/lib/helpers';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import {ColumnDef, flexRender,getCoreRowModel,SortingState,useReactTable} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { GetTransactionHistoryResponseType } from '@/app/api/transactions-history/route';
import SkeletonWrapper from '@/components/SkeletonWrapper';
import { DataTableColumnHeader } from '@/components/datatable/ColumnHeader';

interface Props{
    from:Date;
    to:Date;
}

const emptyData :any[] =[];

type TransactionHistoryRow = GetTransactionHistoryResponseType[0]



export const columns:ColumnDef<TransactionHistoryRow>[] =[
    {
        accessorKey: "category",
        header:({column}) =>(
            <DataTableColumnHeader column={column} title='Category'/>
        ),
        cell:({row})=> (
            <div className='flex gap-2 capitalize'>
                {row.original.categoryIcon}
                <div className="capitalize">
                    {row.original.category}
                </div>
            </div>
        ),
    },

];  

function TransactionTable({from,to}:Props) {

    const [sorting,setSorting] = useState<SortingState>([])

    const history = useQuery<GetTransactionHistoryResponseType>({
        queryKey: ["transactions","history",from,to],
        queryFn: () => fetch(`/api/transactions-history?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`).then(res => res.json())
    })

    const table = useReactTable({
        data:history.data || emptyData,
        columns,
        getCoreRowModel:getCoreRowModel(),
        state:{
            sorting,
        }
    })
  return (
    <div className="w-full">
        <div className="flex flex-wrap items-end justify-between gap-2 py-4">
            TODO: Filters
        </div>
        <SkeletonWrapper isLoading={history.isFetching}>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) =>(
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) =>{
                                return(
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )
                                        }
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) =>(
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell)=>(
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell,cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className='h-24 text-center'>
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </SkeletonWrapper>
    </div>
  )
}

export default TransactionTable
