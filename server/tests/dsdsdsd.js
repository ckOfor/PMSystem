import request from 'supertest';
import chai from 'chai';
import app from '../../app';
import db from '../models';

const express = require('express');
const app = express();

// const superRequest = request.agent(app);
const expect = chai.expect;

let locationResult1;
let locationItemResult1;
let locationResult2;
let locationItemResult2;

describe('LOCATION API', () => {
  
  before((done) => {
    db.Location.create({
      name: 'Apapa',
      noOfFemales: 20,
      noOfMales: 30,
    })
    .then((resultLocation) => {
      locationResult1 = resultLocation.dataValues
  
      db.LocationItem.create({
        locationId: locationResult1.id,
        name: 'Apapa undercover',
        noOfFemales: 30,
        noOfMales: 33,
      })
      
      .then((resultLocationItem) => {
        locationItemResult1 = resultLocationItem.dataValues;
  
        db.Location.create({
          name: 'Victoria Island',
          noOfFemales: 10,
          noOfMales: 150,
        })
        .then((resultLocation2) => {
          locationResult2 = resultLocation2.dataValues;
  
          db.LocationItem.create({
            locationId: locationResult2.id,
            name: 'Victoria Island undercover',
            noOfFemales: 40,
            noOfMales: 33,
          })
          .then((locationItemResult2) => {
            locationItemResult2 = locationItemResult2.dataValues;
            done();
          });
        });
      });
    });
    done();
  });
  
  after((done) => {
    db.LocationItem.destroy({
      where: {}
    })
    .then(() => {
      db.Location.destroy({ where: {} })
      .then(done());
    })
    done();
  });
  
  
  describe('CREATE Location POST /api/locations', () => {
    it('it should create a new location successfully with given location details', (done) => {
      this.timeout(500);
      setTimeout(done, 300);
      superRequest.post('/api/locations')
      .set({ 'content-type': 'application/json' })
      .send({
        name: 'America',
        noOfFemales: 30,
        noOfMales: 10
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message).to
        .equal('Location successfully created');
        expect(res.body.data.location.name).to.equal('America');
        expect(res.body.data.location.noOfFemales).to.equal(30);
        expect(res.body.data.location.noOfMales).to.equal(40);
        expect(res.body.data.location.totalNumber).to.equal(10);
      });
    });
  
    it('it should not create a new location when the name field is not supplied', (done) => {
      superRequest.post('/api/locations')
      .set({ 'content-type': 'application/json' })
      .send({
        noOfFemales: 3000,
        noOfMales: 10000
      })
      .end((err, res) => {
        let errorMessage;
        // console.log(res.body.name, 'GOT HERE!!!')
        Object.keys(res.body.errors).forEach((key) => {
          // console.log(res.body.errors)
          errorMessage = res.body.errors[key].message;
          // console.log(res.body.errors[key])
        })
        // console.log(errorMessage)
        expect(res.status).to.equal(400);
        expect(res.body.name).to.equal('SequelizeValidationError');
        expect(errorMessage).to.equal('Location.name cannot be null');
        done();
      });
    });
  
    it('it should not create a new location when the no of female field is not supplied', (done) => {
      superRequest.post('/api/locations')
      .set({ 'content-type': 'application/json' })
      .send({
        name: 'America',
        // noOfFemales: 3000,
        noOfMales: 10000
      })
      .end((err, res) => {
        let errorMessage;
        // console.log(res.body.name, 'GOT HERE!!!')
        Object.keys(res.body.errors).forEach((key) => {
          // console.log(res.body.errors)
          errorMessage = res.body.errors[key].message;
          // console.log(res.body.errors[key])
        })
        // console.log(errorMessage)
        expect(res.status).to.equal(400);
        expect(res.body.name).to.equal('Form validation');
        expect(errorMessage).to.equal('Enter a valid no of females');
        done();
      });
    });
  
    it('it should not create a new location when the no of female field is not supplied', (done) => {
      superRequest.post('/api/locations')
      .set({ 'content-type': 'application/json' })
      .send({
        name: 'America',
        noOfFemales: 3000,
      })
      .end((err, res) => {
        let errorMessage;
        // console.log(res.body.name, 'GOT HERE!!!')
        Object.keys(res.body.errors).forEach((key) => {
          // console.log(res.body.errors)
          errorMessage = res.body.errors[key].message;
          // console.log(res.body.errors[key])
        })
        // console.log(errorMessage)
        expect(res.status).to.equal(400);
        expect(res.body.name).to.equal('Form validation');
        expect(errorMessage).to.equal('Enter a valid no of males');
        done();
      });
    });
  })
  
  describe('GET Location GET /api/locations', () => {
    
    it('it should get all locations successfully', (done) => {
      // superRequest.get('a/api/locations')
      // .set({ 'content-type': 'application/json' })
      // .end((err, res) => {
      // });
      // done();
      superRequest.get('/api/locations/')
        // .set({ 'content-type': 'application/json' })
        .end((err, res) => {
          expect('Content-Type', /json/)
          console.log(res)
        })
      done();
    });
  
    // it('it should get a location when the locationId is valid', (done) => {
    //   superRequest.get(`/api/locations`)
    //   .set({ 'content-type': 'application/json' })
    //   .end((err, res) => {
    //     console.log(res.body)
    //     expect(res.status).to.equal(200);
    //     expect(res.body.status).to.equal('success');
    //     expect(res.body.data.message).to
    //     .equal('Location successfully retrieved');
    //     expect(res.body.data.location.name).to.equal(locationItemResult1.name);
    //     expect(res.body.data.location.noOfFemales).to.equal(locationItemResult1.noOfFemales);
    //     expect(res.body.data.location.noOfMales).to.equal(locationItemResult1.noOfMales);
    //     expect(res.body.data.location.totalNumber).to.equal(locationItemResult1.totalNumber);
    //     expect(res.body.data.location.locationId).to.equal(locationItemResult1.id);
    //     // done();
    //   });
    //   done();
    // });
    //
    // it('it should get a location when the locationId is valid', (done) => {
    //   superRequest.get(`/api/locations/locationId=${1}`)
    //   .set({ 'content-type': 'application/json' })
    //   .end((err, res) => {
    //     console.log(res.body)
    //     expect(res.status).to.equal(200);
    //     expect(res.body.status).to.equal('success');
    //     expect(res.body.data.message).to
    //     .equal('Location successfully retrieved');
    //     expect(res.body.data.location.name).to.equal(locationItemResult1.name);
    //     expect(res.body.data.location.noOfFemales).to.equal(locationItemResult1.noOfFemales);
    //     expect(res.body.data.location.noOfMales).to.equal(locationItemResult1.noOfMales);
    //     expect(res.body.data.location.totalNumber).to.equal(locationItemResult1.totalNumber);
    //     expect(res.body.data.location.locationId).to.equal(locationItemResult1.id);
    //     // done();
    //   });
    //   done();
    // });
    //
    // it('it should not get a location when the locationId is not a valid number', (done) => {
    //   superRequest.get('/api/locations/locationId="invalid"')
    //   .set({ 'content-type': 'application/json' })
    //   .end((err, res) => {
    //     expect(res.status).to.equal(404);
    //   });
    //   done();
    // });
    //
    // it('it should not get a location when the locationId does not exist', (done) => {
    //   superRequest.get('/api/locations/locationId=500343')
    //   .set({ 'content-type': 'application/json' })
    //   .end((err, res) => {
    //     expect(res.status).to.equal(404);
    //     expect(res.body.status).to.equal('fail');
    //     expect(res.body.data.message).to
    //     .equal('Location not found');
    //   });
    //   done();
    // });
  })
})
