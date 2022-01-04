import selectn from "selectn";

export default function obtener_catalogo(store,llave,dato){
    if(!!selectn(llave+"."+dato,store)){
        return selectn(llave+"."+dato,store)
    }else{
        return llave
    }
    
  }