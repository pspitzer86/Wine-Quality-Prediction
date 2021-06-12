#
#
#  Flask Dispatcher
# 
#  


# set environment
from flask import Flask, render_template, jsonify 
import os

from predict_model import make_prediction



# app config
app = Flask(__name__)


 # landing page
@app.route("/")
def home():
    return render_template("index.html")


# user inputs parameters to model here
@app.route("/predict/<fa>/<va>/<ca>/<rs>/<ch>/<fs>/<ts>/<de>/<ph>/<su>/<al>/")
def predict_quality(fa, va, ca, rs, ch, fs, ts, de, ph, su, al):
    feature_obj = [[fa, va, ca, rs, ch, fs, ts, de, ph, su, al]]
    prediction = make_prediction(feature_obj)
    return (jsonify(prediction))


##############
# begin main #
##############
if __name__ == "__main__":
    app.run(debug=True)