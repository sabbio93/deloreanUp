# DeamonBackupApi.Volume

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **String** | Name of the volume. | [optional] 
**driver** | **String** | Name of the volume driver used by the volume. | [optional] 
**mountpoint** | **String** | Mount path of the volume on the host. | [optional] 
**createdAt** | **String** | Date/Time the volume was created. | [optional] 
**status** | **{String: Object}** | Low-level details about the volume, provided by the volume driver. Details are returned as a map with key/value pairs: &#x60;{\&quot;key\&quot;:\&quot;value\&quot;,\&quot;key2\&quot;:\&quot;value2\&quot;}&#x60;. The &#x60;Status&#x60; field is optional, and is omitted if the volume driver does not support this feature.  | [optional] 
**labels** | **{String: String}** | User-defined key/value metadata. | [optional] 
**scope** | **String** | The level at which the volume exists. Either &#x60;global&#x60; for cluster-wide, or &#x60;local&#x60; for machine level. | [optional] [default to &#39;local&#39;]
**options** | **{String: String}** | The driver specific options used when creating the volume. | [optional] 
**usageData** | [**VolumeUsageData**](VolumeUsageData.md) |  | [optional] 


<a name="ScopeEnum"></a>
## Enum: ScopeEnum


* `local` (value: `"local"`)

* `global` (value: `"global"`)




