## Pogo 2 Go

- Deployed production site
- Browse list of all products
- Add products to a cart
- Check out
- Make payment with a credit card using Stripe
- Can be done as a guest or a logged-in user
- If you log out and log back in, your cart will still be populated
- Store users on a database table (username, password, cart contents, order history)
- Protect sensitive data from simple attacks (email, passwords, payment info, order history, API keys) - Use secrets.js for Stripe keys
- Users can't navigate to specific API routes in browser
- Users cannot directly send requests via Postman or curl
- Must use tests!

### Nice to have

- Filter products views
- Adding a new product - needs user control?

# Views

- All items
- Single Item (include form)
- Landing Page (About)
- Cart
- Checkout
- Login form
- Signup form
- Confirmation Page
- 404 page
- Profile / user page with purchase history

# User Stories

- A user can get information about our company
- A user can see products
- A user can select a product and see a detailed view
- A user can add products to the cart
- A user can sign-up
- A user can log-in
- A user can check-out
- A user can pay with a credit card
- A user can view their own profile / purchase history

# Schema Design
