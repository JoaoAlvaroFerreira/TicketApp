## Tech Stack

* React for Front-End with Boostrap.
* Python with Flask for Back-End.
* MongoDB as the database, implemented with PyMongo.

Project developed as a prototype in around 4h

## Features Implemented

* Customers can access a ticket form and submit in it. Part of this form is customer identification via valid email address, name and affiliation.
* The customer ticket form allows customers to specify a product (from a predefined list of the company's products) and severity, and describing the problem.
* Employees of the company can log in and view reported issues by product.
* Employees can edit individual issues: modify product or severity, or assign an issue to a specific employee.

This is all implemented in a SPA, which displays the customer form by default and the developer panel with the existing tickets if the user (a member of the company) is authenticated.

## How to Run

* Requirements: Pyton 3.12, PIP, Node.js and NPM installed
* First run ticket-back-end/setup.sh. It will install the needed requirements and start the back-end. After running setup.sh for the first time, running start.sh is enough.
* Then run ticket-front-end/ticket-app/setup.sh. It will populate the database and start the frontend deployment environment. 

After running setup.sh (keeping both terminals open), the deployment should be available on http://localhost:3000/

User accounts:
 e-mail    | password |
| -------- | ------- |
| johnsmith@test.com  | johnsmith    |
| janedoe@example.com | janedoe     |
| jonathan.good@test.com    | jonathangood    |


## Security Concerns

* This implementation does not include a full authentication system that allows for proper user creation, editing user settings, password recovery, among other essential user authentication procedures. It should include all of those both for team members and for clients (which currently do not have any authentication, they can only submit their personal info alongside their tickets)
* Due to the lack of a full authentication suite, non-members of the company that want to enter the system can do it if they access the browser cache and change their localStorage values. This should be accounted for by ensuring that the "isLoggedIn" value is obtained by verifying with the back-end on every page reload, storing a unique session hash in the browser. Ideally, this should all be done through a third party authentication system, which would take longer to implement but be more effective and secure.
