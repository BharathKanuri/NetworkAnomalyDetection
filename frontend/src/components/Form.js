import './Form.css'
import Alert from 'react-bootstrap/Alert'
import {useState} from "react"

const Form=()=>{
  document.body.style.background='#2f3131'
  const [isLoading,setIsLoading]=useState(false)
  const [formData,setFormData]=useState({})
  const [showDiv,setShowDiv]=useState(false)
  const [prediction,setPrediction]=useState("")
  const [type,setType]=useState("")
  const [variant,setVariant]=useState("")
  const handleChange=(event)=>{
    const {name,value}=event.target
    setFormData((prevFormData)=>({
      ...prevFormData,
      [name]:value
    }))
  }
  const handleDetectClick=()=>{
    const url="http://localhost:5000/network-anomali-detector/detect"
    setIsLoading(true)
    const jsonData=JSON.stringify(formData)
    // Fetch Request to the Flask Backend
    fetch(url,{
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      method:"POST",
      body:jsonData
    })
    .then((response)=>response.json())
    .then((response)=>{
      setPrediction(response.Prediction)
      setType(response.Type)
      setVariant(response.Variant)
      setIsLoading(false)
      setShowDiv(true)
    })
    .catch((error)=>{
      console.error("Error : ",error.Message)
      setIsLoading(false)
    })
  }

  return(
    <div className="container text-center mt-4">
      <h1 className="text-center">Network Anomaly Detector</h1>
      <div className="container">
        <form method="post" acceptCharset="utf-8" name="Modelform" className='d-inline-block text-start'>
          <div className="form-group mt-4">
            <label><b>No. of data bytes transferred from the source to the destination in a single connection</b></label>
            <br/>
            <input
              type="number"
              className="form-control"
              id="srcbytes"
              name="srcbytes"
              value={formData.srcbytes}
              onChange={handleChange}
              placeholder="src_bytes"
            />
          </div>
          <div className="form-group mt-3">
            <label><b>No. of data bytes transferred from the destination to the source in a single connection</b></label>
            <br/>
            <input
              type="number"
              className="form-control"
              id="dstbytes"
              name="dstbytes"
              value={formData.dstbytes}
              onChange={handleChange}
              placeholder="dst_bytes"
            />
          </div>
          <div className="form-group mt-3">
            <label><b>Status or flag related to the last packet in the network connection</b></label>
            <br/>
            <input
              type="number"
              className="form-control"
              id="lastflag"
              name="lastflag"
              value={formData.lastflag}
              onChange={handleChange}
              placeholder="last_flag"
            />
          </div>
          <div className="form-group mt-3">
            <label><b>No. of connections to the same destination host as the current connection in the past two seconds</b></label>
            <br/>
            <input
              type="number"
              className="form-control"
              id="count"
              name="count"
              value={formData.count}
              onChange={handleChange}
              placeholder="count"
            />
          </div>
          <div className="form-group mt-3">
            <label><b>Percentage of connections to different services among the connections aggregated in the count</b></label>
            <br/>
            <input
              type="number"
              step="any"
              className="form-control"
              id="diffsrvrate"
              name="diffsrvrate"
              value={formData.diffsrvrate}
              onChange={handleChange}
              placeholder="diff_srv_rate"
            />
          </div>
          <div className="form-group mt-3">
            <label><b>Percentage of connections to the same service among the connections aggregated in the count</b></label>
            <br/>
            <input
              type="number"
              step="any"
              className="form-control"
              id="samesrvrate"
              name="samesrvrate"
              value={formData.samesrvrate}
              onChange={handleChange}
              placeholder="same_srv_rate"
            />
          </div>
          <div className="form-group mt-3">
            <button
              className="btn btn-primary form-control"
              disabled={isLoading}
              onClick={!isLoading?handleDetectClick:null}
            >
              {isLoading?"Loading...":"Detect Anomaly"}
            </button>
          </div>
          <div className="form-group text-center mt-4">
            {showDiv && (
              <div id='prediction'>
                {prediction ? (
                  <Alert variant='variant' className={`btn btn-${variant} form-control fw-bold`}>
                    <div>Prediction : {prediction}</div>
                    {type.length>0 && <div>Type : {type} Attack</div>}
                  </Alert>
                ) : (
                  <Alert variant="danger" className='form-control fw-bold'>
                    Please fill each field in the Form
                  </Alert>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form