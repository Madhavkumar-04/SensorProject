import React from 'react';
import './App.css'
import InternetSensor from './components/InternetSensor';
import MotionSensor from './components/MotionSensor';
import LatencySensor from './components/LatencySensor';
import BatterySensor from './components/BatterySensor';
const App = () => {
  return (
    <div>
      <h1 style={{textAlign:'center'}}>DASHBOARD</h1>
    <div className="dashboard" >

      {/* <div className="graph-container"> */}
        <InternetSensor/>
      {/* </div> */}
      {/* <div className="graph-container"> */}
        <MotionSensor />
      {/* </div> */}
      {/* // <div className="graph-container"> */}
        <LatencySensor />
      {/* </div> */}
      {/* <div > */}
        <BatterySensor/>
      {/* </div> */}
    </div>
    </div>
  );
};

export default App;
