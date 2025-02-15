import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# Load dataset
df = pd.read_csv("sql_injection_dataset.csv")

# Pisahkan fitur dan label
X = df["input"]
y = df["label"]

# Ubah teks menjadi vektor angka
vectorizer = TfidfVectorizer()
X_vectorized = vectorizer.fit_transform(X)

# Bagi data menjadi training dan testing (80%-20%)
X_train, X_test, y_train, y_test = train_test_split(X_vectorized, y, test_size=0.2, random_state=42)

# Buat model Random Forest untuk klasifikasi
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Simpan model dan vectorizer
joblib.dump(model, "ai_model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

print("Model berhasil dilatih dan disimpan sebagai ai_model.pkl")
