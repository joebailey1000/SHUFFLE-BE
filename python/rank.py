import sys
import psycopg2
from song_prediction import songPrediction
import json
import numpy as np

songs=json.loads(sys.argv[1])
user_id=sys.argv[3]
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

connect = psycopg2.connect("postgres://qficvrjz:xgzayMFH1uUCEE-xAVxmnlxcRkDQcdaT@flora.db.elephantsql.com/qficvrjz")

cur = connect.cursor()

cur.execute(f'SELECT * FROM users WHERE user_id = {user_id}')

records = cur.fetchall()

weights_json = {'hiddenWeights':[[float(x) for x in records[0][i+2].split(',')] for i in range(8)],'outputWeights':[float(x) for x in records[0][-1].split(',')]}

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
cur.execute(f'SELECT * FROM rankings INNER JOIN songs ON rankings.song_id = songs.song_id WHERE rankings.user_id = {user_id}')
records = cur.fetchall()
previous_songs_json = {'songs': [{keys[i]:records[j][i+4] for i in range(19)} for j in range(len(records))], 'ratings': [i[3] for i in records]}

keys = [
  'popularity',
  'danceability',
  'energy',
  'tempo',
  'acousticness',
  'instrumentalness',
  'liveness',
  'valence'
]

songs_matrix=tuple(tuple(
    song[key] for key in keys
  ) for song in previous_songs_json['songs'])

user_likes=previous_songs_json['ratings']
scores = list(a for a in zip(*songs_matrix))

songs_arr=[[
    i[key] for key in keys
  ] for i in songs]

predictions = [songPrediction(scores, list(curr), user_likes) for curr in songs_arr]

input_vectors = [i.calculate_expected_ratings() for i in predictions]

hidden_outputs_arr=[[np.dot(input_vector,[i[j] for i in weights_json['hiddenWeights']]) for j in range(3)] for input_vector in input_vectors]

network_guesses=[np.dot(hidden_outputs,weights_json['outputWeights']) for hidden_outputs in hidden_outputs_arr]

print(network_guesses)