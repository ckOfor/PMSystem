const Location = require('../models').Location;
const LocationItem = require('../models').LocationItem;

module.exports = {
  create(req, res) {
    return Location
    .create({
      title: req.body.title,
    })
    .then(location => res.status(200).send(location))
    .catch(error => res.status(400).send(error));
  },
  // list(req, res) {
  //   return Location
  //   .findAll()
  //   .then(location => res.status(200).send(location))
  //   .catch(error => {
  //     res.status(400).send(error)
  //   });
  // },
  list(req, res) {
    return Location
    .findAll({
      include: [{
        model: LocationItem,
        as: 'locationItems',
      }],
    })
    .then(location => res.status(200).send(location))
    .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Location
    .findById(req.params.locationId, {
      include: [{
        model: LocationItem,
        as: 'locationItems',
      }],
    })
    .then(location => {
      if (!location) {
        return res.status(404).send({
          message: 'Location Not Found',
        });
      }
      return res.status(200).send(location);
    })
    .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Location
    .findById(req.params.locationId, {
      include: [{
        model: LocationItem,
        as: 'locationItems',
      }],
    })
    .then(location => {
      if (!location) {
        return res.status(404).send({
          message: 'Location Not Found',
        });
      }
      return location
      .update({
        title: req.body.title || location.title,
      })
      .then(() => res.status(200).send(location))  // Send back the updated todo.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return Location
    .findById(req.params.locationId)
    .then(location => {
      if (!location) {
        return res.status(400).send({
          message: 'Location Not Found',
        });
      }
      return location
      .destroy()
      .then(() => res.status(200).send({ message: 'Location deleted successfully.' }))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
};
