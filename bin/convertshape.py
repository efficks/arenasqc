import geopandas
myshpfile = geopandas.read_file('data/regio_s.shp')
myshpfile.to_file('data/regio_s.geojson', driver='GeoJSON')