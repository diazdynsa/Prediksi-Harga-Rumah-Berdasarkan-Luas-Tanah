import os
import joblib
import pandas as pd
from flask import Flask, render_template, request

app = Flask(__name__)
app.secret_key = os.urandom(24)  # Needed for flashing messages

# Path to the serialized model (relative to this file)
MODEL_PATH = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'house_price_model.pkl')

# Initialize load_error variable
load_error = None

# Attempt to load the model at startup
if os.path.exists(MODEL_PATH):
    try:
        model = joblib.load(MODEL_PATH)
    except Exception as e:
        model = None
        load_error = f"Gagal memuat model: {e}"
else:
    model = None
    load_error = "File model 'house_price_model.pkl' tidak ditemukan di direktori aplikasi. Silakan tempatkan file model pada lokasi yang tepat."

# Model metadata (from training)
MODEL_EQUATION = "-41999.18603993731 + 279.55477931526383 × sqft_living"
METRICS = {
    "R2": 0.4941,
    "MAE": 177867.54,
    "RMSE": 276559.17,
}

# Reasonable range for sqft_living based on the original dataset (approx 300 – 15000)
SQFT_MIN = 300
SQFT_MAX = 15000

@app.route('/', methods=['GET', 'POST'])
def index():
    result = None
    error_msg = None
    input_sqft = None

    if request.method == 'POST':
        # Parse and validate input
        try:
            input_sqft = float(request.form.get('sqft_living', '').replace(',', ''))
        except ValueError:
            error_msg = 'Masukkan nilai numerik yang valid untuk luas bangunan (sqft).'
            input_sqft = None

        if error_msg is None:
            if input_sqft <= 0:
                error_msg = 'Luas bangunan harus lebih besar dari 0.'
            elif not (SQFT_MIN <= input_sqft <= SQFT_MAX):
                error_msg = f'Luas bangunan yang dimasukkan berada di luar rentang yang wajar ({SQFT_MIN} – {SQFT_MAX} sqft).'

        if error_msg is None:
            if model is None:
                error_msg = load_error
            else:
                # Prepare input DataFrame with correct column name
                df_input = pd.DataFrame({'sqft_living': [input_sqft]})
                try:
                    pred = model.predict(df_input)[0]
                    if pred < 0:
                        error_msg = 'Model tidak dapat memberikan estimasi harga yang masuk akal untuk nilai luas ini.'
                    else:
                        result = f"${pred:,.2f}"
                except Exception as e:
                    error_msg = f'Terjadi kesalahan saat melakukan prediksi: {e}'

    return render_template(
        'index.html',
        result=result,
        error_msg=error_msg,
        input_sqft=input_sqft,
        model_equation=MODEL_EQUATION,
        metrics=METRICS,
        sqft_min=SQFT_MIN,
        sqft_max=SQFT_MAX,
        load_error=load_error if model is None else None,
    )

if __name__ == '__main__':
    # Run locally in debug mode for development
    app.run(debug=True)

