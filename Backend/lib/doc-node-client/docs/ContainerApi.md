# DeamonBackupApi.ContainerApi

All URIs are relative to *http://localhost:5555/api/v1.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**containerBackupPOST**](ContainerApi.md#containerBackupPOST) | **POST** /containers/{id}/backup | Create backup of the container passed by Id.
[**containerByIdGET**](ContainerApi.md#containerByIdGET) | **GET** /containers/{id} | Returns a container object.
[**containerMountsGET**](ContainerApi.md#containerMountsGET) | **GET** /containers/{id}/mounts | Returns an array of mounts object.
[**containersGET**](ContainerApi.md#containersGET) | **GET** /containers/ | Returns a list of active containers.


<a name="containerBackupPOST"></a>
# **containerBackupPOST**
> InlineResponse2002 containerBackupPOST(id)

Create backup of the container passed by Id.

Create a backup file for each volumes mounted in the container

### Example
```javascript
var DeamonBackupApi = require('deamon_backup_api');

var apiInstance = new DeamonBackupApi.ContainerApi();

var id = "id_example"; // String | Id of the container in which perform the volumes backup


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.containerBackupPOST(id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| Id of the container in which perform the volumes backup | 

### Return type

[**InlineResponse2002**](InlineResponse2002.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="containerByIdGET"></a>
# **containerByIdGET**
> Container containerByIdGET(id)

Returns a container object.

Allow to retrive a single container object from those active in the host

### Example
```javascript
var DeamonBackupApi = require('deamon_backup_api');

var apiInstance = new DeamonBackupApi.ContainerApi();

var id = "id_example"; // String | ID of the container to return


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.containerByIdGET(id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| ID of the container to return | 

### Return type

[**Container**](Container.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="containerMountsGET"></a>
# **containerMountsGET**
> InlineResponse2001 containerMountsGET(id)

Returns an array of mounts object.

Allow to retrive the mounts object list of a container from those active in the host

### Example
```javascript
var DeamonBackupApi = require('deamon_backup_api');

var apiInstance = new DeamonBackupApi.ContainerApi();

var id = "id_example"; // String | ID of the container from which return the mounts


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.containerMountsGET(id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| ID of the container from which return the mounts | 

### Return type

[**InlineResponse2001**](InlineResponse2001.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

<a name="containersGET"></a>
# **containersGET**
> InlineResponse200 containersGET()

Returns a list of active containers.

Allow to retrive all containers object that are running in the host machine (for additional information [Docker API Reference - container list](https://docs.docker.com/engine/api/v1.39/#operation/ContainerList))

### Example
```javascript
var DeamonBackupApi = require('deamon_backup_api');

var apiInstance = new DeamonBackupApi.ContainerApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.containersGET(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

