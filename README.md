<h1 align="center">
  <br>Blockbuster Online
</h1>

<h4 align="center">A mockup of Blockbuster's website had they tried going digital in the 2000's</h4>

<br>
<p align="center">
  <a href="#about">About</a> •
  <a href="#usage">Usage</a> •
  <a href="#features">Features</a> •
  <a href="#screenshots">Screenchots</a>
</p>

---

## About

<table>
<tr>
<td>
  
**Blockbuster Online** is a simple HTML5 + JS site with a custom carousel element for displaying movie collections and a flexible search function with "infinite scroll". The site connects to <a href="https://www.themoviedb.org/">The Movie DataBase (TMDb)</a> through their API in order to power its search and discover functions.

This project was created for educational purposes at <a href="https://geekshubsacademy.com/">GeeksHubs Academy</a>'s Full Stack Developer Bootcamp by Federico Báez in Valencia, Spain on 2021-2-15 to 2021-2-17.

</td>
</tr>
</table>

## Usage

You may access the site directly from its <a href="https://fbgoode.github.io/blockbuster-online">GitHub Pages deployment</a>.

Alternatively, the project may be downloaded from <a href="https://github.com/fbgoode/spacex-royale/archive/main.zip">this link</a>. You're welcome to borrow my code.

The site consists of a single html file (<b>index.html</b>) and stylesheet (<b>style.css</b>), and 5 javascript files with the site's functions and logic:
* <b>moviedb.js</b>: Handles the connectivity with TMDb's API.
* <b>view.js</b>: Handles the dynamic changes on the view.
* <b>search.js</b>: Contains the search logic as well as the eventlisteners that trigger search events.
* <b>carousel.js</b>: Contains the functions for the custom carousels.
* <b>genres.js</b>: Handles filtering by genre - genre IDs, filter UI and logic.


<br>

## Features

* Custom carousels to display movies to discover
* Smart search function which predicts the user's intention
    * Leave search empty to discover films
    * Search by movie ID (ex. '101')
    * Search by title (ex. 'Titanic')
    * Search by movie cast (ex. 'Brad Pitt')
* Filter results by genre
* Responsive

<br>

## Screenshots
<p align="center">
<img src="img/screenshot-home.png" width=800><br>
<sub>Screenshot - Home page carousels (PC, Chrome v88)</sub>
</p>
<br>
<p align="center">
<img src="img/screenshot-search-mobile.png" width=300><br>
<sub>Screenshot - Search filters - Mobile dimensions (PC, Chrome v88)</sub>
</p>