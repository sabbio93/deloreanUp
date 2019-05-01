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
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.DeamonBackupApi) {
      root.DeamonBackupApi = {};
    }
    root.DeamonBackupApi.MountBindOptions = factory(root.DeamonBackupApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The MountBindOptions model module.
   * @module model/MountBindOptions
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>MountBindOptions</code>.
   * Optional configuration for the &#x60;bind&#x60; type.
   * @alias module:model/MountBindOptions
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>MountBindOptions</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MountBindOptions} obj Optional instance to populate.
   * @return {module:model/MountBindOptions} The populated <code>MountBindOptions</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('Propagation')) {
        obj['Propagation'] = ApiClient.convertToType(data['Propagation'], 'String');
      }
    }
    return obj;
  }

  /**
   * A propagation mode with the value `[r]private`, `[r]shared`, or `[r]slave`.
   * @member {module:model/MountBindOptions.PropagationEnum} Propagation
   */
  exports.prototype['Propagation'] = undefined;


  /**
   * Allowed values for the <code>Propagation</code> property.
   * @enum {String}
   * @readonly
   */
  exports.PropagationEnum = {
    /**
     * value: "private"
     * @const
     */
    "private": "private",
    /**
     * value: "rprivate"
     * @const
     */
    "rprivate": "rprivate",
    /**
     * value: "shared"
     * @const
     */
    "shared": "shared",
    /**
     * value: "rshared"
     * @const
     */
    "rshared": "rshared",
    /**
     * value: "slave"
     * @const
     */
    "slave": "slave",
    /**
     * value: "rslave"
     * @const
     */
    "rslave": "rslave"  };


  return exports;
}));

