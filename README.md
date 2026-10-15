# Chapter & Scene

![Chapter & Scene on different screen sizes](docs/images/mockup.webp)

[LIVE SITE](https://chapter-and-scene.vercel.app)

Chapter & Scene is a shop for stories that exist both as a book and on screen. Every film and series in the shop is based on a book, so users can watch the adaptation, read the book it came from, or get both together at a lower price.

Films and series can be rented or bought, and books come as paperback, hardcover or e-book. Everything a user buys or rents ends up in their own library, where a trailer stands in for the film and e-books open in a Google Books preview.

Titles come from TMDb, books from Google Books and exchange rates from Frankfurter. Accounts, carts, orders and libraries are stored in Supabase. The app is built with React, Redux Toolkit and RTK Query.

## Table of Contents

- [UX](#ux)
  - [Site Purpose](#site-purpose)
  - [Site Goals](#site-goals)
  - [Audience](#audience)
  - [Communication](#communication)
  - [User Goals](#user-goals)
- [Agile Workflow](#agile-workflow)
  - [User Stories](#user-stories)
  - [MoSCoW Prioritisation](#moscow-prioritisation)
  - [Milestones](#milestones)
  - [Kanban Board](#kanban-board)
- [Design](#design)
  - [Wireframes](#wireframes)
  - [Database Schema](#database-schema)
  - [Colour Scheme](#colour-scheme)
  - [Typography](#typography)
  - [Logo](#logo)
- [Features](#features)
  - [Header and Footer](#header-and-footer)
  - [Home Page](#home-page)
  - [Movies and Series](#movies-and-series)
  - [Search](#search)
  - [Title Details](#title-details)
  - [Cart](#cart)
  - [Log In and Sign Up](#log-in-and-sign-up)
  - [Checkout and Order Confirmation](#checkout-and-order-confirmation)
  - [Order History](#order-history)
  - [My Library](#my-library)
  - [Not Found Pages](#not-found-pages)
- [Project Structure](#project-structure)
- [Data and APIs](#data-and-apis)
  - [APIs](#apis)
  - [Fetching Data with RTK Query](#fetching-data-with-rtk-query)
  - [State with Redux Toolkit](#state-with-redux-toolkit)
- [Testing](#testing)
  - [Manual Testing](#manual-testing)
  - [Lighthouse](#lighthouse)
  - [Validation](#validation)
  - [Solved Bugs](#solved-bugs)
  - [Unfixed Bugs](#unfixed-bugs)
- [Known Limitations](#known-limitations)
- [Future Improvements](#future-improvements)
  - [For Users](#for-users)
  - [Technical](#technical)
- [Technologies Used](#technologies-used)
  - [Languages](#languages)
  - [Frameworks and Libraries](#frameworks-and-libraries)
  - [Tools](#tools)
- [Deployment](#deployment)
  - [Deploying with Vercel](#deploying-with-vercel)
  - [Running the Project Locally](#running-the-project-locally)
- [Credits](#credits)
  - [Data and Media](#data-and-media)
  - [Documentation](#documentation)

## UX

Chapter & Scene is made for people who love a story enough to want it both on the page and on screen. This section covers the purpose of the shop, who it is for and what users should be able to do.

### Site Purpose

Many films and series are based on books, but the book and the adaptation are usually sold in different places. Chapter & Scene brings them together, so a user can find a story once and choose how to experience it: watch it, read it, or both.

### Site Goals

- Only show films and series that are based on a book.
- Show every way to get a story on one page, with clear prices for each format.
- Make buying simple, with a cart that works without an account and follows the user when they log in.
- Give users a library where they can use what they have bought or rented.

### Audience

- Readers who want to see the film or series of a book they love.
- Viewers who want to read the book behind something they have watched.
- People who enjoy having a story in more than one format.

### Communication

The design is dark and cinematic, inspired by streaming services, so the posters and backdrops are in focus. A carousel and themed rows on the home page invite the user to explore, and the header gives quick access to films, series, search and the cart on every page.

On a title's page, tabs separate the ways to get the story: watch it, read the book, or get both as a bundle. Prices are always in US dollars, with a conversion to the chosen currency next to them.

### User Goals

As a visitor, I want to:

- Browse films and series based on books, and filter them by category.
- Search for a title.
- See details about a film or series, and the book it is based on.
- Add films, series and books to my cart without an account.
- See prices in my own currency.

As a logged-in user, I also want to:

- Check out and see an order confirmation.
- See my order history and follow the delivery of physical books.
- Watch and read what I have bought or rented in my library.
- See how much time is left on a rental, and rent or buy a title again when it has expired.

[Back to top](#table-of-contents)

## Agile Workflow

The project was planned with user stories, written as GitHub issues in the format *"As a [user] I can [action], so I can [goal]"*. Each user story has acceptance criteria and tasks, and an ID from CS-001 to CS-048 that is also used in branch names and commit messages, for example `feature/CS-028-order-history`. Every change was made on its own branch and merged with a pull request.

All issues can be found [HERE](https://github.com/Linnea87/chapter-and-scene/issues?q=is%3Aissue).

### User Stories

The user stories are grouped into seven EPICs. All *Must Have*, *Should Have* and *Could Have* user stories are implemented, and the two *Won't Have* stories were left out on purpose. Open an EPIC to see its user stories.

#### Implemented User Stories

<details>
<summary>EPIC 1 - Catalog & search</summary>

<br>

- **CS-001** As a Visitor I can explore movies and series based on books, so I can discover stories I might want to read or watch.

- **CS-002** As a Visitor I can filter the catalog by category, so I can find stories in genres I like.

- **CS-003** As a Visitor I can search for a title, so I can quickly find a specific story.

- **CS-004** As a Visitor I can see that content is loading, so I can tell that the app is working.

- **CS-005** As a Visitor I can see a clear message when something goes wrong, so I can understand what happened and try again.

- **CS-006** As a Visitor I can choose to see movies, series or both, so I can find the format I am in the mood for.

- **CS-007** As a Visitor I can see a message when my search or filter has no results, so I can tell that the app is not broken.

- **CS-008** As a Visitor I can load more titles, so I can keep browsing beyond the first page.

- **CS-045** As a Visitor I can discover featured stories and themed rows on the home page, so I can find something to read or watch without searching.

- **CS-046** As a Visitor I can search for any movie or series title, so I can find out if it is based on a book, even if it is not shown in the catalog yet.

<br>

</details>

<details>
<summary>EPIC 2 - Title details</summary>

<br>

- **CS-010** As a Visitor I can see detailed information about a movie, so I can decide whether I want to watch it.

- **CS-011** As a Visitor I can see details about a series and its seasons, so I can choose what to buy.

- **CS-012** As a Visitor I can see the book a movie or series is based on, so I can choose to read the book, watch the adaptation or both.

- **CS-013** As a Visitor I can watch the trailer, so I can get a feel for the movie or series before buying.

- **CS-014** As a Visitor I can see a clear message when a title does not exist, so I can find my way back.

- **CS-015** As a Visitor I can see the other movies in the same movie series, so I can follow the whole story.

- **CS-047** As a Visitor I can switch between watching and reading options with tabs, so I can focus on one format at a time without a long page.

<br>

</details>

<details>
<summary>EPIC 3 - Cart</summary>

<br>

- **CS-016** As a Visitor I can add a movie, series or book to my cart in the format I choose, so I can buy it later.

- **CS-017** As a Visitor I can remove items from my cart, so I can only buy what I want.

- **CS-018** As a Visitor I can see how many items are in my cart, so I can always know what I have selected.

- **CS-019** As a Visitor I can keep my cart when I reload the page, so I can continue where I left off.

- **CS-020** As a Visitor I can change the quantity of physical books, so I can buy more than one copy.

- **CS-021** As a Visitor I can see subtotal, shipping and total, so I can know what I will pay.

- **CS-022** As a Visitor I can get a discount when I buy both the book and the movie or series, so I can get more for my money.

- **CS-044** As a Visitor I can choose to see prices in USD, SEK or GBP, so I can understand the prices in a currency I know.

<br>

</details>

<details>
<summary>EPIC 4 - Account</summary>

<br>

- **CS-023** As a Visitor I can create an account, log in and log out, so I can keep my purchases and library.

- **CS-024** As a Visitor I can keep my cart when I log in, so I can avoid adding everything again.

<br>

</details>

<details>
<summary>EPIC 5 - Checkout & orders</summary>

<br>

- **CS-026** As a User I can complete my purchase, so I can get access to what I bought.

- **CS-027** As a User I can see a confirmation after my purchase, so I can know that it went through.

- **CS-028** As a User I can see my previous orders, so I can keep track of what I have bought.

- **CS-029** As a User I can see the delivery status of my physical books, so I can know when they will arrive.

<br>

</details>

<details>
<summary>EPIC 6 - My library</summary>

<br>

- **CS-030** As a User I can see everything I have bought or rented digitally, so I can access it in one place.

- **CS-031** As a User I can see how long I have left on a rental, so I can watch it in time.

- **CS-032** As a User I can play a movie or series from my library, so I can watch what I have bought.

- **CS-033** As a User I can open an e-book from my library, so I can read what I have bought.

- **CS-034** As a User I can see when I already own a title, so I can avoid buying it twice.

- **CS-035** As a User I can find my expired rentals in one place, so I can easily buy or rent the movie again.

<br>

</details>

<details>
<summary>EPIC 7 - Setup & delivery</summary>

<br>

- **CS-036** As a Developer I can start from the Twinflower base structure, so I can spend my time on the new features.

- **CS-037** As a Developer I can manage the cart with Redux Toolkit, so I can share cart state across the whole app.

- **CS-038** As a Developer I can fetch data from TMDb through one service, so I can keep API logic out of the components.

- **CS-039** As a Developer I can fetch book data from Google Books through one service, so I can combine it with TMDb data.

- **CS-040** As a Developer I can store orders, cart and library in Supabase, so I can keep user data safe and available across devices.

- **CS-041** As a Developer I can credit the APIs I use, so I can follow their terms of use.

- **CS-042** As a Developer I can document the project, so I can show how it is built and how it works.

- **CS-043** As a Developer I can deploy the app, so I can share it through a link.

- **CS-048** As a Visitor I can browse a shop with a clear and inviting look, so I can enjoy finding stories to watch and read.

<br>

</details>

#### Not Implemented User Stories

<details>
<summary>EPIC 1 - Catalog & search</summary>

<br>

- **CS-009** As a Visitor I can sort the catalog, so I can see the most popular, newest or highest rated stories first. *The home page rows already show the newest, most popular and highest rated stories, each with a "See all" page, so a separate sort control was not needed.*

<br>

</details>

<details>
<summary>EPIC 4 - Account</summary>

<br>

- **CS-025** As a User I can reset my password, so I can get back into my account if I forget it. *Resetting a password needs emails to be sent, and Supabase's free email service only sends to the project's own team members.*

<br>

</details>

### MoSCoW Prioritisation

Each user story was labelled *Must Have*, *Should Have*, *Could Have* or *Won't Have*, so the most important features were built first.

| Priority | User stories |
| --- | --- |
| Must Have | 18 |
| Should Have | 15 |
| Could Have | 5 |
| Won't Have | 2 |

### Milestones

The work was planned in two milestones: **Week 1: Requirements**, with the catalog, title details and cart, and **Week 2: Accounts & library**, with accounts, checkout, orders and the library.

The milestones can be found [HERE](https://github.com/Linnea87/chapter-and-scene/milestones?state=closed).

### Kanban Board

A GitHub Projects board was used to follow each issue from backlog to done. It can be found [HERE](https://github.com/users/Linnea87/projects/18/views/1).

[Back to top](#table-of-contents)

## Design

The design was planned with wireframes and a database schema before the build, and then given a dark, cinematic look with a turquoise brand colour and a logo that joins the book and the film.

### Wireframes

Low-fidelity wireframes were made for the three main pages, the catalog, the title details and the cart, on mobile (375 px) and desktop (1440 px). They set the structure of the shop: the filters above the grid, the watch and read options on the title page, and the order summary next to the cart.

The final design changed in places as the project grew:

- The catalog became a home page with a carousel and themed rows, and separate Movies and Series pages replaced the Films/Series toggle.
- The header became a row of icons with the logo, and the search bar opens from a search icon.
- The Watch and Read options on the title page became tabs, with a third tab for the book and film bundle.

The final pages are shown under [Features](#features). Open the box below to see the wireframes.

<details>
<summary><strong>Wireframes</strong></summary>

![Wireframes for the catalog, title details and cart](docs/images/design/wireframes.png)

</details>

### Database Schema

Supabase stores everything that belongs to a user. Each table is linked to the user's account, and Row Level Security makes sure that users can only read and change their own rows. Titles and books are not stored, they are fetched from TMDb and Google Books with the `external_id`.

The plan changed during the project. Supabase's own `auth.users` table is used for accounts, so the planned `profiles` table was not needed, and new columns were added as features grew, for example `discount` on orders and `story_id` on cart items.

- **cart_items:** the cart of a logged-in user, so it is kept across devices. `key` makes each title and format unique in the cart, and `story_id` links a book to its film or series for the bundle discount.
- **orders:** one row per purchase, with the prices in US dollars and the shipping address for physical books.
- **order_items:** the titles in each order. `delivery_status` shows if a physical book is processing or shipped.
- **library_items:** everything a user has bought or rented digitally. `expires_at` is set for rentals and empty for titles that are bought.

The full schema with all policies is in [`supabase/schema.sql`](supabase/schema.sql). Open the boxes below to compare the first plan with the final database.

<details>
<summary><strong>The first plan of the database</strong></summary>

![The first plan of the database](docs/images/design/database-schema.png)

</details>

<br>

<details>
<summary><strong>The final database</strong></summary>

```mermaid
erDiagram
  USERS ||--o{ CART_ITEMS : has
  USERS ||--o{ ORDERS : places
  USERS ||--o{ LIBRARY_ITEMS : owns
  ORDERS ||--|{ ORDER_ITEMS : contains

  CART_ITEMS {
    uuid id PK
    uuid user_id FK
    text key
    text media_type
    text external_id
    text title
    text image_url
    text format
    text label
    numeric unit_price
    int quantity
    text story_id
  }

  ORDERS {
    uuid id PK
    uuid user_id FK
    numeric subtotal
    numeric shipping
    numeric discount
    numeric total
    text currency
    jsonb shipping_address
    timestamptz created_at
  }

  ORDER_ITEMS {
    uuid id PK
    uuid order_id FK
    uuid user_id FK
    text media_type
    text external_id
    text title
    text image_url
    text format
    text label
    numeric unit_price
    int quantity
    text delivery_status
  }

  LIBRARY_ITEMS {
    uuid id PK
    uuid user_id FK
    text media_type
    text external_id
    text title
    text image_url
    text format
    text label
    timestamptz expires_at
    timestamptz created_at
  }
```

</details>

### Colour Scheme

A dark theme lets the posters and backdrops stand out, like on a streaming service. Turquoise was chosen as the brand colour, as it is easy to read on the dark background and less common than the purple and red many streaming sites use.

![Colour palette](docs/images/design/colour-palette.png)

| Colour | Hex | Used for |
| --- | --- | --- |
| Background | `#0B1517` | The page |
| Surface | `#132326` | Cards, menus and the footer |
| Text | `#EEF6F6` | Headings and body text |
| Muted text | `#9DB3B5` | Secondary text |
| Turquoise | `#22C4C4` | The current page icon, badges and focus rings |
| Aqua | `#7CEFE6` | The end of the button gradient and success messages |

Buttons use a gradient from turquoise to aqua with dark text, which is easier to read than white text on turquoise. A soft turquoise glow at the top of every page ties the pages together.

### Typography

- **Headings:** Georgia, a serif that gives a bookish feel and matches the serif in the logo.
- **Body text:** the system font of the device (`system-ui`), which is easy to read and loads instantly.

### Logo

The logo is a film strip that rises out of an open book and forms an S, so the story goes from the page to the screen. The icon is used on its own in the header, as the favicon and as the app icon, and the full logo with the name is shown in the footer.

[Back to top](#table-of-contents)

## Features

Chapter & Scene is built mobile first and works on every screen size, from small phones to large desktops. Visitors can explore, search and fill their cart without an account, and a free account is needed to check out and use the library.

Each feature below has screenshots on mobile and desktop. Open a box to see them.

### Header and Footer

- The header is one row of icons on every screen size: the logo and the account menu on the left, Home, Movies and Series in the middle, and search and the cart on the right.
- The account menu shows *Log in* for guests and *My library*, *Order history* and *Log out* for logged-in users. The currency is chosen at the bottom of the menu.
- The search icon folds out a search bar under the icons.
- The cart icon shows how many items are in the cart.
- The footer shows the full logo, the main pages and the credits that TMDB and Google Books require.

<details>
<summary>Account menu for a guest</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/account-menu-mobile.webp" alt="The account menu for a guest on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/account-menu-desktop.webp" alt="The account menu for a guest on desktop" width="600"></td>
  </tr>
</table>

<br>

</details>

<details>
<summary>Account menu when logged in</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/account-menu-logged-in-mobile.webp" alt="The account menu for a logged-in user on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/account-menu-logged-in-desktop.webp" alt="The account menu for a logged-in user on desktop" width="600"></td>
  </tr>
</table>

<br>

</details>

<details>
<summary>Search bar</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/search-open-mobile.webp" alt="The search bar on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/search-open-desktop.webp" alt="The search bar on desktop" width="600"></td>
  </tr>
</table>

</details>

### Home Page

- A carousel shows the highest rated book adaptations. On touch screens the slides are swiped, with a mouse the arrows are used.
- Mobile shows the upright poster, larger screens the wide backdrop with the title.
- Themed rows, such as *Recently added* and *Popular right now*, each have a *See all* page with the full list.

<details>
<summary>Home page</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/home-mobile.webp" alt="The home page on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/home-desktop.webp" alt="The home page on desktop" width="600"></td>
  </tr>
</table>

</details>

### Movies and Series

- Movies and Series have their own pages, with the same layout.
- Genre chips filter the titles, for example *Drama*, *Romance* or *Fantasy & Sci-Fi*. The chosen genre is kept in the URL, so it stays after a reload and can be shared.
- Skeleton cards are shown while the titles load, and *Load more* fetches the next page.

<details>
<summary>Movies page</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/movies-mobile.webp" alt="The Movies page on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/movies-desktop.webp" alt="The Movies page on desktop" width="600"></td>
  </tr>
</table>

</details>

### Search

- The search finds both movies and series, and only shows titles that are based on a book.
- The search waits until the user stops typing, so a request is not sent for every letter.
- The heading shows what was searched for, and a message is shown when nothing is found, with a button to clear the search.

<details>
<summary>Search results</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/search-mobile.webp" alt="Search results on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/search-desktop.webp" alt="Search results on desktop" width="600"></td>
  </tr>
</table>

<br>

</details>

<details>
<summary>No results</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/search-empty-mobile.webp" alt="A search with no results on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/search-empty-desktop.webp" alt="A search with no results on desktop" width="600"></td>
  </tr>
</table>

</details>

### Title Details

- The backdrop sits behind the title, with the age rating, year, length, rating, genres, overview and a trailer button.
- Tabs separate the ways to get the story. The chosen tab is kept in the URL.
  - **Watch:** rent for 48 hours or buy the movie. Series are sold per season, or as the whole series with 20% off.
  - **Read the book:** the book from Google Books as paperback, hardcover or e-book.
  - **Movie + book / Series + book:** the story and the book together, with 15% off the book.
  - **More from:** the other movies in the same movie series, for example all the Dune movies.
- A title the user already owns shows *In your library* instead of the cart button, so it is not bought twice.
- The cast is shown at the bottom.

<details>
<summary>Watch</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/detail-watch-mobile.webp" alt="The Watch tab on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/detail-watch-desktop.webp" alt="The Watch tab on desktop" width="600"></td>
  </tr>
</table>

<br>

</details>

<details>
<summary>Read the book</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/detail-read-mobile.webp" alt="The Read the book tab on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/detail-read-desktop.webp" alt="The Read the book tab on desktop" width="600"></td>
  </tr>
</table>

<br>

</details>

<details>
<summary>Movie + book</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/detail-bundle-mobile.webp" alt="The Movie + book tab on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/detail-bundle-desktop.webp" alt="The Movie + book tab on desktop" width="600"></td>
  </tr>
</table>

<br>

</details>

<details>
<summary>More from</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/detail-more-mobile.webp" alt="The More from tab on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/detail-more-desktop.webp" alt="The More from tab on desktop" width="600"></td>
  </tr>
</table>

<br>

</details>

<details>
<summary>A series with seasons</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/detail-series-mobile.webp" alt="A series with seasons on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/detail-series-desktop.webp" alt="A series with seasons on desktop" width="600"></td>
  </tr>
</table>

<br>

</details>

<details>
<summary>In your library</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/in-your-library-mobile.webp" alt="A title that is already in the library on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/in-your-library-desktop.webp" alt="A title that is already in the library on desktop" width="600"></td>
  </tr>
</table>

</details>

### Cart

- Movies and series can only be in the cart once, while the quantity of physical books can be changed.
- The cart shows the subtotal, the bundle discount and shipping. Shipping is $4.99 for physical books, and free from $35.
- The cart works without an account and is kept in localStorage, so it stays after a reload. When the user logs in, it is merged with the cart saved on their account.
- Prices are always in US dollars, with a conversion to SEK or GBP next to them when another currency is chosen.

<details>
<summary>Cart</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/cart-mobile.webp" alt="The cart on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/cart-desktop.webp" alt="The cart on desktop" width="600"></td>
  </tr>
</table>

</details>

### Log In and Sign Up

- Users create an account with email and password, and log in to check out and see their library and orders.
- After logging in, the user is sent back to the page they came from.

<details>
<summary>Log in</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/login-mobile.webp" alt="The log in page on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/login-desktop.webp" alt="The log in page on desktop" width="600"></td>
  </tr>
</table>

<br>

</details>

<details>
<summary>Sign up</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/signup-mobile.webp" alt="The sign up page on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/signup-desktop.webp" alt="The sign up page on desktop" width="600"></td>
  </tr>
</table>

</details>

### Checkout and Order Confirmation

- The checkout shows the order with the total, and asks for a shipping address only when the order has physical books.
- The payment is simulated, no payment is taken and nothing is shipped.
- After the purchase, a confirmation shows the order number, and the digital titles are added to the user's library.

<details>
<summary>Checkout</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/checkout-mobile.webp" alt="The checkout on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/checkout-desktop.webp" alt="The checkout on desktop" width="600"></td>
  </tr>
</table>

<br>

</details>

<details>
<summary>Order confirmation</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/order-confirmation-mobile.webp" alt="The order confirmation on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/order-confirmation-desktop.webp" alt="The order confirmation on desktop" width="600"></td>
  </tr>
</table>

</details>

### Order History

- All orders are listed with the date, the number of items and the total.
- Physical books show their delivery status, *Processing* at first and *Shipped* after 24 hours.
- Each order can be opened to see what was bought.

<details>
<summary>Order history</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/order-history-mobile.webp" alt="The order history on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/order-history-desktop.webp" alt="The order history on desktop" width="600"></td>
  </tr>
</table>

<br>

</details>

<details>
<summary>Order details</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/order-details-mobile.webp" alt="The order details on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/order-details-desktop.webp" alt="The order details on desktop" width="600"></td>
  </tr>
</table>

</details>

### My Library

- Everything the user has bought or rented digitally is sorted into Movies, Series and E-books.
- Rentals show how many hours are left. *Play* opens the trailer, which stands in for the movie, and *Read* opens the Google Books preview.
- Expired rentals move to *History*, with a link to buy or rent the title again.

<details>
<summary>My library</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/library-mobile.webp" alt="My library on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/library-desktop.webp" alt="My library on desktop" width="600"></td>
  </tr>
</table>

</details>

### Not Found Pages

- A title that does not exist shows a message with a way back.
- Any other unknown address shows a 404 page with a link to the home page.

<details>
<summary>A title that does not exist</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/not-found-title-mobile.webp" alt="A title that does not exist on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/not-found-title-desktop.webp" alt="A title that does not exist on desktop" width="600"></td>
  </tr>
</table>

<br>

</details>

<details>
<summary>Page not found</summary>

<br>

<table>
  <tr>
    <td valign="top"><img src="docs/images/features/not-found-page-mobile.webp" alt="The 404 page on mobile" width="220"></td>
    <td valign="top"><img src="docs/images/features/not-found-page-desktop.webp" alt="The 404 page on desktop" width="600"></td>
  </tr>
</table>

</details>

<br>

[Back to top](#table-of-contents)

## Project Structure

The code is split into layers, so each part has one job. Services fetch the data, features hold the rules and the Redux state, hooks combine them for the components, and pages decide what is shown on each route.

```
src/
├── assets/        Logos used in the header and footer
├── components/    Reusable parts, grouped by area
│   ├── layout/    Header, footer, account menu, search bar and cart icon
│   ├── titles/    Title cards, grids, rows and results
│   ├── details/   The title page: hero, tabs, cast and movie series
│   ├── pricing/   Price rows, prices and the bundle offer
│   ├── cart/      Cart items, cart button and order summary
│   ├── ...        auth, books, checkout, home, library, orders, trailer
│   └── ui/        Buttons, forms, feedback, media and navigation shared by everything
├── features/      Redux slices, selectors, configuration and helpers per area,
│                  e.g. cart, currency, auth, pricing and explore
├── hooks/         Custom hooks, e.g. useExploreTitles, useCartSync and useDialog
├── pages/         One folder per route, e.g. HomePage, ExplorePage and CartPage
├── routes/        The router with all routes
├── services/      One RTK Query service per API: tmdb, googleBooks,
│                  frankfurter and supabase, plus localStorage helpers
├── store/         The Redux store, and saving the cart and currency
├── styles/        Global styles and the design tokens as CSS variables
└── utils/         Small functions, e.g. formatPrice, formatDate and pluralize
```

- **Components** are styled with CSS Modules, one `.module.css` file next to each component, and use the CSS variables in `variables.css` for colours, spacing and fonts.
- **Configuration** such as prices, rental time, shipping and the home page rows lives in config files in `features/`, so a rule is changed in one place instead of in the components.
- **Every file** starts with a short comment that explains what it does.

[Back to top](#table-of-contents)

## Data and APIs

Chapter & Scene combines four APIs into one shop. This section explains where the data comes from, how it is fetched and how the app keeps track of the cart, the currency and the logged-in user.

### APIs

| API | Used for |
| --- | --- |
| [TMDb](https://www.themoviedb.org/) | Movies and series: lists, search, details, cast, trailers, age ratings and movie series |
| [Google Books](https://developers.google.com/books) | The book behind each story, its cover, description and the e-book preview |
| [Frankfurter](https://frankfurter.dev/) | Exchange rates from US dollars to SEK and GBP |
| [Supabase](https://supabase.com/) | Accounts, the saved cart, orders and the library |

<br>

- **Only book adaptations:** TMDb has keywords such as *based on novel or book*. Every list is filtered on these keywords, and since TMDb's search cannot filter on keywords, each search result is checked one by one.
- **Prices:** TMDb and Google Books have no prices, so the shop sets its own. New releases cost more, a whole series is 20% off, and a bundle is 15% off the book.
- **Currency:** the shop charges in US dollars. When another currency is chosen, the converted price is shown next to the price in dollars.

### Fetching Data with RTK Query

Each API has its own RTK Query service in `src/services/`. RTK Query gives every request a loading and error state, caches the answers and fetches them again only when needed.

- **TMDb** uses an infinite query for *Load more*, and maps every answer to the app's own shape, so components never see the raw data.
- **Google Books** tries a failed request again up to two times, since the API sometimes answers with a temporary error.
- **Frankfurter** keeps the rates in the cache for an hour, since they only change once a day.
- **Supabase** is called through its own client instead of a URL, so its service uses `fakeBaseQuery`. Tags make the library and order history fetch again automatically after a purchase.

### State with Redux Toolkit

Redux Toolkit holds the state that many parts of the app need:

- **cart:** the items in the cart, read through selectors that also work out the subtotal, discount, shipping and total.
- **currency:** the chosen currency.
- **auth:** the logged-in user.

The cart and the currency are saved in localStorage when they change, and loaded again when the app starts, so they are kept after a reload. When a user is logged in, the cart is also saved in Supabase, so it follows them to other devices.

[Back to top](#table-of-contents)

## Testing

Every feature was tested by hand on the live site, and the site was checked with Lighthouse and ESLint.

### Manual Testing

The tests were made on an iPhone in Safari and as a home screen app, and on a MacBook in Chrome and Safari. Chrome DevTools was used for other screen sizes, down to 320 px. Open the box below to see the tests.

<details>
<summary>Manual tests</summary>

<br>

| Feature | Test | Result |
| --- | --- | --- |
| Home page | The carousel can be swiped on mobile and changed with the arrows on desktop | ✅ |
| Home page | *See all* opens the full list for a row | ✅ |
| Movies and Series | A genre chip filters the titles and is kept in the URL after a reload | ✅ |
| Movies and Series | *Load more* adds the next page without moving the titles already shown | ✅ |
| Search | A search shows only book adaptations, and *Results for* shows the search term | ✅ |
| Search | A search with no results shows a message, and *Clear search and filters* leads to *All stories* | ✅ |
| Title details | The tabs switch between Watch, Read the book, Movie + book and More from, and the chosen tab is kept in the URL | ✅ |
| Title details | A series shows a price per season and for the whole series | ✅ |
| Title details | A title the user owns shows *In your library* instead of the cart button | ✅ |
| Cart | Adding a title updates the count in the header | ✅ |
| Cart | The quantity can only be changed for physical books | ✅ |
| Cart | Renting and buying the same movie asks which one to keep | ✅ |
| Cart | A book with its movie in the cart gives the bundle discount | ✅ |
| Cart | Shipping is free from $35 | ✅ |
| Cart | The cart is kept after a reload | ✅ |
| Currency | Choosing SEK or GBP shows a converted price next to the dollar price | ✅ |
| Account | Sign up, log in and log out work, and the user is sent back to the page they came from | ✅ |
| Account | A guest cart is merged with the saved cart when logging in | ✅ |
| Account | Checkout, orders and the library send a guest to the log in page | ✅ |
| Checkout | The shipping address is only asked for when the order has physical books | ✅ |
| Checkout | A purchase shows a confirmation and adds digital titles to the library | ✅ |
| Order history | Physical books show *Processing*, then *Shipped* after 24 hours | ✅ |
| Library | Rentals show the hours left, and expired rentals move to *History* | ✅ |
| Library | *Play* opens the trailer and *Read* opens the Google Books preview | ✅ |
| Errors | An unknown title and an unknown address show a not found page | ✅ |
| Errors | A failed request shows a message with *Try again* | ✅ |
| Accessibility | All pages can be used with the keyboard, and dialogs keep the focus inside | ✅ |

</details>

### Lighthouse

The live site was tested with Lighthouse in Chrome. The Performance score on mobile varies a little between runs, between 79 and 83.

| | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Mobile | 83 | 100 | 100 | 100 |
| Desktop | 96 | 100 | 100 | 100 |

Lighthouse first gave Performance 56 and SEO 83 on mobile. A meta description and a `robots.txt` raised SEO to 100. Keeping the space for the carousel while it loads stopped the page from jumping, and connecting early to the TMDb image server made the first image load sooner.

The rest of the mobile score comes from the carousel image, which is only known after the app has loaded and TMDb has answered. Fixing that would need server-side rendering. Open the box below to see the reports.

<details>
<summary>Lighthouse reports</summary>

<br>

**Mobile**

![Lighthouse scores on mobile](docs/images/testing/lighthouse-mobile.webp)

**Desktop**

![Lighthouse scores on desktop](docs/images/testing/lighthouse-desktop.webp)

</details>

### Validation

- **ESLint:** `npm run lint` checks the whole project for errors and unused code, and passes without warnings.
- **Build:** `npm run build` builds the app without errors.

### Solved Bugs

These bugs were found during testing and have been fixed:

- The page did not scroll to the top when a *See all* page was opened. Fixed with React Router's `ScrollRestoration`.
- Switching tabs on the title page scrolled the page to the top. Fixed with `preventScrollReset` when the tab changes.
- The home page rows jumped down when the carousel loaded. Fixed by showing a placeholder with the same size while it loads.
- The wide carousel image cut off heads in some backdrops. Fixed by cropping from the upper part of the image.
- Buttons inside dialogs showed a focus ring after a tap on iPhone. Fixed by giving the dialog itself the focus when it opens.
- The *Explore stories* links led to the search page instead of the home page after the header changed. Fixed by linking to the home page.

### Unfixed Bugs

No known bugs.

[Back to top](#table-of-contents)

## Known Limitations

Chapter & Scene is a demo shop, so some parts are simulated or depend on what the APIs allow.

- **Payment and delivery are simulated.** No payment is taken and nothing is shipped. Physical books change from *Processing* to *Shipped* after 24 hours.
- **A trailer stands in for the movie.** *Play* in the library opens the trailer from TMDb, since the shop has no real films to stream.
- **Google Books limits the previews.** Some books have no preview, and Google limits how many preview pages one network can read of a book, so *Read* can show a short preview or open Google's own reader instead.
- **Only titles with the right keywords are shown.** The shop relies on TMDb's keywords to find book adaptations, so an adaptation that is missing those keywords on TMDb does not appear.
- **Prices are always charged in US dollars.** SEK and GBP are only shown as a conversion next to the dollar price.
- **No email from the app.** Email confirmation is turned off in Supabase and password reset is not available, since Supabase's free email service only sends to the project's own team members.
- **Trailers do not start with sound on iPhone.** Safari on iOS does not autoplay embedded YouTube videos with sound, so the user taps play.
- **The first load on mobile is slower than on desktop.** The carousel image is only known after the app has loaded and TMDb has answered, which keeps the Lighthouse Performance score on mobile around 80.

[Back to top](#table-of-contents)

## Future Improvements

The shop covers everything that was planned, but there are ideas for where it could go next, both for the users and in how the app is built.

### For Users

- **Password reset and email confirmation** with an email provider, such as Resend, connected to Supabase.
- **The user's name in the account menu**, saved when the account is created.
- **Removing expired rentals** from the library.
- **A wish list**, so users can save stories they want to watch or read later.
- **More currencies**, such as euro, next to USD, SEK and GBP.
- **The site in the user's own language**, chosen from the browser's language setting, for example Swedish.

### Technical

- **Code splitting** with `React.lazy`. It was tested, and it removed the build's chunk size warning, but it only made the first load about 10 KB smaller, since most of the code is libraries that every page needs.
- **Server-side rendering**, so the carousel image is in the first HTML and the page loads faster on mobile.
- **A brand font for the headings**, such as Playfair Display, to match the logo even more.

[Back to top](#table-of-contents)

## Technologies Used

The app is a React single-page app built with Vite, with Redux Toolkit for the state and Supabase as the backend.

### Languages

- **JavaScript** with React and JSX
- **HTML**
- **CSS** with CSS Modules and CSS variables

### Frameworks and Libraries

- [React](https://react.dev/): the user interface
- [React Router](https://reactrouter.com/): the pages, links and URL parameters
- [Redux Toolkit](https://redux-toolkit.js.org/) and [React Redux](https://react-redux.js.org/): the global state, and RTK Query for fetching data
- [Supabase JS](https://supabase.com/docs/reference/javascript/introduction): accounts and the database
- [Lucide React](https://lucide.dev/): the icons

### Tools

- [Vite](https://vite.dev/): the development server and the build
- [ESLint](https://eslint.org/): checking the code
- [Git](https://git-scm.com/) and [GitHub](https://github.com/): version control, issues, milestones, the Kanban board and pull requests
- [Vercel](https://vercel.com/): hosting the live site
- [Chrome DevTools](https://developer.chrome.com/docs/devtools) and [Lighthouse](https://developer.chrome.com/docs/lighthouse): testing on different screen sizes, performance and accessibility
- [Coolors](https://coolors.co/): the colour palette

[Back to top](#table-of-contents)

## Deployment

The live site is hosted on Vercel and is built from the `main` branch.

### Deploying with Vercel

1. Log in to [Vercel](https://vercel.com/) with GitHub and choose **Add New → Project**.
2. Import the `chapter-and-scene` repository. Vercel finds the Vite settings on its own.
3. Add the environment variables from [Running the Project Locally](#running-the-project-locally) under **Environment Variables**.
4. Click **Deploy**.

Every merge to `main` deploys the site again, and every pull request gets its own preview link. The file `vercel.json` sends every address to `index.html`, so React Router can show the right page when a link is opened or a page is reloaded.

### Running the Project Locally

You need [Node.js](https://nodejs.org/) and free accounts on [TMDb](https://www.themoviedb.org/) and [Supabase](https://supabase.com/).

1. Clone the repository and install the packages:

   ```bash
   git clone https://github.com/Linnea87/chapter-and-scene.git
   cd chapter-and-scene
   npm install
   ```

2. Copy `.env.example` to `.env` and add your own keys:

   | Variable | Where to find it |
   | --- | --- |
   | `VITE_TMDB_TOKEN` | TMDb → Settings → API → API Read Access Token |
   | `VITE_GOOGLE_BOOKS_KEY` | Optional. Google Cloud Console, with the Books API turned on |
   | `VITE_SUPABASE_URL` | Supabase → Project Settings → API |
   | `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase → Project Settings → API |

3. Create the tables by running [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL Editor.

4. Start the development server:

   ```bash
   npm run dev
   ```

Other scripts:

- `npm run build` builds the app for production.
- `npm run preview` shows the production build locally.
- `npm run lint` checks the code with ESLint.

[Back to top](#table-of-contents)

## Credits

### Data and Media

- [TMDb](https://www.themoviedb.org/): film and series data, posters, backdrops, cast photos, and trailers from YouTube. This product uses the TMDB API but is not endorsed or certified by TMDB.
- [Google Books](https://books.google.com/): book data, covers and previews.
- [Frankfurter](https://frankfurter.dev/): exchange rates.
- [Lucide](https://lucide.dev/): icons.
- [Canva](https://www.canva.com/): the logo, which I generated with Canva and then cropped and adjusted for the site.

### Documentation

- [React](https://react.dev/), [React Router](https://reactrouter.com/), [Redux Toolkit](https://redux-toolkit.js.org/) and [Supabase](https://supabase.com/docs): how the libraries are used.
- [MDN Web Docs](https://developer.mozilla.org/): HTML, CSS and JavaScript, for example the native `<dialog>` element.

[Back to top](#table-of-contents)
