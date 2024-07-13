"use client"

import { TransactionType } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import { Category } from '@prisma/client'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Command, CommandInput } from '@/components/ui/command'
import CreateCategoryDialogue from './CreateCategoryDialogue'

interface Props{
    type: TransactionType
}

function CategoryPicker({type}:Props) {

  const [open,SetOpen] = React.useState(false);
  const [value,SetValue] = React.useState("");


  const categoriesQuery = useQuery({
    queryKey:["categories",type],
    queryFn:() => fetch(`/api/categories?type=${type}`).then(res => res.json()),
  });

  const selectCategory = categoriesQuery.data?.find(
    (category: Category)=> category.name === value
  );

  return (
    <Popover 
      open={open}
      onOpenChange={SetOpen}
    >
      <PopoverTrigger
        asChild
      >
        <Button 
          variant={"outline"}
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {selectCategory ? <CategoryRow category={selectCategory}/> : "Select category"}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-[200px] p-0'
      >
        <Command onSubmit={e =>{
          e.preventDefault()
        }}>
          <CommandInput placeholder='Search category...'/>
          <CreateCategoryDialogue type={type}/>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CategoryPicker

function CategoryRow({category}:{category:Category}) {
  return (
    <div className="flex items-center gap-2">
      <span role='img'>
        {category.icon}
      </span>
      <span>
        {category.name}
      </span>
    </div>
  );
}
