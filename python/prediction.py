import numpy as np
from math import sqrt

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
        for i in enumerate(self.scores):
            table.append([])
            for j in enumerate(i[1]):
                for k in range(self.likes[j[0]]):
                    table[i[0]].append(i[1][j[0]])
        return table
    
    def get_means(self, table):
        return [sum(a)/len(a) for a in table]
    
    def get_stdevs(self, table, means):
        return [sum([(score-mean[1])**2 for score in table[mean[0]]])/len(self.likes) for mean in enumerate(means)]
    
    def normal_distribution(self, mean, sd, x):
        prob_density = (np.pi*sd) * np.exp(-0.5*((x-mean)/sd)**2)
        return prob_density
    
    def calculate_expected_ratings(self):
        return np.array([self.normal_distribution(self.means[i[0]], self.stdevs[i[0]], i[1])/(self.stdevs[i[0]]*sqrt(2*np.pi))*8 for i in enumerate(self.new_song)])


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

scores = list(a for a in zip(*songs_matrix3))
print(scores, "SCORES")
prediction = songPrediction(scores, new_song2, user_likes2)
print(prediction.scores_table)

# # print(prediction.expected_ratings)

# input_vector = prediction.expected_ratings

# weights = np.random.rand(len(input_vector),)


# def make_prediction(input):
#     return np.dot(input, weights)




# for i in range(10):
#     # print(f'weights: {weights}')

#     # print(f'prediction: {make_prediction(input_vector)}')
#     mse = np.square(make_prediction(input_vector) - new_song2_rating)

#     # print(f'error:{mse}')

#     derivative = 2 * (make_prediction(input_vector) - new_song2_rating)

#     # print(derivative)
#     weights += -derivative / 30

