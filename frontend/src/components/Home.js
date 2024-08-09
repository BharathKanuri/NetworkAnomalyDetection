import React from 'react'
import './Home.css'
import NAD_Architecture from '../NAD_Architecture.png'
import Model_Prediction from '../Model_Prediction.png'
import {useNavigate} from 'react-router-dom'
import {GrFormNext} from "react-icons/gr"

function Home(){
  const navigate=useNavigate()
  return(
    <div className='row no-gutters vh-100'>
        <div className='col-4 no-gutters bg-primary'>
            <div className='left text-center d-flex flex-column'>
                <h1 className='head1 mt-5 mb-3'>Network Anomaly Detection</h1>
                <h3 className='head4'>Supporting Protocols</h3>
                <ul>
                    <li>TCP</li>
                    <li>UDP</li>
                    <li>ICMP</li>
                </ul>
                <h3 className='head4'>The Model</h3>
                <div className='paraDiv'>
                    <p>
                        Our network anomaly detection system employs a Random Forest Classifier, 
                        achieving an impressive accuracy of 99%. This robust model is trained on 
                        a comprehensive KDD Cup 99 Dataset consisting of 111,388 samples, ensuring a wide 
                        variety of network traffic patterns and anomalies are captured. The model 
                        has been rigorously tested with an additional 37,129 samples to validate its performance and reliability.
                    </p>
                    <p>
                        Utilizing Random Forest, an ensemble learning method, our model distinguishes 
                        between normal network behaviors and various types of attacks. It effectively 
                        identifies and classifies unusual patterns that may indicate potential security threats,
                        including Denial-of-Service (DoS) attacks, Probe attacks, 
                        Root-to-Local (R2L) attacks, and User-to-Root (U2R) attacks.
                    </p>
                    <p>
                        Continuous monitoring and real-time analysis ensure that any anomalies are 
                        promptly detected and reported, enabling proactive security measures to safeguard your network.
                    </p>
                </div>
            </div>
        </div>
        <div className='col no-gutters' style={{background:"#2f3131"}}>
            <div className='right text-center d-flex flex-column'>
                <h1 className='head2 mt-5'>ML Based Predictive System</h1>
                <h1 className='head3 mb-4' style={{color:'darkorange'}}>
                    - with 99% Accuracy&nbsp;&nbsp;&nbsp;&nbsp;<button className='btn btn-success fs-5 mx-4' onClick={()=>navigate('/network-anomaly-detector')}>Go<GrFormNext className='fs-4 mb-1'/></button>
                </h1>
                <div className='d-flex justify-content-around align-items-center mt-3'>
                    <img src={NAD_Architecture} alt='Image Not Found' className='rounded'></img>
                    <img src={Model_Prediction} alt='Image Not Found' className='rounded'></img>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home