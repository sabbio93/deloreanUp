# deamon_backup_api

DeamonBackupApi - JavaScript client for deamon_backup_api
Deamon used to periodically generate volume's backup and send of this backups
This SDK is automatically generated by the [Swagger Codegen](https://github.com/swagger-api/swagger-codegen) project:

- API version: 1.0.0
- Package version: 1.0.0
- Build package: io.swagger.codegen.languages.JavascriptClientCodegen

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/),
please follow the procedure in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Then install it via:

```shell
npm install deamon_backup_api --save
```

##### Local development

To use the library locally without publishing to a remote npm registry, first install the dependencies by changing 
into the directory containing `package.json` (and this README). Let's call this `JAVASCRIPT_CLIENT_DIR`. Then run:

```shell
npm install
```

Next, [link](https://docs.npmjs.com/cli/link) it globally in npm with the following, also from `JAVASCRIPT_CLIENT_DIR`:

```shell
npm link
```

Finally, switch to the directory you want to use your deamon_backup_api from, and run:

```shell
npm link /path/to/<JAVASCRIPT_CLIENT_DIR>
```

You should now be able to `require('deamon_backup_api')` in javascript files from the directory you ran the last 
command above from.

#### git
#
If the library is hosted at a git repository, e.g.
https://github.com/YOUR_USERNAME/deamon_backup_api
then install it via:

```shell
    npm install YOUR_USERNAME/deamon_backup_api --save
```

### For browser

The library also works in the browser environment via npm and [browserify](http://browserify.org/). After following
the above steps with Node.js and installing browserify with `npm install -g browserify`,
perform the following (assuming *main.js* is your entry file, that's to say your javascript file where you actually 
use this library):

```shell
browserify main.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

### Webpack Configuration

Using Webpack you may encounter the following error: "Module not found: Error:
Cannot resolve module", most certainly you should disable AMD loader. Add/merge
the following section to your webpack config:

```javascript
module: {
  rules: [
    {
      parser: {
        amd: false
      }
    }
  ]
}
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var DeamonBackupApi = require('deamon_backup_api');

var api = new DeamonBackupApi.ContainerApi()

var id = "id_example"; // {String} Id of the container in which perform the volumes backup


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.containerBackupPOST(id, callback);

```

## Documentation for API Endpoints

All URIs are relative to *http://localhost:5555/api/v1.0.0*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*DeamonBackupApi.ContainerApi* | [**containerBackupPOST**](docs/ContainerApi.md#containerBackupPOST) | **POST** /containers/{id}/backup | Create backup of the container passed by Id.
*DeamonBackupApi.ContainerApi* | [**containerByIdGET**](docs/ContainerApi.md#containerByIdGET) | **GET** /containers/{id} | Returns a container object.
*DeamonBackupApi.ContainerApi* | [**containerMountsGET**](docs/ContainerApi.md#containerMountsGET) | **GET** /containers/{id}/mounts | Returns an array of mounts object.
*DeamonBackupApi.ContainerApi* | [**containersGET**](docs/ContainerApi.md#containersGET) | **GET** /containers/ | Returns a list of active containers.
*DeamonBackupApi.VolumeApi* | [**volumesListGET**](docs/VolumeApi.md#volumesListGET) | **GET** /volumes/list | Returns a list of all volumes


## Documentation for Models

 - [DeamonBackupApi.Backup](docs/Backup.md)
 - [DeamonBackupApi.Container](docs/Container.md)
 - [DeamonBackupApi.ContainerHostConfig](docs/ContainerHostConfig.md)
 - [DeamonBackupApi.ContainerNetworkSettings](docs/ContainerNetworkSettings.md)
 - [DeamonBackupApi.EndpointIPAMConfig](docs/EndpointIPAMConfig.md)
 - [DeamonBackupApi.EndpointSettings](docs/EndpointSettings.md)
 - [DeamonBackupApi.Error](docs/Error.md)
 - [DeamonBackupApi.InlineResponse200](docs/InlineResponse200.md)
 - [DeamonBackupApi.InlineResponse2001](docs/InlineResponse2001.md)
 - [DeamonBackupApi.InlineResponse2002](docs/InlineResponse2002.md)
 - [DeamonBackupApi.InlineResponse2003](docs/InlineResponse2003.md)
 - [DeamonBackupApi.Mount](docs/Mount.md)
 - [DeamonBackupApi.MountBindOptions](docs/MountBindOptions.md)
 - [DeamonBackupApi.MountTmpfsOptions](docs/MountTmpfsOptions.md)
 - [DeamonBackupApi.MountVolumeOptions](docs/MountVolumeOptions.md)
 - [DeamonBackupApi.MountVolumeOptionsDriverConfig](docs/MountVolumeOptionsDriverConfig.md)
 - [DeamonBackupApi.Port](docs/Port.md)
 - [DeamonBackupApi.Volume](docs/Volume.md)
 - [DeamonBackupApi.VolumeUsageData](docs/VolumeUsageData.md)


## Documentation for Authorization

 All endpoints do not require authorization.
