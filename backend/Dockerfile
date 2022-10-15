FROM python:3.9

RUN apt-get update -y

COPY ./requirements.txt ./requirements.txt
RUN pip3 install -r requirements.txt

COPY ./src /src
RUN useradd -m myuser
USER myuser


CMD ["uvicorn", "src:app", "--host", "0.0.0.0", "--port", "8080"]
