import request from 'supertest';
import chai from 'chai';
import app from '../../app';
import db from '../models';

const superRequest = request.agent(app);
const expect = chai.expect;

let locationResult1;
let locationItemResult1;
let locationResult2;
let locationItemResult2;

describe('LOCATION API', () => {
  try {
    before((done) => {
      db.Location.create({
        name: 'Apapa',
        noOfFemales: 20,
        noOfMales: 30,
      })
      .then((location1) => {
        setTimeout(() => {
          locationResult1 = location1.dataValues;
  
          db.LocationItem.create({
            name: 'Apapa Under',
            locationId: locationResult1.id,
            noOfFemales: 30,
            noOfMales: 30,
          })
          .then((locationItem1) => {
            setTimeout(() => {
              locationItemResult1 = locationItem1.dataValues;
  
              db.Location.create({
                name: 'Festac',
                noOfFemales: 20,
                noOfMales: 30,
              })
              .then((location2) => {
                setTimeout(() => {
                  locationResult2 = location2.dataValues;
  
  
                  db.LocationItem.create({
                    name: 'Festac Under',
                    locationId: locationResult2.id,
                    noOfFemales: 30,
                    noOfMales: 30,
                  })
                  .then((locationItem2) => {
                    setTimeout(() => {
                      locationItemResult2 = locationItem2.dataValues;
                      done()
                    }, 1500)
                  })
                }, 1500)
              })
            }, 1500)
          })
        }, 1500)
      })
      .catch(err => {
        console.log(err)
        done()
      })
    });
  } catch (e) {
    console.log(e)
  }
  
  try {
    after((done) => {
      db.Location.destroy({ where: { name: 'Apapa' } })
      .then(() => {
        db.Location.destroy({ where: { name: 'Festac' } })
        .then(() => {
          db.Location.destroy({ where: { name: 'America' } })
          .then(() => {
            db.Location.destroy({ where: { id: locationResult1.id, } })
            .then(() => {
              db.Location.destroy({ where: { id: locationResult2.id, } })
              .then(() => {
                db.Location.destroy({ where: { name: 'Updated name', } })
                .then(done())
              })
            })
          })
        })
      })
      .catch((error) => {
        console.log(error)
      })
    });
  } catch (e) {
    console.log(e)
  }
  
  describe('CREATE Location POST /api/location', () => {
  
    it('it should create a new location succesfully when relevant data is supplied', (done) => {
      superRequest.post('/api/locations')
      .set({ 'content-type': 'application/json' })
      .send({
        name: 'America',
        noOfFemales: 200,
        noOfMales: 300,
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('America');
        expect(res.body.noOfFemales).to.equal(200);
        expect(res.body.noOfMales).to.equal(300);
        expect(res.body.totalNumber).to.equal(res.body.noOfFemales + res.body.noOfMales);
        done();
      });
    });
  
  
    it('it should not create a new location when the name field is not supplied', (done) => {
      superRequest.post('/api/locations')
      .set({ 'content-type': 'application/json' })
      .send({
        // name: 'America',
        noOfFemales: 200,
        noOfMales: 300,
      })
      .end((err, res) => {
        let errorMessage, errorType;
        Object.keys(res.body.errors).forEach((key) => {
          errorMessage = res.body.errors[key].message;
          errorType = res.body.errors[key].type;
        })
        
        expect(res.status).to.equal(400);
        expect(res.body.name).to.equal('SequelizeValidationError');
        expect(errorMessage).to.equal('Location.name cannot be null');
        expect(errorType).to.equal('notNull Violation');
        done();
      });
    });
  
  
    it('it should not create a new location when the noOfFemales field is not supplied', (done) => {
      superRequest.post('/api/locations')
      .set({ 'content-type': 'application/json' })
      .send({
        name: 'America',
        // noOfFemales: 200,
        noOfMales: 300,
      })
      .end((err, res) => {
        let errorMessage, errorType;
        Object.keys(res.body.errors).forEach((key) => {
          errorMessage = res.body.errors[key].message;
          errorType = res.body.errors[key].type;
        })
      
        expect(res.status).to.equal(400);
        expect(res.body.name).to.equal('Form validation');
        expect(errorMessage).to.equal('Enter a valid no of females');
        done();
      });
    });
  
    it('it should not create a new location when the noOfMales field is not supplied', (done) => {
      superRequest.post('/api/locations')
      .set({ 'content-type': 'application/json' })
      .send({
        name: 'America',
        noOfFemales: 200,
        // noOfMales: 300,
      })
      .end((err, res) => {
        let errorMessage, errorType;
        Object.keys(res.body.errors).forEach((key) => {
          errorMessage = res.body.errors[key].message;
          errorType = res.body.errors[key].type;
        })
      
        expect(res.status).to.equal(400);
        expect(res.body.name).to.equal('Form validation');
        expect(errorMessage).to.equal('Enter a valid no of males');
        done();
      });
    });
  
    it('it should create a new nested location', (done) => {
      superRequest.post(`/api/locations/${locationResult1.id}/items`)
      .set({ 'content-type': 'application/json' })
      .send({
        name: 'Apapa Under',
        locationId: locationResult1.locationId,
        noOfFemales: 30,
        noOfMales: 30,
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.name).to.equal('Apapa Under');
        expect(res.body.locationId).to.equal(locationResult1.id);
        expect(res.body.noOfFemales).to.equal(30);
        expect(res.body.noOfMales).to.equal(30);
        expect(res.body.totalNumber).to.equal(res.body.noOfFemales + res.body.noOfMales);
        done();
      });
    });
  
    it('it should not create a new nested location when the parent id does not exist', (done) => {
      superRequest.post(`/api/locations/${500}/items`)
      .set({ 'content-type': 'application/json' })
      .send({
        name: 'Apapa Under',
        locationId: locationResult1.locationId,
        noOfFemales: 30,
        noOfMales: 30,
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.name).to.equal('SequelizeForeignKeyConstraintError');
        expect(res.body.parent.detail).to.equal('Key (locationId)=(500) is not present in table "Locations".');
        done();
      });
    });
  
    it('it should not create a new nested location when the name of location is not supplied', (done) => {
      superRequest.post(`/api/locations/${locationResult1.id}/items`)
      .set({ 'content-type': 'application/json' })
      .send({
        // name: 'Apapa Under',
        locationId: locationResult1.locationId,
        noOfFemales: 30,
        noOfMales: 30,
      })
      .end((err, res) => {
        let errorMessage, errorType;
        Object.keys(res.body.errors).forEach((key) => {
          errorMessage = res.body.errors[key].message;
          errorType = res.body.errors[key].type;
        })
        expect(res.status).to.equal(400);
        expect(res.body.name).to.equal('SequelizeValidationError');
        expect(errorMessage).to.equal('LocationItem.name cannot be null');
        expect(errorType).to.equal('notNull Violation');
        done();
      });
    });
  
    it('it should not create a new nested location when the name of location is not supplied', (done) => {
      superRequest.post(`/api/locations/${locationResult1.id}/items`)
      .set({ 'content-type': 'application/json' })
      .send({
        // name: 'Apapa Under',
        locationId: locationResult1.locationId,
        // noOfFemales: 30,
        noOfMales: 30,
      })
      .end((err, res) => {
        let errorMessage;
        Object.keys(res.body.errors).forEach((key) => {
          errorMessage = res.body.errors[key].message;
        })
        expect(res.status).to.equal(400);
        expect(res.body.name).to.equal('Form validation');
        expect(errorMessage).to.equal('Enter a valid no of females');
        done();
      });
    });
  
    it('it should not create a new nested location when the name of location is not supplied', (done) => {
      superRequest.post(`/api/locations/${locationResult1.id}/items`)
      .set({ 'content-type': 'application/json' })
      .send({
        // name: 'Apapa Under',
        locationId: locationResult1.locationId,
        noOfFemales: 30,
        // noOfMales: 30,
      })
      .end((err, res) => {
        let errorMessage;
        Object.keys(res.body.errors).forEach((key) => {
          errorMessage = res.body.errors[key].message;
        })
        expect(res.status).to.equal(400);
        expect(res.body.name).to.equal('Form validation');
        expect(errorMessage).to.equal('Enter a valid no of males');
        done();
      });
    });
    
  })
  
  describe('GET Location GET /api/location', () => {
    it('it should return all location successfully ', (done) => {
      superRequest.get(`/api/locations`)
      .set({ 'content-type': 'application/json' })
      .end((err, res) => {
        let responseID = [];
        let responseNoOfFemales = [];
        let responseNoOfMales = [];
        let responsetTotalNumber = [];
        Object.keys(res.body).forEach((key) => {
          responseID.push(res.body[key].id)
          responseNoOfFemales.push(res.body[key].noOfFemales)
          responseNoOfMales.push(res.body[key].noOfMales)
          responsetTotalNumber.push(res.body[key].totalNumber)
        })
        
        expect(res.status).to.equal(200);
        expect(responseID).to.include.members([parseInt(locationResult1.id)]);
        expect(responseNoOfFemales).to.include.members([parseInt(locationResult1.noOfFemales)]);
        expect(responseNoOfMales).to.include.members([parseInt(locationResult1.noOfMales)]);
        expect(responseID).to.include.members([parseInt(locationResult2.id)]);
        expect(responseNoOfFemales).to.include.members([parseInt(locationResult2.noOfFemales)]);
        expect(responseNoOfMales).to.include.members([parseInt(locationResult2.noOfMales)]);
        done();
      });
    });
    
    it('it should return a particular location successfully ', (done) => {
      superRequest.get(`/api/locations/${locationResult1.id}`)
      .set({ 'content-type': 'application/json' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(locationResult1.id);
        expect(res.body.name).to.equal(locationResult1.name);
        expect(res.body.noOfFemales).to.equal(locationResult1.noOfFemales);
        expect(res.body.noOfMales).to.equal(locationResult1.noOfMales);
        expect(res.body.noOfMales).to.equal(locationResult1.noOfMales);
        done();
      });
    });
  
    it('it should return a particular nested location successfully ', (done) => {
      superRequest.get(`/api/locations/${locationItemResult2.locationId}`)
      .set({ 'content-type': 'application/json' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(locationResult2.id);
        expect(res.body.name).to.equal(locationResult2.name);
        expect(res.body.noOfFemales).to.equal(locationResult1.noOfFemales);
        expect(res.body.noOfMales).to.equal(locationResult1.noOfMales);
        done();
      });
    });
    
    it('it should return a particular location successfully ', (done) => {
      superRequest.get(`/api/locations/${locationResult2.id}`)
      .set({ 'content-type': 'application/json' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(locationResult2.id);
        expect(res.body.name).to.equal(locationResult2.name);
        expect(res.body.noOfFemales).to.equal(locationResult2.noOfFemales);
        expect(res.body.noOfMales).to.equal(locationResult2.noOfMales);
        expect(res.body.noOfMales).to.equal(locationResult2.noOfMales);
        done();
      });
    });
    
    it('it should not return a particular location successfully if the id does not exist ', (done) => {
      superRequest.get(`/api/locations/${50000}`)
      .set({ 'content-type': 'application/json' })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Location Not Found');
        done();
      });
    });
  })
  
  describe('EDIT Location PUT /api/location', () => {
    
    it('it should be able to edit a location by id ', (done) => {
      superRequest.put(`/api/locations/${locationResult1.id}`)
      .set({ 'content-type': 'application/json' })
      .send({
        name: 'Updated name',
        noOfFemales: 20,
        noOfMales: 40,
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(locationResult1.id);
        expect(res.body.name).to.equal('Updated name');
        expect(res.body.noOfFemales).to.equal(20);
        expect(res.body.noOfMales).to.equal(40);
        expect(res.body.totalNumber).to.equal(20 + 40);
        done();
      });
    });
  
    it('it should be able to edit a nested location by parent id and nested location id ', (done) => {
      superRequest.put(`/api/locations/${locationResult1.id}/items/${locationItemResult1.id}`)
      .set({ 'content-type': 'application/json' })
      .send({
        name: 'Updated name under',
        noOfFemales: 30,
        noOfMales: 40,
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(locationItemResult1.id);
        expect(res.body.name).to.equal('Updated name under');
        expect(res.body.noOfFemales).to.equal(30);
        expect(res.body.noOfMales).to.equal(40);
        // expect(res.body.totalNumber).to.equal(30 + 40);
        done();
      });
    });
  
    it('it should not be able to edit a location by id when given wrong id ', (done) => {
      superRequest.put(`/api/locations/${20394}`)
      .set({ 'content-type': 'application/json' })
      .send({
        name: 'Updated name',
        noOfFemales: 20,
        noOfMales: 40,
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Location Not Found');
        done();
      });
    });
  
    it('it should not be able to edit a nested location by id when given wrong id ', (done) => {
      superRequest.put(`/api/locations/${locationResult1.id}/items/${43343}`)
      .set({ 'content-type': 'application/json' })
      .send({
        name: 'Updated name',
        noOfFemales: 20,
        noOfMales: 40,
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('LocationItem Not Found');
        done();
      });
    });
    
  })
  
  describe('DELETE Location DELETE a location', () => {
    it('it should delete a single location item successfully', (done) => {
      superRequest.delete(`/api/locations/${locationResult1.id}/items/${locationItemResult1.id}`)
      .set({ 'content-type': 'application/json' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('LocationItem deleted successfully.');
        done();
      });
    });
    
    it('it should delete a single location successfully', (done) => {
      superRequest.delete(`/api/locations/${locationResult1.id}`)
      .set({ 'content-type': 'application/json' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Location deleted successfully.');
        done();
      });
    });
  })
  
  
})
