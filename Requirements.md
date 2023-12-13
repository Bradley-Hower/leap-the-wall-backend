# Sofware Requirements

## Vision

The goal of this project is to create a funcitonal search engine proxy which allows an English speaking user to use Baidu, the Chinese search engine, like they would any other search engine. This would include web, images, news, and videos.

When trying to search through a foreign language, it is incredibly difficult to accomplish any meaningful results as the process is extremely time consuming to cut and paste between the search results and translation software services. Directly using Google Translate does not work. There are some browser extensions that can translate text, but user experience is greatly lacking as images are not present, and the user still must translate keywords for the search query.

The great strength of this product is its ability to expand perspectives. It will allow users to have access to a large pool of data which was otherwise previously inaccessible to them. Furthermore, it will allow them to see differing, sometimes challenging, perspectives. The name, *Leap the Wall*, is visual phrasing of one's ability to leap over The Great Wall of China, and see the world from the other side.

## Scope

### In Scope

The scope of Leap the Wall will be focused on the following:

+ English Inputs
+ Translation of inputs to Chinese and submission to the Baidu API
+ Taking search result from Baidu API and translating them to English
+ Output of results as close to original as possible.
+ Caching and history for speed.

### Out of Scope

The following features will not be included in this build:

+ Search type must be selected from Leap the Wall.
+ No use of Baidu accounts
+ Functionality limited to Baidu search results. Will not work on a given website.

Translating limitations may not be of concern, as users might be able to translate subsequent sites via google translate.

## MVP

The product needs to be able to take English as a search query and display search results in English.

Adding history will be of lower priority. Additional language support will be of even lower priority.

## Functional Requirements

+ Users can use English as an input
+ Users can choose which search type
+ Users can log in.
+ Users can elect to save searches.
+ Users cna elect to delete searches.

## Non-functional Requirements

+ Results need to be obtained in a timely fashion. Any time over ten seconds becomes increasingly unacceptable.
+ Not logging in should not prevent users from using.
+ Searches need to be cleared from cache upon browser closeout.

