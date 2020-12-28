import { UserPassword } from "../modules/user/domain/UserPassword"
import { UserEmail } from "../modules/user/domain/UserEmail"
import { UserName } from "../modules/user/domain/UserName"
import { User } from "../modules/user/domain/User"
// import {RegisterUserUseCase} from "../modules/user/useCases/registerUser/RegisterUserUseCase"

// let user: User
const username = UserName.create({username:"okName"}).getValue()
const email = UserEmail.create({email:"success@email.com"}).getValue()
const password = UserPassword.create({password: "password"}).getValue()


// beforeEach(() => {
//   user = null
// })

test("ユーサー作成テスト", () => {
  const result = User.create({username,email, password}).getValue()

  expect(result.username.props.username).toBe("okName")
  expect(result.email.props.email).toBe("success@email.com")
})