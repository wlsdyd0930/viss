/* eslint-disable*/
import './App.css';
import React, { useEffect, useState } from 'react'
import SecureWebSockets from './components/SecureWebSockets';
import HTTPS from './components/HTTPS';
import DropDown from './components/DropDown'
import Label from './components/Label'

// TODO
// DISCOVERY_READ => dynamic

function App() {

  let [mode, modeChange] = useState("")
  let [path, setPath] = useState("")
  //let [protocol, setProtocol] = useState([{value:'https'}, {value:'secure_websocket'}])
  let [protocol, setProtocol] = useState(
    [
      'Select', 
      'HTTPS', 
      'Secure WebSocket'
    ]
  )

  let [config, setConfig] = useState(
    {
      'VISS_PROTOCOL': process.env.REACT_APP_VISS_PROTOCOL,
      'VISS_PROTOCOL_WS': process.env.REACT_APP_VISS_PROTOCOL_WS,
      'VISS_HOST': process.env.REACT_APP_VISS_HOST,
      'VISS_HOST_SECURE_WS': process.env.REACT_APP_VISS_HOST_SECURE_WS,
      'VISS_HOST_UNSECURE_WS': process.env.REACT_APP_VISS_HOST_UNSECURE_WS
    }
  )

  useEffect(async () => {
    console.log(path)
    
    return () => {};
  }, [path]);

  const handleChange = (e) => {
    console.log(e.target.value)
    if (e.target.value === 'Select') {
      console.log(config)
      modeChange("")
    }
    if (e.target.value === 'HTTPS'){
      modeChange("restapi")
    } else if (e.target.value === 'Secure WebSocket') {
      modeChange("websocket")
    }
  }

  return (
    <div className="App">
      <hr></hr>
      <div className="btns">
        <Label label="Transport Protocols"/>
        <DropDown label="" options={protocol} onChange={handleChange} />
      </div>
      <hr></hr>
      {
        mode === "" ? <div>Select the way you request</div> : null
      }
      { 
        mode === "restapi" ? <HTTPS config={config}></HTTPS> : null
      }
      {
        mode === "websocket" ? <SecureWebSockets config={config}></SecureWebSockets> : null
      }
    </div>
  )
}

export default App;