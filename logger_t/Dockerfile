FROM python:3

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/logs
RUN touch /usr/src/app/logs/logging.txt
RUN ls /usr/src/app/logs/logging.txt

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY myapp.py ./

CMD [ "python", "./myapp.py" ]
