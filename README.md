# Travel Chum Documentation.

## Overview:
Travel Chum is a travel app that has the main function of helping users to plot a trip from an origin to a destination, then select stop off points in order to find places to visit at those stop offs.

This project has this front end app and also has a firebase database to store the data. You should note that any trips you save whilst logged in as our default guest user, will be viewable by anyone who loads the app, with this in mind, please try not to enter any sensitive data into the origin or destination fields.

### Tech Stack:
Javascript
React Native (Expo)
Google Firebase database
Google Firebase authentication
Google Maps and Places API

Link to project on GitHub: https://github.com/SteveRobinson99/fe-travel-chum

Minimum version of Node required to run locally: v20.6.1

### Instructions to run locally:

This project is made for android phones.

The simplest way to run the app is via your android phone.

To do this you will need to first install the "Expo Go" app on your android phone from the google play app store.

Open a terminal Navigate to the folder where you wish to install the project

Type the following commands: git clone https://github.com/SteveRobinson99/fe-travel-chum.git
npm install
npm run start
You should at this point see a QR code.
You need to open up "Expo Go" on your phone and then choose the option to scan the QR code (make sure the QR code is fully visible on your computer screen)

Here is a description of each of the app screens.

### Home:
When you first load the app will start at the home screen where you will see a welcome message, with some on screen instructions.

### My Trips:
This page allows a user to log on and see any saved trips they have along with the places they have chosen to visit.

Once logged in, you can choose to delete a trip by clicking "Delete Trip" or view a trip by choosing "View Trip".

Each trip has a trip name, the trip from and to locations as well as a timestamp of when the trip was created.

When you choose to View a trip, you will see the trip name, the origin of the trip, and the destination.  In between the origin and destination, you will see any places you have added to your trip with the name of the place and the location.

### Trip Planner:
Here a user can create a new trip or amend a trip they have currently saved.

An origin and destination autocomplete boxes should be populated along with the amount of stops you'd like on that journey.
The stops will approximately be evenly spaced throughout that trip and placed depending upon how many stops you have chosen.

The "View Trip Options" button can be pressed to open up an array of checkboxes which you can click to narrow down the types of activities or places you would like to visit.  Along the top of these options there are "Day trip", "Hotel" and "Camping", one of which needs to be chosen.

You will see an "Accessible" option is present, which will narrow down the places that can be visited to accessible locations.

Once you have chosen your trip options, you can press the "Hide Trip Options" button to give you more viewing space for your map and destinations (this is optional).

Now click "Start your Journey", a second click will zoom to the trip area.

At this point you will see some square icons along the route which represent your stop off points.

You may choose one of these points by pressing them, you might want to zoom into the area to see the suggested places that it presents you with. From here you can select places you would like to add to your itinerary.

Before saving, you must first make sure you are logged in on the "My Trips" tab, and then you must enter a name for your trip.

Once you have the trip name, you can then press the "Save Trip" button.

You can then proceed to add locations from other stopping points and may even return to the trip options to change them for your next stop. The suggested locations will be refreshed once the stop off point is selected again.

Once saved, you can see your saved trips on the "My Trips" tab, as long as you are logged in.

You may at this point return to the Trip Planner to add any more destinations, as long as the origin, destination and trip name are the same, you can amend a trip that you already have saved by selecting new places to visit and saving the trip again.

Next time you log in to the app, you should see your saved trips.