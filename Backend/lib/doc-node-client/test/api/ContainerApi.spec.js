/**
 * Deamon Backup API
 * Deamon used to periodically generate volume's backup and send of this backups
 *
 * OpenAPI spec version: 1.0.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.5
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.DeamonBackupApi);
  }
}(this, function(expect, DeamonBackupApi) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new DeamonBackupApi.ContainerApi();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('ContainerApi', function() {
    describe('containerBackupPOST', function() {
      it('should call containerBackupPOST successfully', function(done) {
        //uncomment below and update the code to test containerBackupPOST
        //instance.containerBackupPOST(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('containerByIdGET', function() {
      it('should call containerByIdGET successfully', function(done) {
        //uncomment below and update the code to test containerByIdGET
        //instance.containerByIdGET(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('containerMountsGET', function() {
      it('should call containerMountsGET successfully', function(done) {
        //uncomment below and update the code to test containerMountsGET
        //instance.containerMountsGET(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('containersGET', function() {
      it('should call containersGET successfully', function(done) {
        //uncomment below and update the code to test containersGET
        //instance.containersGET(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));