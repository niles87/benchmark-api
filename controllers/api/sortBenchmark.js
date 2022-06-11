const router = require("express").Router();
const { bubbleSort, quickSort } = require("../../utils/sort");
const { suite } = require("../../config/benchmark");

router.get("/bubble", (req, res) => {
  try {
    const numbers = [];
    const numRounds = req.query.rounds;

    for (let i = 0; i < numRounds; i++) {
      numbers.push(Math.floor(Math.random() * 10000) + 1);
    }

    suite
      .add("bubble sort", () => {
        const testArray = [...numbers];

        bubbleSort(testArray);
      })
      .run();
    res
      .status(200)
      .json(
        `${suite[suite.length - 1].name} averaged ${
          suite[suite.length - 1].stats.mean * 1000
        } milliseconds.`
      );
  } catch (error) {
    res.send(500).end();
  }
});

router.get("/quick", (req, res) => {
  try {
    const numbers = [];
    const rounds = req.query.rounds;

    for (let i = 0; i < rounds; i++) {
      numbers.push(Math.floor(Math.random() * 10000) + 1);
    }

    suite
      .add("quick sort", function () {
        const testArray = [...numbers];
        quickSort(testArray);
      })
      .run();

    res
      .status(200)
      .json(
        `${suite[suite.length - 1].name} averaged ${
          suite[suite.length - 1].stats.mean * 1000
        } milliseconds.`
      );
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;
