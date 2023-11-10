import os
import json
import time
import numpy as np
from math import sqrt
from prediction import songPrediction

class songPrediction:

    def __init__(self, scores, new_song, user_likes):
        self.likes = user_likes
        self.scores = scores
        self.new_song = new_song
        self.scores_table = self.count_up()
        self.means = self.get_means(self.scores_table)
        self.stdevs = self.get_stdevs(self.scores_table, self.means)
        self.expected_ratings = self.calculate_expected_ratings()

    def count_up(self):
        table = []
        print(len(self.scores))
        for i in enumerate(self.scores):
            table.append([])
            for j in enumerate(i[1]):
                for k in range(int(self.likes[j[0]])):
                    table[i[0]].append(float(i[1][j[0]]))
        return table
    
    def get_means(self, table):
        return [sum(a)/len(a) for a in table]
    
    def get_stdevs(self, table, means):
        return [np.sqrt(sum([(score-mean[1])**2 for score in table[mean[0]]]))/(len(self.likes)-1) for mean in enumerate(means)]
    
    def normal_distribution(self, mean, sd, x):
        prob_density = np.exp(-0.5*((float(x)-mean)/sd)**2)/(np.sqrt(np.pi*2)*sd)
        prob_density=min(10,prob_density)
        return prob_density
    
    def calculate_expected_ratings(self):
        return np.array([min(10,self.normal_distribution(self.means[i[0]], self.stdevs[i[0]], i[1])/(self.stdevs[i[0]]*sqrt(2*np.pi))) for i in enumerate(self.new_song)])

cur_path = os.path.dirname(__file__)

# get list of all ratings user has made // select from ratings table
# join ratings table onto songs
# convert csv objects to same as local_data objects
# need current song, previous song, user weights, song rating

with open(cur_path+'/../local_data/weights.json','r+') as weights, \
  open(cur_path+'/../local_data/currentSong.json','r+') as current_song, \
  open(cur_path+'/../local_data/previousSongs.json','r+') as previous_songs, \
  open(cur_path+'/../local_data/currRating.json','r+') as current_rating:
  for line in weights:
    weights_json=json.loads(line)
  for line in current_song:
    current_song_json=json.loads(line)
  for line in previous_songs:
    previous_songs_json=json.loads(line)
  for line in current_rating:
    current_rating_value=json.loads(line)['rating']

  keys = [
    'danceability',
    'energy',
    'speechiness',
    'acousticness',
    'instrumentalness',
    'liveness',
    'valence'
  ]


  if len(previous_songs_json['songs'])>5:
    songs_matrix=tuple(tuple(
      song[key] for key in keys
    ) for song in previous_songs_json['songs'])
    

songs_matrix3 = (
    (0.5, 0.5, 0.5, 0.5),
    (0.59, 0.51, 0.55, 0.7),
    (0.99, 0.99, 0.9, 0.92),
    (0.05, 0.1, 0.1, 0.1),
    (0.72, 0.38, 0.91, 0.44),
    (0.58, 0.99, 0.37, 0.26),
    (0.35, 0.81, 0.29, 0.44)
)

user_likes2 = [10, 10, 1, 1, 6, 7, 9]
new_song2 = [0.3, 0.8, 0.5, 0.8]
new_song2_rating = 7

start_time = time.time()  

scores = list(a for a in zip(*songs_matrix3))
print(scores, "SCORES")
prediction = songPrediction(scores, new_song2, user_likes2)
print(prediction.means)
print(prediction.calculate_expected_ratings())

end_time = time.time()

print(end_time-start_time)


  cur_path = os.path.dirname(__file__)

  with open(cur_path+'/../local_data/weights.json','r+') as weights, \
    open(cur_path+'/../local_data/currentSong.json','r+') as current_song, \
    open(cur_path+'/../local_data/previousSongs.json','r+') as previous_songs, \
    open(cur_path+'/../local_data/currRating.json','r+') as current_rating:
    for line in weights:
      weights_json=json.loads(line)
    for line in current_song:
      current_song_json=json.loads(line)
    for line in previous_songs:
      previous_songs_json=json.loads(line)
    for line in current_rating:
      current_rating_value=json.loads(line)['rating']

    keys = [
      'danceability',
      'energy',
      'speechiness',
      'acousticness',
      'instrumentalness',
      'liveness',
      'valence'
    ]


    if len(previous_songs_json['songs'])>5:
      songs_matrix=tuple(tuple(
        song[key] for key in keys
      ) for song in previous_songs_json['songs'])
      
      user_likes=previous_songs_json['ratings']

      scores = list(a for a in zip(*songs_matrix))

      current_song_arr=[
        current_song_json[key] for key in keys
      ]
      prediction = songPrediction(scores, list(current_song_arr), user_likes)

      input_vector = prediction.calculate_expected_ratings()

      print(input_vector)

      network_guess=np.dot(input_vector,np.array([weights_json[key] for key in keys]))/100
      print(network_guess)

      mse = np.square(float(network_guess) - float(current_rating_value))

      derivative = 2 * (float(network_guess) - float(current_rating_value))

      weights_json={key:weights_json[key]-derivative/30 for key in keys}

    previous_songs_json['songs'].append(current_song_json)
    previous_songs_json['ratings'].append(current_rating_value)

    os.remove(cur_path+'/../local_data/previousSongs.json')
    f = open(cur_path+'/../local_data/previousSongs.json', "w")
    f.write(json.dumps(previous_songs_json))
    f.close()

    os.remove(cur_path+'/../local_data/weights.json')
    f = open(cur_path+'/../local_data/weights.json', "w")
    f.write(json.dumps(weights_json))
    hidden_outputs=[np.dot(input_vector,[i[j] for i in weights_json['hiddenWeights']]) for j in range(3)]

    network_guess=np.dot(hidden_outputs,weights_json['outputWeights'])

    print(network_guess)

    output_error=network_guess-float(current_rating_value)
    print(output_error)
    hidden_errors = [
       -(float(current_rating_value)-hidden_outputs[i-1]*weights_json['outputWeights'][i-1]-hidden_outputs[i-2]*weights_json['outputWeights'][i-2])/(10*weights_json['outputWeights'][i]) for i in range(3)
    ]
    print(hidden_errors)
    hidden_weights_json=[[j[i]-hidden_errors[i]/100 for i in range(3)] for j in weights_json['hiddenWeights']]
    output_weights_json=[i-output_error/100 for i in weights_json['outputWeights']]

    weights_json={'hiddenWeights':hidden_weights_json,'outputWeights':output_weights_json}

  previous_songs_json['songs'].append(current_song_json)
  previous_songs_json['ratings'].append(current_rating_value)

  os.remove(cur_path+'/../local_data/previousSongs.json')
  f = open(cur_path+'/../local_data/previousSongs.json', "w")
  f.write(json.dumps(previous_songs_json))
  f.close()

  os.remove(cur_path+'/../local_data/weights.json')
  f = open(cur_path+'/../local_data/weights.json', "w")
  f.write(json.dumps(weights_json))


