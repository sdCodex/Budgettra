"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";




const serializeTransaction=(obj)=>{
    const serialized={...obj};

    if(obj.balance){
        serialized.balance=obj.balance.toNumber();
    }

    if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }
  return serialized;
}

export async function createAccount(data)
{
    try {
        const {userId}=await auth();
        if(!userId) throw new Error("Unauthorized");

        const user= await db.user.findUnique({
            where:{
                clerkUserId:userId
            },
        });

        if(!user) throw new Error("User not found");

        //Converting  Balance to float before saving
        const balanceFloat=parseFloat(data.balance);
        if(isNaN(balanceFloat))
        {
            throw new Error("Invalid Balance Amount");
        }


        //Check if this user's first account
        const existingAccounts=await db.account.findMany({
            where:{
                userId:user.id
            },
        });

        const shouldBeDefault=existingAccounts.length===0?true:data.isDefault;

        if(shouldBeDefault)
        {
            await db.account.updateMany({
                where:{userId:user.id, isDefault:true},
                data:{
                    isDefault:false
                },
            });
        }

        const account=await db.account.create({
            data:{
                ...data,
                balance:balanceFloat,
                userId:user.id,
                isDefault:shouldBeDefault
            }
        });


        const serializedAccount=serializeTransaction(account);
        revalidatePath("/dashboard");

        return {success:true, data:serializedAccount}

    } catch (e) {
        throw new Error(e.message);
    }
}




export async function getUserAccounts() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  try {
    const accounts = await db.account.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });

    

    // Serialize accounts before sending to client
    const serializedAccounts =accounts.map((account)=>serializeTransaction(account));
    return serializedAccounts;

  } catch (error) {
    console.error(error.message);
  }
}



export async function getDashboardData() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Get all user transactions
  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return transactions.map((transaction)=>serializeTransaction(transaction));
}