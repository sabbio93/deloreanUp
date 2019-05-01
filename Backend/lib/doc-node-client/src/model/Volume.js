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
    define(['ApiClient', 'model/VolumeUsageData'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./VolumeUsageData'));
  } else {
    // Browser globals (root is window)
    if (!root.DeamonBackupApi) {
      root.DeamonBackupApi = {};
    }
    root.DeamonBackupApi.Volume = factory(root.DeamonBackupApi.ApiClient, root.DeamonBackupApi.VolumeUsageData);
  }
}(this, function(ApiClient, VolumeUsageData) {
  'use strict';




  /**
   * The Volume model module.
   * @module model/Volume
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>Volume</code>.
   * @alias module:model/Volume
   * @class
   */
  var exports = function() {
    var _this = this;










  };

  /**
   * Constructs a <code>Volume</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Volume} obj Optional instance to populate.
   * @return {module:model/Volume} The populated <code>Volume</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('Name')) {
        obj['Name'] = ApiClient.convertToType(data['Name'], 'String');
      }
      if (data.hasOwnProperty('Driver')) {
        obj['Driver'] = ApiClient.convertToType(data['Driver'], 'String');
      }
      if (data.hasOwnProperty('Mountpoint')) {
        obj['Mountpoint'] = ApiClient.convertToType(data['Mountpoint'], 'String');
      }
      if (data.hasOwnProperty('CreatedAt')) {
        obj['CreatedAt'] = ApiClient.convertToType(data['CreatedAt'], 'String');
      }
      if (data.hasOwnProperty('Status')) {
        obj['Status'] = ApiClient.convertToType(data['Status'], {'String': Object});
      }
      if (data.hasOwnProperty('Labels')) {
        obj['Labels'] = ApiClient.convertToType(data['Labels'], {'String': 'String'});
      }
      if (data.hasOwnProperty('Scope')) {
        obj['Scope'] = ApiClient.convertToType(data['Scope'], 'String');
      }
      if (data.hasOwnProperty('Options')) {
        obj['Options'] = ApiClient.convertToType(data['Options'], {'String': 'String'});
      }
      if (data.hasOwnProperty('UsageData')) {
        obj['UsageData'] = VolumeUsageData.constructFromObject(data['UsageData']);
      }
    }
    return obj;
  }

  /**
   * Name of the volume.
   * @member {String} Name
   */
  exports.prototype['Name'] = undefined;
  /**
   * Name of the volume driver used by the volume.
   * @member {String} Driver
   */
  exports.prototype['Driver'] = undefined;
  /**
   * Mount path of the volume on the host.
   * @member {String} Mountpoint
   */
  exports.prototype['Mountpoint'] = undefined;
  /**
   * Date/Time the volume was created.
   * @member {String} CreatedAt
   */
  exports.prototype['CreatedAt'] = undefined;
  /**
   * Low-level details about the volume, provided by the volume driver. Details are returned as a map with key/value pairs: `{\"key\":\"value\",\"key2\":\"value2\"}`. The `Status` field is optional, and is omitted if the volume driver does not support this feature. 
   * @member {Object.<String, Object>} Status
   */
  exports.prototype['Status'] = undefined;
  /**
   * User-defined key/value metadata.
   * @member {Object.<String, String>} Labels
   */
  exports.prototype['Labels'] = undefined;
  /**
   * The level at which the volume exists. Either `global` for cluster-wide, or `local` for machine level.
   * @member {module:model/Volume.ScopeEnum} Scope
   * @default 'local'
   */
  exports.prototype['Scope'] = 'local';
  /**
   * The driver specific options used when creating the volume.
   * @member {Object.<String, String>} Options
   */
  exports.prototype['Options'] = undefined;
  /**
   * @member {module:model/VolumeUsageData} UsageData
   */
  exports.prototype['UsageData'] = undefined;


  /**
   * Allowed values for the <code>Scope</code> property.
   * @enum {String}
   * @readonly
   */
  exports.ScopeEnum = {
    /**
     * value: "local"
     * @const
     */
    "local": "local",
    /**
     * value: "global"
     * @const
     */
    "global": "global"  };


  return exports;
}));


