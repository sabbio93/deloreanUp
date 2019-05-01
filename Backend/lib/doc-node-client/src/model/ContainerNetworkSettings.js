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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/EndpointSettings'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./EndpointSettings'));
  } else {
    // Browser globals (root is window)
    if (!root.DeamonBackupApi) {
      root.DeamonBackupApi = {};
    }
    root.DeamonBackupApi.ContainerNetworkSettings = factory(root.DeamonBackupApi.ApiClient, root.DeamonBackupApi.EndpointSettings);
  }
}(this, function(ApiClient, EndpointSettings) {
  'use strict';




  /**
   * The ContainerNetworkSettings model module.
   * @module model/ContainerNetworkSettings
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>ContainerNetworkSettings</code>.
   * A summary of the container&#39;s network settings
   * @alias module:model/ContainerNetworkSettings
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>ContainerNetworkSettings</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ContainerNetworkSettings} obj Optional instance to populate.
   * @return {module:model/ContainerNetworkSettings} The populated <code>ContainerNetworkSettings</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('Networks')) {
        obj['Networks'] = ApiClient.convertToType(data['Networks'], {'String': EndpointSettings});
      }
    }
    return obj;
  }

  /**
   * @member {Object.<String, module:model/EndpointSettings>} Networks
   */
  exports.prototype['Networks'] = undefined;



  return exports;
}));


