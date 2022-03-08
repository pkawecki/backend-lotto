// import express from "express";

import inquirer from "inquirer";
import { text } from "stream/consumers";

const chosenNumbers: number[] = [];
const randomNumbers: number[] = [];

const validateInput = (text: string): boolean => {
  const num: number = parseInt(text);
  const isValidNumber: boolean = num.toString() == text ? true : false;
  const isInRange: boolean = num > 0 && num < 50;
  return isValidNumber && isInRange;
};

const randomNewNumber = (): number => {
  const rand: number = Math.floor(Math.random() * 50);
  return rand;
};

const validateRandomNumber = (num: number): boolean => {
  return randomNumbers.includes(num) ? false : true;
};

const createRandomNumbers = (): void => {
  do {
    const number: number = randomNewNumber();
    if (validateRandomNumber(number)) {
      randomNumbers.push(number);
    }
  } while (randomNumbers.length < 6);
};

const countMatches = (firstArr: number[], secondArr: number[]): number => {
  let matches = 0;
  firstArr.forEach((x) => {
    if (secondArr.indexOf(x) > -1) {
      matches++;
    }
  });

  return matches;
};

const startApp = async (): Promise<void> => {
  do {
    const result = await inquirer.prompt([
      {
        name: "number",
        type: "input",
        message: "Podaj liczbę...",
      },
    ]);

    if (validateInput(result.number)) {
      chosenNumbers.push(parseInt(result.number));
    } else {
      console.log("Out of range 1...49");
    }
  } while (chosenNumbers.length < 6);
  console.log(
    "chosenNumbers: " + chosenNumbers + "\n" + "randomNumbers: " + randomNumbers
  );
  console.log("Matches: ", countMatches(chosenNumbers, randomNumbers));
};

createRandomNumbers();
console.log(randomNumbers);
startApp();
