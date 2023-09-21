# Exotic Aquarium Fish Shop App 🐠

Welcome to our exotic aquarium fish shop application! This platform replicates real-world shopping experiences in a digital environment. It's a comprehensive online shopping portal that provides an interactive and seamless experience to users. From product discovery to checkout, the application ensures a smooth journey for the user, enhancing their engagement and boosting their purchasing confidence.

Users can browse through a vast range of aquarium fish, see detailed descriptions of each type, add their favorite to the basket, and proceed to checkout. It includes features such as user registration and login, search, categorization, and sorting to make the shopping experience more streamlined and convenient.

An important aspect of our application is that it's responsive 📲, ensuring it looks great on various devices with a minimum resolution of 390px. This feature makes the shopping experience enjoyable, irrespective of the device users prefer.

Key pages in the application include:

-   Login and Registration pages
-   Main page
-   Catalog Product page
-   Detailed Product page
-   User Profile page
-   Basket page
-   About Us page

The application is powered by CommerceTools, a leading provider of commerce solutions for B2C and B2B enterprises. CommerceTools offers a cloud-native, microservices-based commerce platform that enables brands to create unique and engaging digital commerce experiences.

## In our project we use:

1. Husky
2. Prettier
3. Jest
4. ESLint
5. Webpack
6. Axios

## To deploy an application to a local environment, you need:

1. copy repository

```Bash
  git clone https://github.com/Galiia-GR/eCommerce-application.git
```

2. install dependencies

```Bash
  npm install -D
```

3. run npm script

```Bash
  npm run comand-name
```

```json
  "scripts": {
    "test": "jest",
    "lint": "eslint . --ext .js,.ts && prettier --check . & tsc --noEmit",
    "lint:fix": "eslint . --ext .js,.ts && prettier --write .",
    "style": "sass --watch src/styles/style.scss src/styles/style.css",
    "build": "webpack build --node-env production",
    "dev": "webpack serve --open",
    "prepare": "husky install"
  }
```
