const express = require("express");
const Joi = require("joi");
const logger = require("./logger");
const app = express();

app.use(express.json());

app.use(logger);

console.log('env:',app.get('env'))

let courses = [
  { id: 1, course: "python" },
  { id: 2, course: "javascript" },
];

app.get("/", (req, res) => {
  res.send("hello world");
});

// Post Data
app.post("/api/course", (req, res) => {
  const duplicateValue = courses.find((i) => i.name === req.body.name);

  // const schema = {
  //   name: Joi.string().min(3).required,
  // };

  // const result = Joi.valid(req.body, schema);

  // if (result.error) {
  //   res.status(400).send(result.error);
  // }

  // console.log(result);

  if (!duplicateValue) {
    const course = {
      id: courses.length + 1,
      name: req.body.name,
    };

    courses.push(course);
    res.send(course);
  } else {
    res.status(404).send("The Name is Already Taken,try different Name");
  }
});

// Delete Data
app.delete("/api/course/:id", (req, res) => {
  const deleteData = courses.filter((i) => i.id !== parseInt(req.params.id));
  courses = deleteData;
  res.send(courses);
});

app.get("/api/course", (req, res) => {
  res.send(JSON.stringify(courses));
});

app.get("/api/course/:id", (req, res) => {
  const courseId = courses.find((i) => i.id === parseInt(req.params.id));

  if (!courseId) {
    res.status(404).send("The course with the given id was not found");
  } else {
    res.send(courseId);
  }
});

// put data

app.put("/api/course/:id", (req, res) => {
  const course = courses.findIndex((i) => i.id === parseInt(req.params.id));

  courses[course].course = req.body.name;
  res.send(courses[course]);
});

app.get("/api/:date/:year", (req, res) => {
  // res.send(req.params);
  res.send(req.query);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Port is listening:${port}`);
});
