import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/constant";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModelStore } from "@/hooks/show-pro-model";

interface FreeCounterProps {
  apiLimitCount : number
}


const FreeCounter : React.FC<FreeCounterProps> = ({
  apiLimitCount
}) => {

  const proModel = useProModelStore()

  const [mounted, setMounted] = useState(false)

  useEffect(()=>{
    setMounted(true)
  },[])

  if(!mounted){
    return null;
  }
  
  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS}  Free Geneartions
            </p>
            <Progress
              className="h-3"
              value={(apiLimitCount/MAX_FREE_COUNTS)*100}
            />
          </div>
          <Button onClick={()=>proModel.onOpen()} className="w-full" variant="premium">
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white"/>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default FreeCounter;