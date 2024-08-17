
import React from 'react';
import Dashboard from './Dashboard';
import PieActiveArc from './Cpc';
import EmployeeTable from './Directory';




const QuickLinks = () => {
  return (

<main className="flex-grow p-6">
  <section style={{ paddingLeft: '240px', paddingRight: '0px' }}>
    <section>
      <div className="h-8"></div>
      <div className="h-8"></div>
    </section>
    
    
      <Dashboard/>
      
      {/* Grid Layout: 2x2 on the left, Pie Chart on the right */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Side: 2x2 Matrix */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <a className="text-lg font-semibold" href="/directory" >Total Employees</a>
            <p className="text-2xl">200</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <a className="text-lg font-semibold" href="/" >Today's Attendance</a>
            <p className="text-2xl">15</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <a className="text-lg font-semibold" href="/" >On Leave</a>
            <p className="text-2xl">8</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <a className="text-lg font-semibold" href="/" >Payroll</a>
            <p className="text-2xl">8</p>
          </div>
        </div>

       
        
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-lg font-semibold mb-4">Employee Distribution</h2>
            <PieActiveArc/> 
          </div>
        </div>

        


   
        
    </div>
    <EmployeeTable/>
  </section>
  
</main>





    
    
  );
};

export default QuickLinks;
