import { create } from "zustand";


interface useProModelStoreProps {
  isOpen : boolean,
  onOpen : ()=>void
  onClose : ()=>void
}

export const useProModelStore = create<useProModelStoreProps>((set)=>(
  {
    isOpen : false,
    onOpen : ()=>set(({isOpen : true})),
    onClose : ()=>set(({isOpen : false}))
  }
))