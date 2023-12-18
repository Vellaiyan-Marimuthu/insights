from flask import Flask, request
import requests
import openai
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

apiKey = "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"

# backup api
# apiKey = "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"


# Sentimental analysis
@app.route("/brand/sentimentAnalysis", methods=["POST"])
async def brand():
    req = request.get_json()
    brandName = req["brand"]
    question = requests.get(
        f"https://raw.githubusercontent.com/Vellaiyan-Marimuthu/productInsights/Main/{brandName}.txt"
    )
    try:
        if question.status_code == 200:
            result = await getSentiment(question)
            response = {
                "data": result,
                "status": 200,
            }
            return response

    except:
        brand()


# Branch Description
@app.route("/brand/description", methods=["POST"])
async def description():
    req = request.get_json()
    brandName = req["brand"]
    question = f"give a short description about {brandName}"
    openai.api_key = apiKey
    result = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=[{"role": "user", "content": question}]
    )
    return result.choices[0].message.content


# Environmental analysis
@app.route("/brand/environment", methods=["POST"])
async def environment():
    req = request.get_json()
    brandName = req["brand"]
    question = requests.get(
        f"https://raw.githubusercontent.com/Vellaiyan-Marimuthu/productInsights/Main/culture/{brandName}.txt"
    )
    try:
        if question.status_code == 200:
            result = await getEnvironment(question)
            response = {"data": result, "status": 200}
            return response
    except:
        environment()


# Recommendation to the company
@app.route("/brand/recommendation", methods=["POST"])
async def recommendation():
    req = request.get_json()
    brandName = req["brand"]
    question = requests.get(
        f"https://raw.githubusercontent.com/Vellaiyan-Marimuthu/productInsights/Main/feedback/{brandName}.txt"
    )
    try:
        if question.status_code == 200:
            response = await getRecommendation(question)
            return response
    except:
        recommendation()


# positive, negative and neutral analysis
@app.route("/brand/pros", methods=["POST"])
async def getPros():
    req = request.get_json()
    brandName = req["brand"]
    question = requests.get(
        f"https://github.com/Vellaiyan-Marimuthu/productInsights/blob/Main/propscons/{brandName}.txt"
    )
    result = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=[{"role": "user", "content": question.text}]
    )
    return result.choices[0].message.content


async def getSentiment(question):
    openai.api_key = apiKey
    result = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=[{"role": "user", "content": question.text}]
    )
    return result.choices[0].message.content


async def getEnvironment(question):
    openai.api_key = apiKey
    result = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=[{"role": "user", "content": question.text}]
    )
    return result.choices[0].message.content


async def getRecommendation(question):
    openai.api_key = apiKey
    result = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=[{"role": "user", "content": question.text}]
    )
    return result.choices[0].message.content


if __name__ == "__main__":
    app.run(debug=True, port=2023)
