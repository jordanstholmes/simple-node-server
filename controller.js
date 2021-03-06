const fs = require('fs');

module.exports = {
  get: (req, res) => {
    res.send("Ugh... that's the wrong request type :(");
  },
  post: (req, res) => {
    const { name, message } = req.body;
    const cohort = req.params.cohort.toLowerCase();
    const cohorts = ['hrsf113'];
    if (
      !name ||
      !message ||
      Object.keys.length > 2 ||
      typeof message !== 'string' ||
      !cohorts.includes(cohort)
    ) {
      res.send('Invalid POST request!');
    } else {
      fs.writeFile(
        `./data/${cohort}.txt`,
        `\n${name} - ${message}\n`,
        { flag: 'a' },
        function(err) {
          if (err) {
            res.send(
              `Got a bad POST request! Here's the error - ${JSON.stringify(
                err
              )}`
            );
          } else {
            res.send(
              `Hey ${req.body.name}, thanks for completing the assignment!`
            );
          }
        }
      );
    }
  }
};
