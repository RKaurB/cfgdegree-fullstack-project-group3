const {Account} = require("../Auth/Account")

let account
beforeAll(() => {
  account = new Account();
});

test("Create New Account And return 201 status",async ()=>{
    const result = await account.SignUp("Test23","Test32@gi.com","G/2%,J];Muge<<8M")
    await expect(result.ID).not.toBeUndefined()
    expect(await result.status).toBe(201)
    if(result.status === 201){
      await account.DeleteCurrentAccount();
  }
})

test("Create Exist Account and return 401 status",async ()=>{
  const result = await account.SignUp("Test12","Test12@gi.com","G/2%,J];Muge<<8M")
  expect(await result.status).toBe(409)
  expect(result.ID).toBeUndefined()
})

test("Login Correctly and Return 200 ", async () =>{
  const result = await account.LoginIn("test12@gi.com","G/2%,J];Muge<<8M")
  console.log(result.message)
  expect(await result.status).toBe(200)
  expect(await result.ID).not.toBeUndefined()
})

test("Login Incorrectly and Return 400 ", async () =>{
  const result = await account.LoginIn("test12@gi.com","G/2%,J];dssad<<8M")
  console.log(result.message)
  expect(await result.status).toBe(400)
  expect(await result.ID).toBeUndefined()
})

