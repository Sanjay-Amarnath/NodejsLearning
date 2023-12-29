const express = require("express");

const app = express();

app.use(express.json());

let courses = [
  { id: 1, course: "python" },
  { id: 2, course: "javascript" },
];

app.get("/", (req, res) => {
  res.send("hello world");
});

// Post Data
app.post("/api/course", (req, res) => {
  const dublicateValue = courses.find((i) => i.name === req.body.name);

  if (!dublicateValue) {
    const course = {
      id: courses.length + 1,
      name: req.body.name,
    };

    courses.push(course);
    res.send(course);
  } else {
    res.send("The Name is Already Taken,try different Name");
  }
});

// Delete Data
app.delete("/api/course/:id", (req, res) => {
  const deleteData = courses.filter((i) => i.id !== parseInt(req.params.id));

  console.log(deleteData, "params.id");
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

app.get("/api/:date/:year", (req, res) => {
  // res.send(req.params);
  res.send(req.query);
});

const port = process.env.PORT || 3000;
console.log(port);
app.listen(3000, () => {
  console.log(`Port is listening:${port}`);
});
