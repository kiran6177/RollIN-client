import React from 'react'
import { Line } from 'react-chartjs-2';

const options = {
    plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding:20
          }
        }
    },
    responsive: true,
    maintainAspectRatio: false,
}
  
  function LineChart({data}) {

    return (
      <div className='w-[90%] overflow-scroll mx-auto my-8'>
        <div className='aspect-video sm:overflow-hidden overflow-scroll min-h-[570px] '>
            <Line data={data} options={options} />
        </div>
      </div>  
      
    )
  }
  
  export default LineChart
  