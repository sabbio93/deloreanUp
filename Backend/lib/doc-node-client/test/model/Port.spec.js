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
    instance = new DeamonBackupApi.Port();
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

  describe('Port', function() {
    it('should create an instance of Port', function() {
      // uncomment below and update the code to test Port
      //var instance = new DeamonBackupApi.Port();
      //expect(instance).to.be.a(DeamonBackupApi.Port);
    });

    it('should have the property IP (base name: "IP")', function() {
      // uncomment below and update the code to test the property IP
      //var instance = new DeamonBackupApi.Port();
      //expect(instance).to.be();
    });

    it('should have the property privatePort (base name: "PrivatePort")', function() {
      // uncomment below and update the code to test the property privatePort
      //var instance = new DeamonBackupApi.Port();
      //expect(instance).to.be();
    });

    it('should have the property publicPort (base name: "PublicPort")', function() {
      // uncomment below and update the code to test the property publicPort
      //var instance = new DeamonBackupApi.Port();
      //expect(instance).to.be();
    });

    it('should have the property type (base name: "Type")', function() {
      // uncomment below and update the code to test the property type
      //var instance = new DeamonBackupApi.Port();
      //expect(instance).to.be();
    });

  });

}));
