# Leap the Wall - Backend

Author: Bradley Hower

Codefellows Code 301 Final Project

Version: 1.0

![Frontend Repository](https://github.com/Bradley-Hower/leap-the-wall-frontend)

Good day. This project is created using the Serpapi Baidu API and the Google Translate API. It took quite some effort to get this working due to syntax parsing errors, json parsing errors, the confusing documentation by Google, and due to their bandwidth limitations. All issues were successfully resolved by sending each element as individual packets. This actually is a great advantage as it makes page loads much quicker and more responsive. Note, sometimes there are fetching synchrocy errors which can cause unexpected results. This is a great target for the next update. For the best results, use Chrome, as it will render images in their current format with no issues. 

Find at [leap-the-wall.netlify.com.](https://leap-the-wall.netlify.app/).

(Not currently running due to need to integrate Google CLI. Was able to get working with temporary key which only lasts one hour. Update in the works.)


## Presentation Slides

https://docs.google.com/presentation/d/1Tg3FLtJLmpOxLrb8FgmjtAPkoEF6uPut1o9QKtoSNCQ/edit?usp=sharing

## Wireframes

![Leap the Wall - Landing Page](https://github.com/Bradley-Hower/leap-the-wall-frontend/assets/139923955/003b9638-88d1-4e40-8b9a-5df40906dab6)

![Leap the Wall - Working Page](https://github.com/Bradley-Hower/leap-the-wall-frontend/assets/139923955/323e6017-7193-4ddc-99fb-cbca5155e1a6)

## User Stories and Kan Ban Board

https://trello.com/b/u4raS9Mc/leap-the-wall

## Domain Model and Schema

![Leap the Wall - Domain Model](https://github.com/Bradley-Hower/leap-the-wall-frontend/assets/139923955/ece427f7-0624-42f8-a3c4-0b59cfd6ccfc)

![Leap the Wall - Schema](https://github.com/Bradley-Hower/leap-the-wall-frontend/assets/139923955/a3a01ad9-469f-41bd-94cc-d47b81f55b11)

## Change Log

2023-12-12 - Started build for server. Built funtioning query translation with ChatGPT.

2023-12-13 - Functional Baidu API - concluded JSON output is best. Replaced ChatGPT with DeepL due to speed issues and cost.

2023-12-14 - Replaced DeepL with Google Cloud Translate API due to formatting deformation of DeepL.

2023-12-15 - Set up JSON packets and methods for testing frontend.

2023-12-17 - Identified issues with JSON parsing.

2023-12-18 - Fixed JSON parse issue - due to lingering punctuation post-translation.

2023-12-19 - Aborted using JSON parse submission to translate API. Used iteration through data arrays.

2023-12-20 - Built out MongoDB. Added some CSS styling. 

2023-12-21 - Auth0. Credit to Jacob Knaack for helping me resolve a critical issue with authentication. Cleaned up MongoDB code to use user emails.
