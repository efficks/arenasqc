#!/usr/bin/env python
import csv
import json
from random import randint
from time import sleep
import geopy
from tqdm import tqdm

def fixStreet(street):
    s = street.split(",")
    if len(s) > 2:
        s=s[0:2]
    return " ".join(s)

def importCSV():
    data = []
    rows = []
    with open('data/arenas.csv', newline='',encoding='utf8') as fh:
        reader = csv.reader(fh, delimiter=',', quotechar='"')
        for row in reader:
            rows.append(row)
    
    pbar = tqdm(rows)
    for row in pbar:
        street = row[1]
        street = fixStreet(street)
        city = row[2]
        print(f"{row[0]}, {street}, {city}")
        location = adress2Geo(street, city)
        coordinate = None
        if location is not None:
            pbar.set_description(f"{location.latitude} {location.longitude}")
            coordinate = {
                    "type": "Point",
                    "coordinates": [location.longitude, location.latitude]
                }
        data.append({
            "name":row[0],
            "adress":street,
            "city":city,
            "coordinates":coordinate
        })
    return data

def exportJSON(data):
    json_object = json.dumps(data, indent=4, ensure_ascii=False).encode('utf8')
 
    # Writing to sample.json
    with open("data/_arenas.json", "wb") as outfile:
        outfile.write(json_object)

def adress2Geo(street, city):
    sleep(randint(100,1000)/1000)
    user_agent = 'user_me_{}'.format(randint(10000,99999))
    nomi = geopy.geocoders.Nominatim(user_agent=f"arenasqc_{user_agent}")
    return nomi.geocode(timeout=10,query={
        "street":street,
        "city":city,
        "state":"Québec",
        "country":"Canada"
    },
        exactly_one=True,
        )

def main():
    data = importCSV()
    exportJSON(data)

if __name__ == "__main__":
    main()