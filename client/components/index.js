/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
// read the below as though it were...
// import {default as Navbar} from './navbar';
// ...which is like...
// import Navbar from './Navbar'
// export Navbar;
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {LandingPage} from './LandingPage'
// export {AllProducts} from './AllProducts'
