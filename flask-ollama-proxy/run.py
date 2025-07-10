import json
import os

import PyPDF2
import pypandoc
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import requests
import pdfkit

from app import setup_app
from app.config import Config
from app.services.chat_service import process_text

app = Flask(__name__)
CORS(app)
setup_app(app)


def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            text += page.extract_text()
    return text


@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        print(f"Received data: {data}")

        result = process_text(data, Config.PROMPT)
        return jsonify(f"{result.choices[0].message.content[7:-3]}")

    except requests.exceptions.RequestException as e:
        print(f"RequestException: {e}")
        if e.response is not None:
            print(f"Response content: {e.response.content}")
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        print(f"Exception: {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/api/makepdf', methods=['POST'])
def make_pdf():
    try:
        data = request.json
        print(f"Received data: {data}")
        pdfkit.from_string(str(data['html']), 'out.pdf')
        return send_file('out.pdf', as_attachment=True)
    except Exception as e:
        print(f"Exception: {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/api/makedocx', methods=['POST'])
def make_docx():
    try:
        data = request.json
        print(f"Received data: {data}")
        pypandoc.convert_text(str(data['html']), 'docx', format='html', outputfile='output.docx')
        return send_file('output.docx', as_attachment=True)
    except Exception as e:
        print(f"Exception: {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/api/parseRandResume', methods=['POST'])
def parse_rand_resume():
    try:
        print("Incoming form data:", request.form)
        text_data = request.form.get('text')
        if not text_data:
            return jsonify({"error": "No valid text input provided."}), 400

        print("Received text:", text_data)
        fields = request.form.getlist('fields[]')
        if not fields:
            return jsonify({"error": "Fields list is missing."}), 400

        print("Received fields:", fields)
        prompt = f"{Config.PROMPT_NO_RAND_DATA} {' '.join(fields)}"

        result = process_text(text_data, prompt)
        res_content = result.choices[0].message.content
        print("Response content:", res_content)

        if res_content.startswith("```") and res_content.endswith("```"):
            res_content = res_content.strip("```").strip("json").strip()

        extracted_json = json.loads(res_content)

        return jsonify(extracted_json)

    except Exception as e:
        print("Error occurred:", str(e))
        return jsonify({"error": f"Failed to process text: {str(e)}"}), 500


@app.route('/api/parseResume', methods=['POST'])
def parse_pdf():
    file = None
    text_data = None
    file_path = None

    if 'file' in request.files and request.files['file'].filename != '':
        file = request.files['file']
        is_pdf = True
    elif 'text' in request.form and request.form['text']:
        text_data = request.form['text']
        is_pdf = False
    else:
        return jsonify({"error": "No valid input provided. Please upload a PDF or provide text."}), 400

    if is_pdf and not file.filename.lower().endswith('.pdf'):
        return jsonify({"error": "Only PDF files are allowed"}), 400

    data = request.form
    fields = data.getlist('fields[]')

    if is_pdf:
        file_path = os.path.join(os.getcwd(), file.filename)
        file.save(file_path)
        try:
            extracted_text = extract_text_from_pdf(file_path)
        finally:
            if os.path.exists(file_path):
                os.remove(file_path)
    else:
        extracted_text = text_data

    try:
        result = process_text(extracted_text, f"{Config.PROMPT_NO_RAND_DATA} {' '.join(fields)}")

        extracted_json = json.loads(result.choices[0].message.content)
        print(f"Extracted JSON: {extracted_json}")

        return jsonify(extracted_json)

    except Exception as e:
        return jsonify({"error": f"Failed to process PDF: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

