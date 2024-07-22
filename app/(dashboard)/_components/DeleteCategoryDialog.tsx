"use client"
import { Category } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import React, { ReactNode } from 'react'
import { DeleteCategory } from '../_actions/categories';
import { toast } from 'sonner';


interface Props{
    trigger:ReactNode;
    category:Category;

}

function DeleteCategoryDialog({category,trigger}:Props) {

    const categoryIdentifier = `${category.name}-${category.type}`
    

    const deleteMutation = useMutation({
        mutationFn: DeleteCategory,
        onSuccess: () =>{
            toast.success("Category deleted successfully",{
                id:categoryIdentifier,

            })

        }
    })

  return (
    <div>
      
    </div>
  )
}

export default DeleteCategoryDialog
