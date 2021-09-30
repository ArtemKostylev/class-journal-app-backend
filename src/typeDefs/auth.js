signup(login: String!, password: String!, roleId: Int!): AuthPayload
signin(login: String!, password: String!): AuthPayload

type User {
  id: Int!
  roleId: Int!
  email: String!
  teacher: Teacher
}

type AuthPayload {
  token: String
  user: User
}