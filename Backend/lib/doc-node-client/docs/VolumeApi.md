# DeamonBackupApi.VolumeApi

All URIs are relative to *http://localhost:5555/api/v1.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**volumesListGET**](VolumeApi.md#volumesListGET) | **GET** /volumes/list | Returns a list of all volumes


<a name="volumesListGET"></a>
# **volumesListGET**
> InlineResponse2003 volumesListGET()

Returns a list of all volumes

Allow to retrive all volume objects that are in the host machine (for additional information [Docker API Reference - volume list](https://docs.docker.com/engine/api/v1.39/#operation/VolumeList))

### Example
```javascript
var DeamonBackupApi = require('deamon_backup_api');

var apiInstance = new DeamonBackupApi.VolumeApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.volumesListGET(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**InlineResponse2003**](InlineResponse2003.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

