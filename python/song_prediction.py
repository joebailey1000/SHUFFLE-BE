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