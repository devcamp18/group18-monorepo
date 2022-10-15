FROM ubuntu:20.04
WORKDIR /app

ENV TZ=Asia/Dubai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update 
RUN apt-get install -y --no-install-recommends build-essential gcc \
    libsndfile1 ffmpeg libsm6 libxext6  -y

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt install -y python3-pip

COPY ./requirements.txt ./requirements.txt
RUN pip3 install -r requirements.txt

RUN apt-get install python3-tk -y

COPY main.py /app/main.py

CMD ["uvicorn", "src:app", "--host", "0.0.0.0", "--port", "8080"]

