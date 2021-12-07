const GROUP_PERIODS = {
  FIRST_HALF: () =>
    new Map([
      ['8', []],
      ['9', []],
      ['10', []],
      ['11', []],
    ]),
  SECOND_HALF: () =>
    new Map([
      ['0', []],
      ['1', []],
      ['2', []],
      ['3', []],
      ['4', []],
    ]),
};

const BASE_TYPES = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  scalar Date
  scalar Upload
`;

module.exports = { GROUP_PERIODS, BASE_TYPES };
