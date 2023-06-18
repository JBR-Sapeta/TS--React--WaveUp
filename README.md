# WaveUp - Social Media - REST API

Welcome to WaveUp, a social media application where you can connect with friends, share your thoughts, experiences and memories through posts.
This README file provides an overview of the application, its features, and instructions for getting started. This repository contains Frontend of WaveUp application, built using React.

## Project Overview

### Features
- **Internationalization**: application supports 2 languages - Polish and English.
- **User Registration**: Users can create an account on WaveUp by providing their accountname, email address, and password. Once registered, they can log in to their accounts.
- **Account Activation**: After registering, users are required to complete an email verification process.The user needs to click on the activation link sent to their email in order to verify and activate their account. 
- **Account Recovery**: When a user realizes they cannot access their account due to a forgotten password, they can initiate the account recovery process and set new password.
- **User Profile**: Each user has a profile that showcases their data and posts. Users can customize their profile by adding personal information and uploading a profile picture.
- **Post Creation**: Users can create posts to share their thoughts, ideas, or experiences. They can include text, images, or both in their posts.
- **Post Interactions - Comments**: Users can add comments to posts, allowing for discussions and conversations around specific topics.
- **Post Interactions - Likes**: Users can express their appreciation for posts by adding likes to them.
- **Search**: Users can search for other users using username, or account names.
- **Posts Listing and Pagination**: Users can scroll through the list of posts to explore content. Pagination divides posts into pages, displaying a specific number of posts per page. User can also filter posts based on date.
- **Hide/Show Posts**: If posts violate community guidelines administrators have the ability to hide them  from the public. Administrator can also delete them
- **Moderate Comments**: Administrators can moderate comments. Inappropriate or offensive comments can be changed, ensuring that discussions remain respectful and within the community guidelines.
- **Ban/Unban Users**: Administrators have the authority to ban or unban users from the platform. This feature allows them to address user behavior that violates the platform's policies. 

### Features



In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173/](http://localhost:5173/) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.


### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
