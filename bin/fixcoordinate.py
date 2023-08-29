import json
import csv
from random import randint
import re
from time import sleep
import geopy

def importJson():
    with open("data/arenas.json", "r",encoding='utf8') as fh:
        data = json.load(fh)
    return data

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

def fix(data):
    fixed = 0
    tofix = 0
    for d in data:
        #print(d)
        if d["coordinates"] is None and ("province" not in d or d["province"] not in ["NB","ON"]):
            location = adress2Geo(d["address"], d["city"])
            print(location)
            if location is not None:
                coordinate = {
                    "type": "Point",
                    "coordinates": [location.longitude, location.latitude]
                }

                d["coordinates"] = coordinate
                fixed += 1
            else:
                tofix += 1
    print(f"{fixed} entrées corrigées")
    print(f"{tofix} entrées restantes")
    print(f"{len(data)} entrées totales")

REREGION = re.compile(r"[^\(]+\((\w+)\)")
def loadRegions():
    municipalite = {}

    with open('data/MUN.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            nom = row["munnom"]
            region = row["regadm"]
            m = REREGION.match(region)
            region_no = int(m.group(1))
            municipalite[nom] = region_no
    return municipalite
            

def addRegion(data, municipalites):
    for arena in data:
        if "region" not in arena and ("province" not in arena or arena["province"] == "QC"):
            region = municipalites[arena["city"]]
            print(region)
            arena["region"] = region

def exportJSON(data):
    json_object = json.dumps(data, indent=4, ensure_ascii=False).encode('utf8')
 
    # Writing to sample.json
    with open("data/arenas_region.json", "wb") as outfile:
        outfile.write(json_object)

def main():
    data = importJson()
    #fix(data)
    municipalites = loadRegions()
    addRegion(data, municipalites)
    exportJSON(data)

if __name__ == "__main__":
    main()