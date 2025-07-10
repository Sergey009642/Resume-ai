FROM python:3.10-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        postgresql-client \
        wkhtmltopdf \
        pandoc && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN pandoc --version

WORKDIR /app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chmod +x entrypoint.sh

ENV FLASK_ENV=${FLASK_ENV}
ENV PYTHONUNBUFFERED=${PYTHONUNBUFFERED}

ENTRYPOINT ["./entrypoint.sh"]
