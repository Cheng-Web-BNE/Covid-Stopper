# COVID Stopper

- [Introduction](#introduction)
- [Features](#features)
- [Get started](#get-started)

## Introduction

An Android application used to give people a variety of effective and vital help in an environment where COVID-19 is still spreading worldwide and has not been eliminated in Australia. The COVIDStopper has been developed by Dodo Lab to help keep the community safe from the sperad of cornonavirus.

COVIDStopper will securely note contact that you have with other users of the app. If you have been in close contact with someone who has tested positive to the virus, this will allow state and territory health officials to contact you.

## Features

### General user side
- Fetching the real time COVID-19 information
    - Worldwide
        - Sort by cases/today cases/deaths/recovered/active
    - Specific country
        - Includes approximately 190 countries
        - Search functionality
- Push authoritative and credible related news
    - Sources
        - Twitter - WHO
        - News & articles with keywords "Covid"/"Coronavirus"
- Professional self-test
- Quickly obtain the nearest test point
    - Categories
        - Swab kit test
        - Clinic test
        - Drive through test
- HealthCode
    - Encrypt user information (id, name, phone, email, address) with RC4
    - Generate a QR Code

### Commercial user side
- COVID-19 Info (same as the one in General User)
- News and Advices (same as the one in General User)
- HealthCode Scanner
    - Encrypt user information (id, name, phone, email, address) with RC4
    - Error handling ⇒ not going to be recorded
        - [x]  Not a QR Code
        - [x]  Not an RC4 encrypted message
        - [x]  User Info doesn't contain userId/phone/email
        - [x]  Cancel
- Customer Records
    - Records are separated by date
    - and are in descending order within the same day
    - Details are include user id, name, phone, email and address

## Get started

This project uses [Ionic](https://ionicframework.com/) with [React](https://reactjs.org/) and [npm](https://npmjs.com). Go check them out if you don't have them installed.

### Install Guild
Install the dependencies in the local node_modules folder first.
```sh
$ npm install
```

Make sure you are already installed [Node.js](https://nodejs.org/en/), then install the latest Ionic command-line tools in your terminal.
```sh
$ npm install @ionic/cli
```
### Run the app
Most of the ionic app can be built in the browser with ionic serve.
```sh
$ ionic serve
```

## License

[MIT](LICENSE) © Dodo Lab