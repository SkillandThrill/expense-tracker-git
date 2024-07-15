"use server";

import prisma from "@/lib/prisma";
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schema/transaction ";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateTransaction(form:CreateTransactionSchemaType){
    const parsedBody = CreateTransactionSchema.safeParse(form)

    if(! parsedBody.success){
        throw new Error(parsedBody.error.message);
    }

    const user = await currentUser();

    if(!user){
        redirect("/sign-in")
    }

    const {amount,category,date, description,type} = parsedBody.data;

    const categoryRow = await prisma.category.findFirst({
        where:{
            userId: user.id,
            name: category
        },
    });

    if(!categoryRow){
        throw new Error ("Category not found");
    }

//Note don't make confusion between $transaction (prisma) and prisma.transaction (table)

await prisma.$transaction([
    // create user transaction
    prisma.transaction.create({
        data:{
            userId: user.id,
            amount,
            date,
            description: description || '',
            type,
            category: categoryRow.name,
            categoryIcon:categoryRow.icon,
        },
    }),

    //update aggregates table
    
])


}