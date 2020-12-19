FROM python:3.7-alpine
WORKDIR /source
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 8000
COPY . /source/backend
COPY ./exercise_yedda.db /source
RUN cd ..
RUN pwd
RUN ls
CMD ["uvicorn", "backend.main:app", "--reload", "--host=0.0.0.0"]
