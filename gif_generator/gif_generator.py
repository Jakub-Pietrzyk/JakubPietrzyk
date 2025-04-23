import matplotlib.pyplot as plt
from mpl_toolkits.basemap import Basemap
import imageio
import os
import numpy as np
import json

cities = [
    {"name": "Vancouver", "lat": 49.2827, "lon": -123.1207},
    {"name": "Jasper", "lat": 52.8734, "lon": -118.0809},
    {"name": "Banff", "lat": 51.1784, "lon": -115.5708},
    {"name": "Clinton", "lat": 51.08309, "lon": -121.58597}

    # {"name": "Perth", "lat": -31.95, "lon": 115.86},
    # {"name": "Geraldton", "lat": -28.77, "lon": 114.61},
    # {"name": "Kalbarri", "lat": -27.71, "lon": 114.16},
    # {"name": "Monkey Mia", "lat": -25.87, "lon": 113.70},
    # {"name": "Carnarvon", "lat": -24.88, "lon": 113.66},
    # {"name": "Coral Bay", "lat": -23.144722, "lon": 113.776390},
    # {"name": "Exmouth", "lat": -21.93, "lon": 114.13}
]

# with open("./data/trips/west_australia_trip.json", "r") as f:
with open("./data/trips/canada_roadtrip.json", "r") as f:
    raw_coords = json.load(f)

trasa = [(lat, lon) for lon, lat in raw_coords]

filenames = []

def interpolate_trasa(trasa, steps=3):
    new_trasa = []
    for i in range(len(trasa) - 1):
        lat1, lon1 = trasa[i]
        lat2, lon2 = trasa[i + 1]
        for t in np.linspace(0, 1, steps, endpoint=False):
            lat = lat1 + (lat2 - lat1) * t
            lon = lon1 + (lon2 - lon1) * t
            new_trasa.append((lat, lon))
    new_trasa.append(trasa[-1])
    return new_trasa

inter_trasa = interpolate_trasa(trasa, steps=3)

# Wyliczanie granic i wyrównanie do kwadratu
lats, lons = zip(*inter_trasa)
min_lat, max_lat = min(lats), max(lats)
min_lon, max_lon = min(lons), max(lons)

lat_range = max_lat - min_lat
lon_range = max_lon - min_lon
padding = 2

if lat_range > lon_range:
    diff = lat_range - lon_range
    min_lon -= diff / 2
    max_lon += diff / 2
else:
    diff = lon_range - lat_range
    min_lat -= diff / 2
    max_lat += diff / 2

min_lat = max(min_lat - padding, -89.9)
max_lat = min(max_lat + padding, 89.9)
min_lon = max(min_lon - padding, -179.9)
max_lon = min(max_lon + padding, 179.9)

# Generowanie klatek
for i in range(5, len(inter_trasa) + 1):
    fragment = inter_trasa[:i]
    lats, lons = zip(*fragment)

    fig, ax = plt.subplots(figsize=(10, 10), dpi=100)
    m = Basemap(projection='merc',
                llcrnrlat=min_lat, urcrnrlat=max_lat,
                llcrnrlon=min_lon, urcrnrlon=max_lon,
                resolution='i', ax=ax)
    m.drawcoastlines(linewidth=0.3)
    m.drawcountries(linewidth=0.3)

    for city in cities:
        x, y = m(city["lon"], city["lat"])
        plt.text(x, y, city["name"], fontsize=8, fontweight='bold', ha='center', va='bottom', color='black', bbox=dict(facecolor='none', edgecolor='none', boxstyle='round,pad=0.2'))

    x, y = m(lons, lats)
    m.plot(x, y, color='red', linewidth=2)

    filename = f"./gif_generator/frame_{i:03d}.png"
    plt.savefig(filename, bbox_inches='tight')
    filenames.append(filename)
    plt.close()

# Dodanie kilku końcowych z całą trasą
for _ in range(5):
    fig, ax = plt.subplots(figsize=(10, 10), dpi=100)
    m = Basemap(projection='merc',
                llcrnrlat=min_lat, urcrnrlat=max_lat,
                llcrnrlon=min_lon, urcrnrlon=max_lon,
                resolution='i', ax=ax)
    m.drawcoastlines(linewidth=0.3)
    m.drawcountries(linewidth=0.3)

    for city in cities:
        x, y = m(city["lon"], city["lat"])
        plt.text(x, y, city["name"], fontsize=8, fontweight='bold', ha='center', va='bottom', color='black', bbox=dict(facecolor='none', edgecolor='none', boxstyle='round,pad=0.2'))

    lats, lons = zip(*inter_trasa)
    x, y = m(lons, lats)
    m.plot(x, y, color='red', linewidth=2)

    filename = f"./gif_generator/frame_out_{_}.png"
    plt.savefig(filename, bbox_inches='tight')
    filenames.append(filename)
    plt.close()

# Tworzenie GIFa
with imageio.get_writer('./gif_generator/trace.gif', mode='I', duration=0.07) as writer:
    for filename in filenames:
        image = imageio.imread(filename)
        writer.append_data(image)

# Sprzątanie
for filename in filenames:
    os.remove(filename)
