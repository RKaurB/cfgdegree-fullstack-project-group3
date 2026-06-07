const {Account} = require("./Account")

let account
beforeAll(() => {
  account = new Account(); // was module.Account()
});

test("Create New Account And return 201 status",async ()=>{
    const result = await account.SignUp("Test23","Test32@gi.com","G/2%,J];Muge<<8M")
    await expect(result.ID).not.toBeNull()
    expect(await result.status).toBe(201)
    if(result.status === 201){
      await account.DeleteCurrentAccount();
  }
})

test("Create Exist Account and return 401 status",async ()=>{
  const result1 = await account.SignUp("Test12","Test12@gi.com","G/2%,J];Muge<<8M")
  expect(await result.status).toBe(409)
  await expect(result.ID).toBeNull()

})

