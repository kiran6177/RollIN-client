export const getLineChartConfig = (input)=>{
    let data = JSON.parse(JSON.stringify(input))
    return {
        labels: data?.dates.reverse(),
        datasets: [
          {
            label: "Theatres",
            data: data?.theatres.reverse(),
            borderColor: "rgba(251,179,60,1)"
          },
          {
            label: "Users",
            data: data?.users.reverse(),
            borderColor: "#F55D3E"
          }
        ]
    }
}