# initialize environment for modeling and visualizing
import pickle
from sklearn.metrics import classification_report, confusion_matrix, plot_confusion_matrix, accuracy_score
from sklearn.ensemble import RandomForestClassifier

import warnings
warnings.filterwarnings("ignore")


# initialize an output filename for our model
modelfile = "static/models/redwine_model.sav"

# function to run our model with input data
def make_prediction(features):
	model = pickle.load(open(modelfile, 'rb'))
	result = model.predict(features)
	return str(result[0])