const iterator=array=>{
let idx=0;
return {
    next:()=>{
        if(idx<array.length){
            return {
                value:array[idx++];
                done:false
            }
        }
        else{
            return {
                value:undefined,done:true
            }
        }
    }
}
}