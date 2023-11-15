import os
import json
import psycopg2
import numpy as np
from math import sqrt
import sys
from song_prediction import songPrediction




# get list of all ratings user has made // select from ratings table
# join ratings table onto songs
# convert csv objects to same as local_data objects
# need current song, previous song, user weights, song rating



cur_path = os.path.dirname(__file__)

network_input=json.loads(sys.argv[1])

update_weights=json.loads(sys.argv[2])

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

connect = psycopg2.connect("postgres://qficvrjz:xgzayMFH1uUCEE-xAVxmnlxcRkDQcdaT@flora.db.elephantsql.com/qficvrjz")

cur = connect.cursor()

cur.execute(f'SELECT * FROM users WHERE user_id = {network_input["user_id"]}')

records = cur.fetchall()

weights_json = {'hiddenWeights':[[float(x) for x in records[0][i+2].split(',')] for i in range(8)],'outputWeights':[float(x) for x in records[0][-1].split(',')]}

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

cur.execute(f'SELECT * FROM rankings INNER JOIN songs ON rankings.song_id = songs.song_id WHERE rankings.user_id = {network_input["user_id"]}')

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

if len(previous_songs_json['songs'])>4:
  songs_matrix=tuple(tuple(
    song[key] for key in keys
  ) for song in previous_songs_json['songs'])

  current_rating_value=network_input['ranking']
  
  user_likes=previous_songs_json['ratings']

  scores = list(a for a in zip(*songs_matrix))

  current_song_arr=[
    current_song_json[key] for key in keys
  ]

  prediction = songPrediction(scores, list(current_song_arr), user_likes)

  input_vector = prediction.calculate_expected_ratings()

  hidden_outputs=[np.dot(input_vector,[i[j] for i in weights_json['hiddenWeights']]) for j in range(3)]

  network_guess=np.dot(hidden_outputs,weights_json['outputWeights'])

  output_error=network_guess-float(current_rating_value)
  hidden_errors = [
      -(float(current_rating_value)-hidden_outputs[i-1]*weights_json['outputWeights'][i-1]-hidden_outputs[i-2]*weights_json['outputWeights'][i-2])/(10*weights_json['outputWeights'][i]) for i in range(3)
  ]
  hidden_weights_json=[','.join([str(j[i]-hidden_errors[i]/1000) for i in range(3)]) for j in weights_json['hiddenWeights']]
  output_weights_json=','.join([str(i-output_error/1000) for i in weights_json['outputWeights']])

  weights_json={'hiddenWeights':hidden_weights_json,'outputWeights':output_weights_json}


  cur.execute(f'UPDATE users SET popularity_weightings = \'{weights_json["hiddenWeights"][0]}\', danceability_weightings =\'{weights_json["hiddenWeights"][1]}\', energy_weightings = \'{weights_json["hiddenWeights"][2]}\', acousticness_weightings = \'{weights_json["hiddenWeights"][3]}\', instrumentalness_weightings = \'{weights_json["hiddenWeights"][4]}\', liveness_weightings = \'{weights_json["hiddenWeights"][5]}\', valence_weightings = \'{weights_json["hiddenWeights"][6]}\', tempo_weightings = \'{weights_json["hiddenWeights"][7]}\', output_weightings = \'{weights_json["outputWeights"]}\' WHERE user_id = {network_input["user_id"]} RETURNING *' )

  records = cur.fetchall()

  print(network_guess)

  if update_weights:
    connect.commit()
  connect.close()

  



