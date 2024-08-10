import { plugins } from 'chart.js'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'

function DoughNutMovie({data}) {
    const options = {
      plugins:{
        legend: {
          display: true,
          position: "bottom",
          align: "center",
          labels: {
            usePointStyle: true,
            padding:20
          }
        }
      },
      maintainAspectRatio: false,
    }
  return (
    <div className='p-4 aspect-[2/3] flex justify-center items-center overflow-x-scroll'>
        <Doughnut options={options} data={data} />
    </div>
  )
}

export default DoughNutMovie
