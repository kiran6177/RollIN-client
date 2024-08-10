import React, { useMemo } from 'react'
import { Bar ,Chart} from 'react-chartjs-2'

function BarStacked({data}) {
    const options = useMemo(()=>{
        return {
            offsetGridLines: true,
            drawTicks: true,
            layout: {
              padding: {
                top: 30,
                right: 40,
                bottom: 0
              }
            },
            plugins: {
              legend: {
                display: true,
                position: "bottom",
                align: "center",
                labels: {
                  usePointStyle: true,
                  padding:50
                }
              }
            },
            responsive: true,
            maintainAspectRatio: false,
          }
    },[])
    
  return (
    <div className='aspect-[4/3] sm:aspect-video sm:flex justify-center items-center sm:overflow-hidden overflow-x-scroll min-h-[570px] '>
        <Bar
        data={data}
        options={options}
      />
    </div>
  )
}

export default BarStacked
