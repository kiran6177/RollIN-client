export const getBarChartConfig = (ScreenData)=>{
    let screenBasedObj = new Map();
    let labels = [];
    for(let [date,screenData] of ScreenData){
        labels.push(date)
        for(let {screenId,screen,totalAmount} of screenData){
            if(screenBasedObj.has(screenId)){
                screenBasedObj.set(screenId,{screen:screenBasedObj.get(screenId)?.screen || screen,amount:[...screenBasedObj.get(screenId)?.amount,totalAmount]})
            }else{
                screenBasedObj.set(screenId,{screen,amount:[totalAmount]})
            }
        }
    }
    const datasets = Array.from(screenBasedObj).map((eachScreen,i)=>{
        return {
            label: eachScreen[1]?.screen,
            data: eachScreen[1]?.amount?.reverse(),
            backgroundColor: [
            `rgba(${Math.abs(246 - (i * 20))},${Math.abs(255 - (i * 50))},45,1)`,
            ],
            borderWidth: 1,
            stack:'stack 0'
        }
    })
    
    return {
        labels:labels?.reverse(),
        datasets
    }
}

export const getDoughNutConfig = (movieData)=>{
  let labels = []
  let data = []
  let backgroundColor = []
  
  let i = 0;
  for(let [movie,amount] of movieData){
    labels.push(movie)
    data.push(amount)
    backgroundColor.push(`rgba(${Math.abs(246 - (i * 10))},${Math.abs(135 + (i * 20))},45,1)`)
    i++
  }
  let datasets = [{
    label: "Collection",
      data,
      backgroundColor,
      borderWidth:0
  }]
  
  return {
    labels,
    datasets
  }
}