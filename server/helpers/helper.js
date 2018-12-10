module.exports = {
  validateFields(req, res) {
    if(req.body.name === '' || /\d/.test(req.body.name)) {
      res.status(400).send({
        "name": "Form validation",
        "errors": [
          {
            "message": "Enter a valid location name",
          }
        ]
      })
    } else if(req.body.noOfFemales === '' || !/^[0-9]+$/.test(req.body.noOfFemales)) {
      res.status(400).send({
        "name": "Form validation",
        "errors": [
          {
            "message": "Enter a valid no of females",
          }
        ]
      })
    } else if(req.body.noOfMales === '' || !/^[0-9]+$/.test(req.body.noOfMales)) {
      res.status(400).send({
        "name": "Form validation",
        "errors": [
          {
            "message": "Enter a valid no of males",
          }
        ]
      })
    } else {
      return true
    }
    
  },
};
