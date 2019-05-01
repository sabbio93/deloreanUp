# DeamonBackupApi.Container

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | The ID of this container | [optional] 
**names** | **[String]** | The names that this container has been given | [optional] 
**image** | **String** | The name of the image used when creating this container | [optional] 
**imageID** | **String** | The ID of the image that this container was created from | [optional] 
**command** | **String** | Command to run when starting the container | [optional] 
**created** | **Number** | When the container was created | [optional] 
**ports** | [**[Port]**](Port.md) | The ports exposed by this container | [optional] 
**sizeRw** | **Number** | The size of files that have been created or changed by this container | [optional] 
**sizeRootFs** | **Number** | The total size of all the files in this container | [optional] 
**labels** | **{String: String}** | User-defined key/value metadata. | [optional] 
**state** | **String** | The state of this container (e.g. &#x60;Exited&#x60;) | [optional] 
**status** | **String** | Additional human-readable status of this container (e.g. &#x60;Exit 0&#x60;) | [optional] 
**hostConfig** | [**ContainerHostConfig**](ContainerHostConfig.md) |  | [optional] 
**networkSettings** | [**ContainerNetworkSettings**](ContainerNetworkSettings.md) |  | [optional] 
**mounts** | [**[Mount]**](Mount.md) |  | [optional] 


