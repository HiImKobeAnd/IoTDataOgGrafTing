from sense_hat import SenseHat
import json
import time
import requests

sense = SenseHat()

while True:

    temp = sense.get_temperature()

    data = {
        "temperatur": temp
    }

    headers = {"content-type": "application/json"}
    url = "http://192.168.0.112/api/collections/temp/records"
    response = requests.post(url, data=json.dumps(data), headers=headers)
    time.sleep(5)
