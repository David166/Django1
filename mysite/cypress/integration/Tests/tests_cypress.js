// Visits the Wiki
describe('Visit Test', function () {
  it('Visits the wiki', function () {
    cy.visit('http://127.0.0.1:8000/wiki/') // Visits the Wiki
  })
})

// Logs in and logs out out
describe('Logout Test', function () {
  it('Logs in and logs out', function () {
    cy.wait(3000) // Waits 3 seconds
    cy.visit('http://127.0.0.1:8000/wiki/') // Visits the Wiki
    cy.contains('Login').click() // Clicks the Login button
    cy.url().should('include', '/accounts/login') // Should be on a new URL which includes '/accounts/login
    cy.get('input[name="username"]').type('admin') // Types in 'admin' as the username
    cy.get('input[name="password"]').type('password') // Types in the password
    cy.wait(3000)
    cy.get('input[id="loginedit"]').click() // Clicks the Login button
    cy.wait(3000)
    cy.contains('Logout').click() // Clicks the Logout button
  })
})

// Accesses all 3 pages
describe('Accesses all 3 pages without logging in', function () {
  it('Without logging in, it accesses all 3 pages', function () {
    cy.visit('http://127.0.0.1:8000/wiki/') // Visits the Wiki
    cy.contains('College of West Anglia').click() // Clicks the College of West Anglia page
    cy.wait(3000) // Waits 3 seconds
    cy.contains('Index').click() // Clicks the Index button
    cy.contains('Wisbech').click() // Clicks the Wisbech page
    cy.wait(3000)
    cy.contains('Index').click() 
    cy.contains('MarkdownTest').click() // Clicks MarkdownTest page
    cy.wait(3000)
    cy.contains('Index').click()    
  })
})


// Logs in, clicks File Upload, logs in, clicks the Monitor image.
describe('Clicks an image in the File Upload section', function () {
  it('Clicks File Upload, logs in and views the Monitor image', function () {
    cy.wait(3000) // Waits 3 seconds
    cy.visit('http://127.0.0.1:8000/wiki/') // Visits the Wiki
    cy.contains('File Upload').click() // Clicks the File Upload button
    cy.wait(3000)
    cy.get('input[name="username"]').type('admin') // Types in 'admin' in the username box
    cy.get('input[name="password"]').type('password') // Types in the password
    cy.wait(3000)
    cy.get('input[id="loginedit"]').click() // Clicks the Login button
    cy.wait(3000)
    cy.contains('Monitor').click() // Clicks the Monitor image
  })
})
 
// Opens a page, goes into the editor and saves it
describe('Opens a page, goes into the editor and saves it', function () {
  it('Opens up the Wisbech page, clicks the Edit button, logs in, clicks the Save button and goes back to the Homepage', function () {
    cy.wait(3000) // Waits 3 seconds
    // Visits the Wisbech page
    cy.visit('http://127.0.0.1:8000/wiki/')
    cy.visit('http://127.0.0.1:8000/wiki/Wisbech/')
    cy.contains('Edit').click() // clicks the Edit button
    // Logs in
    cy.get('input[name="username"]').type('admin')
    cy.get('input[name="password"]').type('password')
    cy.get('input[id="loginedit"]').click()
    // Types in some random text
    cy.get('textarea').type('typing in some random text. I encountered a bug while doing this, when it saved, the text from the test would be displayed on the actual wiki, so I made it so that it clears the text before displaying the text from before again. This text will be cleared after 10 seconds and it will be replaced with the original text.')
    cy.wait(10000) // Waits 10 seconds
    cy.get('textarea').clear() // Clears the text
    // Replaces the text that was just written with the original text
    cy.get('textarea').type('Wisbech is a Fenland market town, inland port and civil parish in the Fens of Cambridgeshire, England. It had a population of 31,573 in 2011. The town lies in the far north-east of the county, bordering Norfolk and only 5 miles (8 km) south of Lincolnshire. The tidal River Nene running through the town centre is spanned by two bridges. Before the Local Government Act 1972 came into force in 1974 Wisbech was a municipal borough.')
    cy.wait(3000)
    cy.contains('Save').click() // Clicks the Save button
    cy.contains('Homepage').click() // Goes back to the Homepage
  })
})

