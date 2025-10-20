import { readFileSync, writeFileSync } from 'fs';
import chalk from 'chalk';

const fetchNote = () => {
  try {
    const dataBuffer = readFileSync('notes.json');
    const dataBody = dataBuffer.toString();
    return JSON.parse(dataBody);
  } catch (e) {
    return [];
  }
};

const addNote = (title, body) => {
  const data = fetchNote();
  const duplicateEntry = data.find(
    (d) => d.title.toLowerCase() === title.toLowerCase(),
  );

  if (duplicateEntry !== undefined) {
    console.log(chalk.red.inverse.bold('Duplicate Title Found!'));
  } else {
    data.push({
      title: title,
      body: body,
    });
    console.log(chalk.green.inverse.bold('New Note Added!'));

    saveNote(JSON.stringify(data));
  }
};

const saveNote = (data) => {
  writeFileSync('./notes.json', data);
};

const removeNote = (title) => {
  const data = fetchNote();
  const newData = data.filter(
    (d) => d.title.toLowerCase() !== title.toLowerCase(),
  );

  if (newData.length < data.length) {
    console.log(chalk.green.inverse.bold('title:', title, 'removed!'));
    saveNote(JSON.stringify(newData));
  } else {
    console.log(
      chalk.red.inverse.bold(`The title ${title} could not be found!`),
    );
  }
};

const listNote = () => {
  try {
    const data = fetchNote();
    if (data.length == 0) {
      return console.log(chalk.red.inverse.bold('No notes found!'));
    }
    const sortData = data.sort((a, b) => {
      return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    });
    sortData.forEach((d, index) => {
      console.log(chalk.green.inverse.bold(`${index + 1}: ${d.title}`));
      console.log();
    });
  } catch (e) {
    return console.log(chalk.red.inverse.bold('Error fetching data!'));
  }
};

const readNote = (title) => {
  try {
    const data = fetchNote();
    const findData = data.find(
      (d) => d.title.toLowerCase() === title.toLowerCase(),
    );
    if (findData !== undefined) {
      console.log(
        chalk.green.inverse.bold(
          `Title: ${findData.title} | Body: ${findData.body}`,
        ),
      );
    } else {
      return console.log(
        chalk.red.inverse.bold('Could not find the title name!'),
      );
    }
  } catch (e) {
    return console.log(chalk.red.inverse.bold('Error fetching data!'));
  }
};

export default {
  fetchNote,
  addNote,
  saveNote,
  removeNote,
  listNote,
  readNote,
};
