import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "Budgettra", name:"Budgettra",
    retryFunction:async(attempt)=>({
        delay:Math.pow(2,attempt)*1000,
        maxAttempts:2
    })
 });
