export default (files)=>{
    let validitycount = 0;
     files.forEach(img=>{
        if(!img.type.includes('image/')){
            validitycount++;
        }
    })
    if(files.length === 0){
        return false
    }
    if(validitycount === 0){
        return true
    }
    return false 
}