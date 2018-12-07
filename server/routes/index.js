const locationsController = require('../controllers').locations;
const locationsItemController = require('../controllers').locationItems;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Locations API!',
  }));
  
  app.post('/api/locations', locationsController.create);
  app.get('/api/locations', locationsController.list);
  app.get('/api/locations/:locationId', locationsController.retrieve);
  app.put('/api/locations/:locationId', locationsController.update);
  app.delete('/api/locations/:locationId', locationsController.destroy);
  
  app.post('/api/locations/:locationId/items', locationsItemController.create);
  app.put('/api/locations/:locationId/items/:locationId', locationsItemController.update);
  app.delete(
    '/api/locations/:locationId/items/:locationId', locationsItemController.destroy
  );
  
  // For any other request method on todo location items, we're going to return "Method Not Allowed"
  app.all('/api/location/:location/items', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
    }));
};
