import { getUserAccounts } from "@/actions/dashboard";
import AddTransactionForm from "../_components/AddTransactionForm";
import { defaultCategories } from "@/data/categories";
import { getTransaction } from "@/actions/transaction";

export default async function AddTransaction({ searchParams }) {
  const accounts = await getUserAccounts();
  const editId = searchParams?.edit;
  
  let initialData = null;
 
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }
  return (
    <>
      <div className="max-w-3xl mx-auto px-5">
        <h1 className="text-5xl mb-5 font-bold tracking-tight leading-tight bg-gradient-to-br from-blue-600 to-purple-600 text-transparent bg-clip-text">
          {
            editId?"Update Transaction":"Add Transaction"
          }
        </h1>

        <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
      </div>
    </>
  );
}
