const LocationItem = require('../models').LocationItem;

module.exports = {
  create(req, res) {
    return LocationItem
    .create({
      content: req.body.content,
      locationId: req.params.locationId,
    })
    .then(locationItem => res.status(201).send(locationItem))
    .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return LocationItem
    .find({
      where: {
        id: req.params.locationItemId,
        todoId: req.params.todoId,
      },
    })
    .then(locationItem => {
      if (!locationItem) {
        return res.status(404).send({
          message: 'TodoItem Not Found',
        });
      }
      
      return locationItem
      .update({
        content: req.body.content || locationItem.content,
        complete: req.body.complete || locationItem.complete,
      })
      .then(updatedLocationItem => res.status(200).send(updatedLocationItem))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
  
  destroy(req, res) {
    return LocationItem
    .find({
      where: {
        id: req.params.locationItemId,
        todoId: req.params.todoId,
      },
    })
    .then(locationItem => {
      if (!locationItem) {
        return res.status(404).send({
          message: 'TodoItem Not Found',
        });
      }
      
      return locationItem
      .destroy()
      .then(() => res.status(204).send())
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
};
