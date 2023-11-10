import psycopg2
import json
import os

cur_path = os.path.dirname(__file__)

with open(cur_path+'/../local_data/networkInput.json','r+') as network_input:

    keys = [
    'user_id',
    'username',
    'popularity',
    'danceability',
    'energy',
    'speechiness',
    'acousticness',
    'instrumentalness',
    'liveness',
    'valence'
    ]

    for line in network_input:
        network_input=json.loads(line)
    
    print(network_input)

    connect = psycopg2.connect("postgres://qficvrjz:xgzayMFH1uUCEE-xAVxmnlxcRkDQcdaT@flora.db.elephantsql.com/qficvrjz")

    cur = connect.cursor()

    cur.execute(f'SELECT * FROM users WHERE user_id = {network_input["user_id"]}')

    records = cur.fetchall()

    weights_json = {'hiddenWeights':[records[0][i+2].split(',') for i in range(8)],'outputWeights':records[0][-1].split(',')}

    print(weights_json)

    cur.execute(f'SELECT * FROM songs WHERE song_id = {network_input["song_id"]}')

    records = cur.fetchall()

    keys = [
            'song_id',
            'spotify_id',
            'deezer_id',
            'title',
            'artist',
            'modernity',
            'popularity',
            'danceability',
            'energy',
            'loudness',
            'acousticness',
            'instrumentalness',
            'liveness',
            'valence',
            'tempo',
            'preview',
            'album',
            'link',
            'albumcover'
            ]
    
    current_song_json = {keys[i]:records[0][i] for i in range(19)}

    print(current_song_json)

    cur.execute(f'SELECT * FROM rankings INNER JOIN songs ON rankings.song_id = songs.song_id WHERE rankings.user_id = {network_input["user_id"]}')

    records = cur.fetchall()
    
    records.append(records[0])
    
    previous_songs_json = {'songs': [{keys[i]:records[j][i+4] for i in range(19)} for j in range(len(records))], 'ratings': [i[3] for i in records]}

    print(previous_songs_json)



