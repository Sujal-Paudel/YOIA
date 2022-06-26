#!/usr/bin/env node

const exec = require("child_process").exec;
const fs = require("fs");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const data = require("./data.json");

const input = process.argv[2];
if (!input) {
  getInput(
    "Choose one Workspace:\n",
    Object.keys(data),
    "\nOR * for new project",
    "\nOR * after project name to update"
  ).then(input => {
    if (input.slice(-1) === "*") {
      const options = data[input.slice(0, -1)];
      getInput(options).then(inputs => {
        console.log(inputs);
        inputs.split("\n").forEach(input => {
          const pointer = input.split(":")[0];
          const edit = input
            .split(":")
            .slice(1)
            .join("");
          options[pointer] = edit;
        });
        console.log(options);
      });
    } else {
      executeAll(input);
    }
  });
} else {
  executeAll(input);
}

function getInput() {
  console.log(...arguments);
  return new Promise((resolve, reject) => {
    rl.question(">", input => {
      rl.close();
      resolve(input);
    });
  });
}

function executeAll(input) {
  const toExecute = data[input];
  const directory = data[input].shift();
  toExecute.forEach(e => {
    exec(`cd ${directory} & ${e}`);
  });
}
