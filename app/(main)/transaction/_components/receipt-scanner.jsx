"use client";

import { scanReceipt } from "@/actions/transaction";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { Camera, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const ReceiptScanner = ({onScanComplete}) => {
    const inputFileRef=useRef();
    const {
        loading:scanReceiptLoading,
        fn:scanReceiptFn,
        data:scanReceiptData
    }=useFetch(scanReceipt);

    const handleReceiptScan= async(file)=>{
        if(file.size>5*1024*1024){
            toast.error("File size should be less than 5MB");
            return;
        }

        await scanReceiptFn(file);
    }


    useEffect(()=>{
        if(scanReceiptData && !scanReceiptLoading)
        {
            onScanComplete(scanReceiptData);
            toast.success("Receipt scanned successfully");
        }
    },[scanReceiptData,scanReceiptLoading]);

    

  return (
    <div>
        <input type="file" ref={inputFileRef} className="hidden" accept="image/*" capture="environment" onChange={(e)=>{
            const file=e.target.files?.[0];
            if(file) handleReceiptScan(file);
        }}/>


        <Button type="button" variant="outline" className="w-full h-10 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 hover:opacity-90 transition-opacity text-white hover:text-white" onClick={()=>inputFileRef.current?.click()} disabled={scanReceiptLoading}>{scanReceiptLoading?<>
        <Loader2 className="mr-2 animate-spin"/>
        <span>Scanning Receipt....</span>
        </>:<>
        <Camera className="mr-2"/>
        <span>Scan Receipt with AI</span>
        </>}</Button>
    </div>
  )
}

export default ReceiptScanner