# PMSystem


Population Management System that contains a list of locations and the total number of residents in each location broken down by gender.

Note: For learning purposes, you can follow the commit history of this repo.

To use the routes, visit PMS API
Features
* Users can create a location.
* Users can get a location.
* Users can get all locations.
* Users can edit a location.
* Users can delete a location.
* Users can nest a location in a particular location

Authorization: No authorization required

Endpoints
This is the link in which to access the api.

Below are the collection of routes.
```
 app.post('https://popmansystem.herokuapp.com/api/locations', locationsController.create);
  app.get('https://popmansystem.herokuapp.com/api/locations', locationsController.list);
  app.get('https://popmansystem.herokuapp.com/api/locations/:locationId', locationsController.retrieve);
  app.put('https://popmansystem.herokuapp.com/api/locations/:locationId', locationsController.update);
  app.delete('https://popmansystem.herokuapp.com/api/locations/:locationId', locationsController.destroy);
  
  app.post('https://popmansystem.herokuapp.com/api/locations/:locationId/items', locationsItemController.create);
  app.put('https://popmansystem.herokuapp.com/api/locations/:locationId/items/:locationItemId', locationsItemController.update);
  app.delete(
    'https://popmansystem.herokuapp.com/api/locations/:locationId/items/:locationItemId', locationsItemController.destroy
  );
  
  // For any other request method on todo location items, we're going to return "Method Not Allowed"
  app.all('https://popmansystem.herokuapp.com/api/location/:location/items', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
    }));
```

Technologies Used
* Node.js
* Express
* Sequelize
* Installation
* Clone the project repository.
* Run the command below to clone:
* git clone ```git@github.com:ckOfor/PMSystem.git.```

Change directory into the PMSystem directory.
Install all necessary packages in the package.json file. Depending on if you are using npm, you can use the command below:
npm install

#### Things to note
1. I have created an online database to help make things faster all you need to do is create a .env file and add 
```
NODE_ENV = production
DATABASE_URL=postgres://lnmjaelm:V81nGMtIMYi1HGtIW_VJGChI2e2eQOZP@pellefant.db.elephantsql.com:5432/lnmjaelm
```

2. type the following code on your command line
```
export DATABASE_URL=postgres://lnmjaelm:V81nGMtIMYi1HGtIW_VJGChI2e2eQOZP@pellefant.db.elephantsql.com:5432/lnmjaelm
```

3. Run sequelize migrate command below:
```
sequelize db:migrate
```

4. Run the command below to start the application locally:
```
npm run start:dev
```

Test the routes above on POSTMAN or any other application of choice
Contributing
Fork this repository to your account.
Clone your repository: git clone git@github.com:ckOfor/PMSystem.git.
Commit your changes: git commit -m "did something".
Push to the remote branch: git push origin new-feature.
Open a pull request.
Licence
ISC

Copyright (c) 2018 Chinedu Ofor
