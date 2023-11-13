const { performance } = require('perf_hooks')

class SongPrediction {
    constructor(scores, newSong, userLikes) {
      this.likes = userLikes;
      this.scores = scores;
      this.newSong = newSong;
      this.scoresTable = this.countUp();
      this.means = this.getMeans(this.scoresTable);
      this.stdevs = this.getStdevs(this.scoresTable, this.means);
      this.expectedRatings = this.calculateExpectedRatings();
    }
  
    countUp() {
      const table = [];
      this.scores.forEach((score, scoresIndex) => {
        table.push([])
        score.forEach((_, scoreIndex) => {
            for (let _ = 0; _ < this.likes[scoreIndex]; _++) {
                table[scoresIndex].push(score[scoreIndex])
            }
        })
      })
      return table;
    }
  
    getMeans(table) {
      return table.map(group => group.reduce((acc, val) => acc + val, 0) / group.length);
    }
  
    getStdevs(table, means) {
        return means.map((mean, index) => {
            const variance = table[index].reduce((acc, score) => acc + (score - mean) ** 2, 0) / this.likes.length;
            return variance
        })}
  
    normalDistribution(mean, sd, x) {
      const exponent = Math.exp(-0.5 * ((x - mean) / sd) ** 2);
      const probDensity = exponent / (Math.sqrt(2 * Math.PI) * sd);
      return Math.min(probDensity, 10);
    }
  
    calculateExpectedRatings() {
      return this.newSong.map((song, index) => {
        return this.normalDistribution(this.means[index], this.stdevs[index], song) /
          (this.stdevs[index] * Math.sqrt(2 * Math.PI));
      });
    }
  }


scores = [[0.5, 0.59, 0.99, 0.05, 0.72, 0.58, 0.35], [0.5, 0.51, 0.99, 0.1, 0.38, 0.99, 0.81], [0.5, 0.55, 0.9, 0.1, 0.91, 0.37, 0.29], [0.5, 0.7, 0.92, 0.1, 0.44, 0.26, 0.44]]
newSong = [0.3, 0.8, 0.5, 0.8]
userLikes = [10, 10, 1, 1, 6, 7, 9]

const start = performance.now()

  test = new SongPrediction(scores, newSong, userLikes)


  test.calculateExpectedRatings()

const end = performance.now()  
console.log(end - start)
