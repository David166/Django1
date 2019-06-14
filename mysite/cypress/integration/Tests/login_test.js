// Visits the wiki
describe('Visit Test', function () {
  it('Visits the wiki', function () {
    cy.visit('http://127.0.0.1:8000/wiki/')
    cy.wait(700)
  })
})

// Logs in
describe('Login Test', function () {
  it('Clicks the "Login" button and logs in', function () {
    cy.visit('http://127.0.0.1:8000/wiki/')
    cy.contains('Login').click()
    // Should be on a new URL which includes '/accounts/login
    cy.url().should('include', '/accounts/login')
    // Types the login information in and clicks the Login button
    cy.get('form').within(() => {
      cy.get('input[name="username"]').type('admin')
      cy.get('input[name="password"]').type('password')
      cy.get('input[id="loginedit"]').click()
    })
  })
})

// Logs out
describe('Logout Test', function () {
  it('Logs in and logs out', function () {
    cy.visit('http://127.0.0.1:8000/wiki/')
    cy.contains('Login').click()
    // Should be on a new URL which includes '/accounts/login
    cy.url().should('include', '/accounts/login')
    // Types the login information in and clicks the Login button
    cy.get('form').within(() => {
      cy.get('input[name="username"]').type('admin')
      cy.get('input[name="password"]').type('password')
      cy.get('input[id="loginedit"]').click()
    })
  })
})

// Opens a page, goes into the editor and saves it
describe('Opens up the Wisbech page, clicks the Edit button and clicks the Save button', function () {
  it('Goes on the Wisbech page to edit it, logs in and saves', function () {
    // Visits the Wisbech page
    cy.visit('http://127.0.0.1:8000/wiki/')
    cy.visit('http://127.0.0.1:8000/wiki/Wisbech/')
    cy.contains('Edit').click() // clicks the Edit button
    // Logs in
    cy.get('input[name="username"]').type('admin')
    cy.get('input[name="password"]').type('password')
    cy.get('input[id="loginedit"]').click()
    // Types in some random text
    cy.get('textarea').type('typing in some random text. I encountered a bug while doing this, when it saved, the text from the test would be displayed on the actual wiki, so I made it so that it clears the text before displaying the text from before again. This text will be cleared after 7 seconds and it will be replaced with the original text.')
    cy.wait(7000) // Waits 7 seconds
    cy.get('textarea').clear() // Clears the text
    // Replaces the text that was just written with the original text
    cy.get('textarea').type('Wisbech is a Fenland market town, inland port and civil parish in the Fens of Cambridgeshire, England. It had a population of 31,573 in 2011. The town lies in the far north-east of the county, bordering Norfolk and only 5 miles (8 km) south of Lincolnshire. The tidal River Nene running through the town centre is spanned by two bridges. Before the Local Government Act 1972 came into force in 1974 Wisbech was a municipal borough.')
    cy.wait(3000) // Waits 3 seconds
    cy.contains('Save').click() // Clicks the Save button
  })
})

describe('Trying to access file upload without logging in', function () {
  it('This should fail, since the user is not logged in', function () {
    cy.visit('http://127.0.0.1:8000/wiki/upload/')
    cy.get('input[name="username"]').type('admin')
    cy.get('input[name="password"]').type('password')
    cy.get('input[id="loginedit"]').click()
    cy.contains('Monitor').click()
  })
})


