import pickle
import pandas as pd
from flask_cors import CORS # CORS for handling Cross-Origin Resource Sharing
from flask import Flask,request,jsonify
from dotenv import load_dotenv
import os

# Load Environment Variables from .env File
load_dotenv()

# Create a Flask Application Instance
app=Flask(__name__)

# Enable CORS for all Routes, Allowing Requests from any Origin
CORS(app,resources={r"/*":{"origins":"*"}})

# Load Saved Model and Scaler Object
classifier=pickle.load(open('Trained_Model.pkl','rb'))
scaler=pickle.load(open('Scaler.sav','rb'))

# Input Features
features=['srcbytes','dstbytes','lastflag','count','diffsrvrate','samesrvrate']

# Mapper for Prediction Result
prediction_mapper={0:'Denial of Service (DoS)',1:'Normal',2:'Probe',3:'Remote to Local (R2L)',4:'User to Root (U2R)'}

# Define Feature Names and their Expected Data Types
feature_names={
    'srcbytes': int,
    'dstbytes': int,
    'lastflag': int,
    'count': int,
    'diffsrvrate':float,
    'samesrvrate': float
}

# Define a Route for Making Predictions
@app.route('/network-anomali-detector/detect',methods=['POST'])
def detect_anomaly():
    try:
        data=request.get_json()
        for feature,dtype in feature_names.items():
            data[feature]=dtype(data[feature])
        df=pd.DataFrame([data],columns=features)
        df=scaler.transform(df)
        prediction=classifier.predict(df)
        attack='NORMAL BEHAVIOUR'
        type=''
        variant='info'
        if prediction[0]!=1:
            attack='ANOMALY DETECTED'
            type=prediction_mapper[prediction[0]]
            variant='warning'
        return jsonify({'Prediction':attack,'Type':type,'Variant':variant})
    except Exception as e:
        return jsonify({'Message':str(e)})

if __name__=='__main__':
    # Use Environment Variables for Configurations
    debug_mode=os.getenv('FLASK_ENV','development')=='development'
    port=int(os.getenv('FLASK_RUN_PORT',5000))
    app.run(debug=debug_mode,port=port)