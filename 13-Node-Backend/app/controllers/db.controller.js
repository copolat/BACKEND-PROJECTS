const Customer = require('../models/customer.model');



exports.create = (req, res) => {
  // Validate request
  console.log(req.body)
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Collection
  const customer = new Customer ({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        city:req.body.city,
        country:req.body.country,
        itemsSold:req.body.itemsSold,
        jobProfile: req.body.jobProfile,
        additionalInfo: req.body.additionalInfo,
        isActive: req.body.isActive
  });
  // Save Customer in the database
  customer
    .save(customer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    });
};


exports.findAll = (req, res) => {
  console.log('findAll works')
  const name = req.query.name;
  let condition = name? {name: {$regex: new RegExp(storeLocation), $options: "i"}} : {};

  Customer.find(condition)
  .then(data => {
          res.send(data);
  })
  .catch(err => {
          res.status(500).send({
                  message: err.message || "Some error occurred while retrieving customers."
  });
  });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Customer.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Customer with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Customer with id=" + id });
    });
};



exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  Customer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Customer with id=${id}. Customer was not found!`
        });
      } else res.send({ message: " Customer was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Customer with id=" + id });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  Customer.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Customer with id=${id}. Customer was not found!`
        });
      } else {
        res.send({ message: " Customer was deleted successfully!"});
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete Customer with id=" + id});
    });
};



exports.deleteAll = (req, res) => {
  Customer.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Customers were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all customers."
      });
    });
};

