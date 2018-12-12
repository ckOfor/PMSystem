const LocationItem = require('../models').LocationItem;
const helper = require('../helpers').helper;

module.exports = {
  create(req, res) {
    if(helper.validateFields(req, res)) {
      return LocationItem
      .create({
        name: req.body.name,
        locationId: req.params.locationId,
        noOfFemales: req.body.noOfFemales,
        noOfMales: req.body.noOfMales,
        totalNumber: parseInt(req.body.noOfFemales) + parseInt(req.body.noOfMales)
      })
      .then(locationItem => res.status(201).send(locationItem))
      .catch(error => {
        res.status(400).send(error)
      });
    }
  },
  update(req, res) {
    if(helper.validateFields(req, res)) {
      return LocationItem
      .findOne({
        where: {
          id: req.params.locationItemId,
          locationId: req.params.locationId,
        },
      })
      .then(locationItem => {
        if (!locationItem) {
          return res.status(404).send({
            message: 'LocationItem Not Found',
          });
        }
        return locationItem
        .update({
          name: req.body.name || locationItem.name,
          noOfFemales: req.body.noOfFemales || locationItem.noOfFemales,
          noOfMales: req.body.noOfMales || locationItem.noOfMales,
          totalNumber: parseInt(req.body.noOfFemales) + parseInt(req.body.noOfMales) || parseInt(locationItem.noOfFemales) + parseInt(locationItem.noOfMales)
        })
        .then(updatedLocationItem => res.status(200).send(updatedLocationItem))
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
    }
  },
  
  destroy(req, res) {
    return LocationItem
    .findOne({
      where: {
        id: req.params.locationItemId,
        locationId: req.params.locationId,
      },
    })
    .then(locationItem => {
      if (!locationItem) {
        return res.status(404).send({
          message: 'LocationItem Not Found',
        });
      }
      
      return locationItem
      .destroy()
      .then(() => res.status(200).send({ message: 'LocationItem deleted successfully.' }))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
};
