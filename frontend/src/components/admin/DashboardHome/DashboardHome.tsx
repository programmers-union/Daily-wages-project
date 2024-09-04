import React from 'react'
import CardTotalCount from './CardTotalCount'
import Chart from './Chart'
import TopTenWorkerList from './TopTenWorkerList'
import LatestCommond from './LatestCommond'

const DashboardHome:React.FC = () => {
  return (
    <div className='p-4'>
     <CardTotalCount />
     <Chart />
     <div className='flex '>
     <TopTenWorkerList />
    <LatestCommond /> 
     </div>
    </div>
  )
}

export default DashboardHome
