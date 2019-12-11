const lodash = require("lodash");

const getDobbleSets = (numberOfImagesToEachCard, numberOfPossibleImages) => {
  const possibilities = [...Array(numberOfPossibleImages).keys()];

  let result = [];

  const elementsInCommom = (a, b) => {
    let arrayOfCommonElements = [];
    a.forEach(elem => {
      if (b.includes(elem)) {
        arrayOfCommonElements.push(elem);
      }
    });
    return arrayOfCommonElements;
  };

  const haveOnlyOneMatchingNumber = arrayToBeTested =>
    result.every(x => elementsInCommom(arrayToBeTested, x).length === 1);

  const haveOnlyUniqueElements = arrayToBeTested => {
    const initialLength = arrayToBeTested.length;
    return [...new Set(arrayToBeTested)].length === initialLength;
  };

  const invalidPartialArray = arrayToBeTested =>
    result.every(x => elementsInCommom(arrayToBeTested, x).length > 1) &&
    !haveOnlyUniqueElements(arrayToBeTested);

  const recurssiveSolution = (partialArray, missingIterations) => {
    if (missingIterations === 4) {
      const date = new Date();
      console.log(
        "[" +
          date.getHours().toString() +
          ":" +
          date.getMinutes().toString() +
          ":" +
          date.getSeconds().toString() +
          "]" +
          " still calculating..."
      );
    }
    if (missingIterations === 0) {
      if (
        haveOnlyOneMatchingNumber(partialArray) &&
        haveOnlyUniqueElements(partialArray)
      ) {
        result.push(partialArray);
      }
      return;
    }
    lodash.shuffle(possibilities).forEach((n, index) => {
      if (missingIterations === 9) {
        const date = new Date();
        console.log(
          "[" +
            date.getHours().toString() +
            ":" +
            date.getMinutes().toString() +
            ":" +
            date.getSeconds().toString() +
            "]" +
            " iteration [" +
            index +
            "]"
        );
      }
      const newPartialArray = [...partialArray, n];
      if (invalidPartialArray(newPartialArray)) {
        return;
      }
      recurssiveSolution(newPartialArray, missingIterations - 1);
    });
  };

  recurssiveSolution([], numberOfImagesToEachCard);

  return result;
};

console.log(getDobbleSets(9, 73));
