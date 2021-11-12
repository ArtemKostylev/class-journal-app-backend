const periods = ["first", "second", "third", "fourth", "year"];

const PERIOD_MAP = {
  first: "I",
  second: "II",
  third: "III",
  fourth: "IV",
  year: "год",
};

// TODO: add program mapper

const addRow = (children) =>
  `<tr>
  ${children.reduce((acc, curr) => acc.concat(curr), "")}
  </tr>`;

const addHeader = ({ text, className }) =>
  `<th class="${className}">
${text}
</th>`;

const addTallHeader = ({ text, className }) =>
  `<th rowspan="2" class="${className}">
${text}
</th>`;

const addLongHeader = ({ text, className }) =>
  `<th colspan="5" class="${className}">
${text}
</th>`;

// TODO: mb add <p>
const addCell = ({ text, className }) =>
  `<td class="${className}">${text}</td>`;

const addTable = ({ title, header, body }) =>
  `<div>
  ${title}
  <table class="table">
  <thead>${header.reduce((acc, curr) => acc.concat(curr), "")}</thead>
  <tbody>
  ${body.reduce((acc, curr) => acc.concat(curr), "")}
  </tbody>
  </table>
  </div>`;

const addTitle = (text) => {
  const [course, spec, program] = text.split(" ");

  if (program === "OP")
    return `<p>${course} класс ОБЩЕРАЗВИВАЮЩИЕ ОП в области музыкального искусства (${spec})</p>`;

  return `<p>${course} класс ${spec} (предпрофессиональная ОП)</p>`;
};

const styles = {
  base: `
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
  table: `
    margin-bottom: 20px;
    border-collapse: collapse;
    width: 100%;
  `,
  header: `
    font-weight: normal;
    border-top: none;
    border: 1px solid black;
    border-collapse: collapse;
  `,
  mark: `
    border-top: none;
    border: 1px solid black;
    border-collapse: collapse;
    padding: 0px;
  `,
};

const createStyleSheet = () =>
  `<style>
  ${Object.keys(styles).reduce(
    (acc, curr) => acc.concat(`.${curr} {${styles[curr]}} \n`),
    ""
  )}
  </style>`;

const createDocument = (tables) => `
<!DOCTYPE html>
<html>
<body>
${createStyleSheet()}
<div class="base">
${tables.reduce((acc, curr) => acc.concat(curr), "")}
</div>
</body>
</html>
`;

const createRow = ({ key, value, index, courses }) => {
  return addRow([
    addCell({
      text: String(index),
      className: "header",
    }),
    addCell({
      text: key,
      className: "header",
    }),
    ...courses
      .map((it) => {
        const courseMarks = new Map(
          value
            .find((item) => item.courseId === it.id)
            ?.marks?.map((mark) => [mark.period, mark.mark])
        );
        return periods.map((period) => {
          return addCell({
            text: String(courseMarks.get(period) || ""),
            className: "mark",
          });
        });
      })
      .flat(),
  ]);
};

// TODO: add title

const createHeader = (courses) => {
  return [
    addRow([
      addTallHeader({
        text: "№",
        className: "header",
      }),
      addTallHeader({
        text: "Фамилия, имя учащегося",
        className: "header",
      }),
      ...courses.map((it) =>
        addLongHeader({ text: it.name, className: "header" })
      ),
    ]),
    addRow([
      ...courses
        .map(() =>
          periods.map((period) =>
            addHeader({ text: PERIOD_MAP[period], className: "header" })
          )
        )
        .flat(),
    ]),
  ];
};

const createTable = (title, courses, marks) =>
  addTable({
    title: addTitle(title),
    header: createHeader(courses),
    body: [
      ...Array.from(marks).map(([key, value], index) =>
        createRow({ key, value, index, courses })
      ),
    ],
  });

const buildHtml = (mappedData) =>
  createDocument([
    ...Array.from(mappedData).map(([key, value]) =>
      createTable(key, value.courses, value.studentMarks)
    ),
  ]);

module.exports = { buildHtml };
