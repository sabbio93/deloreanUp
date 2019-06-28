// @flow

/**
 * Standard object containing the response from the api, parameters:
 * - @type {boolean} success - `true` when the response doesn't contain errors otherwise `false`
 * - @type {Object} data - object containing the response
 */
type ResponseObject = {
  success: boolean,
  data: Object
}

/**
 * Method to call on the backend the GET route `/api/{version}/nodes` that return the list of doc-nodes
 * @return {Promise<ResponseObject>} - promise resolved with the list of the nodes
 */
export function getNodes (): Promise<ResponseObject> {
  const responseObject: ResponseObject = {
    success: true,
    data: nodes
  }

  return new Promise<ResponseObject>(resolve => resolve(responseObject))
}

/**
 * Method to call on the backend the GET route `/api/{version}/nodes/{nodeId}/containers` that return the list of
 * active containers in the node
 * @param {string} nodeId - id of the requested node
 * @return {Promise<ResponseObject>} - promise resolved with the list of active containers
 */
export function getNodeContainers (nodeId: string): Promise<ResponseObject> {
  const responseObject: ResponseObject = {
    success: true,
    data: containers[nodeId]
  }

  return new Promise<ResponseObject>(resolve => resolve(responseObject))
}

/**
 * Method to call on the backend the GET route `/api/{version}/nodes/{nodeId}/containers/{containerId}` that return an
 * active container in the node
 * @param {string} nodeId - id of the requested node
 * @param {string} containerId - id of the requested container
 * @return {Promise<ResponseObject>} - promise resolved with the container object
 */
export function getNodeContainerById (nodeId: string, containerId: string): Promise<ResponseObject> {
  let container = containers[nodeId].containers.filter(cont => cont.Id === containerId)
  const responseObject: ResponseObject = {
    success: true,
    data: container[0]
  }

  return new Promise<ResponseObject>(resolve => resolve(responseObject))
}

/**
 * Method to call on the backend the GET route `/api/{version}/nodes/{nodeId}/containers/{containerId}/mounts` that return the
 * array of Mounts object of the requested container in the requested node
 * @param {string} nodeId - id of the requested node
 * @param {string} containerId - id of the requested container
 * @return {Promise<ResponseObject>} - promise resolved with the array of Mount objects
 */
export function getNodeContainerMounts (nodeId: string, containerId: string): Promise<ResponseObject> {
  let container = containers[nodeId].containers.filter(cont => cont.Id === containerId)
  const responseObject: ResponseObject = {
    success: true,
    data: {
      mounts: container[0].Mounts
    }
  }

  return new Promise<ResponseObject>(resolve => resolve(responseObject))
}

/**
 * Method to call on the backend the POST route `/api/{version}/nodes/{nodeId}/containers/{containerId}/backup` that
 * creates backup of the Mounts of the container requested in the requested node
 * @param {string} nodeId - id of the requested node
 * @param {string} containerId - id of the requested container
 * @return {Promise<ResponseObject>} - promise resolved with the array of Backup object
 */
export function postContainerBackup (nodeId: string, containerId: string): Promise<ResponseObject> {
  const responseObject: ResponseObject = {
    success: true,
    data: backups[nodeId][containerId]
  }

  return new Promise<ResponseObject>(resolve => {
    // Used to simulate the time between the execution of the backup
    // To be removed
    setTimeout(function () {
      resolve(responseObject)
    }, 5000)
    // return resolve(responseObject)
  })
}

const nodes = {
  'nodes': [
    {
      'id': '1',
      'ip': '192.168.1.123',
      'port': 5555,
      'protocol': 'http',
      'apiVersion': '1.0.0'
    },
    {
      'id': '2',
      'ip': '192.168.1.127',
      'port': 5555,
      'protocol': 'http',
      'apiVersion': '1.0.0'
    }
  ]
}

const containers = {
  '1': {
    'containers': [
      {
        'Id': '6e475b5f90a0caf066e21457c95cdf47dba2c3becae64c4d1502668b82a906d7',
        'Names': [
          '/gitlab'
        ],
        'Image': 'gitlab/gitlab-ce:latest',
        'ImageID': 'sha256:e55a3e903832023f9d0d36f00d70fe9df1f6b6ce751166475de4e457ea76cb9c',
        'Command': '/assets/wrapper',
        'Created': 1553969338,
        'Ports': [
          {
            'IP': '0.0.0.0',
            'PrivatePort': 22,
            'PublicPort': 32768,
            'Type': 'tcp'
          },
          {
            'IP': '0.0.0.0',
            'PrivatePort': 443,
            'PublicPort': 32767,
            'Type': 'tcp'
          },
          {
            'IP': '0.0.0.0',
            'PrivatePort': 80,
            'PublicPort': 32769,
            'Type': 'tcp'
          }
        ],
        'Labels': {},
        'State': 'running',
        'Status': 'Up 19 minutes (healthy)',
        'HostConfig': {
          'NetworkMode': 'default'
        },
        'NetworkSettings': {
          'Networks': {
            'bridge': {
              'IPAMConfig': null,
              'Links': null,
              'Aliases': null,
              'NetworkID': '7a1d1aacca9e68e694433e5fe24c5ac7118108c794779161f8c6149ed48803e5',
              'EndpointID': 'b27816c155f0eba30d23ce823e329d81d57bf35a0c554bfbaf58d331d111e14a',
              'Gateway': '172.17.0.1',
              'IPAddress': '172.17.0.2',
              'IPPrefixLen': 16,
              'IPv6Gateway': '',
              'GlobalIPv6Address': '',
              'GlobalIPv6PrefixLen': 0,
              'MacAddress': '02:42:ac:11:00:02',
              'DriverOpts': null
            }
          }
        },
        'Mounts': [
          {
            'Type': 'volume',
            'Name': 'config',
            'Source': '/var/lib/docker/volumes/config/_data',
            'Destination': '/etc/gitlab',
            'Driver': 'local',
            'Mode': 'z',
            'RW': true,
            'Propagation': ''
          },
          {
            'Type': 'volume',
            'Name': 'logs',
            'Source': '/var/lib/docker/volumes/logs/_data',
            'Destination': '/var/log/gitlab',
            'Driver': 'local',
            'Mode': 'z',
            'RW': true,
            'Propagation': ''
          },
          {
            'Type': 'volume',
            'Name': 'data',
            'Source': '/var/lib/docker/volumes/data/_data',
            'Destination': '/var/opt/gitlab',
            'Driver': 'local',
            'Mode': 'z',
            'RW': true,
            'Propagation': ''
          }
        ]
      }
    ]
  },
  '2': {
    'containers': [
      {
        'Id': '585fcb498e046093df2554044bf1dacbb530202a214fad8cfa982fc9dae440a8',
        'Names': [
          '/doc-node_webdav_1'
        ],
        'Image': 'morrisjobke/webdav',
        'ImageID': 'sha256:440ff0fa165ced0ab6ee7640b8d0a0b9703db098ea1afd85c98b38b2af318270',
        'Command': '/run.sh',
        'Created': 1557923624,
        'Ports': [
          {
            'IP': '0.0.0.0',
            'PrivatePort': 80,
            'PublicPort': 8888,
            'Type': 'tcp'
          }
        ],
        'Labels': {
          'com.docker.compose.config-hash': 'de2bb3830103553758b4f70b4eb199b6d332ded05a30e6044aec870604afd310',
          'com.docker.compose.container-number': '1',
          'com.docker.compose.oneoff': 'False',
          'com.docker.compose.project': 'doc-node',
          'com.docker.compose.service': 'webdav',
          'com.docker.compose.version': '1.24.0'
        },
        'State': 'running',
        'Status': 'Up 14 minutes',
        'HostConfig': {
          'NetworkMode': 'doc-node_default'
        },
        'NetworkSettings': {
          'Networks': {
            'doc-node_default': {
              'IPAMConfig': null,
              'Links': null,
              'Aliases': null,
              'NetworkID': '86bbcfe3b63ad6cfedaaaf90b65dcbc85956e67c0026a04d3bc059c4b6fb545c',
              'EndpointID': '78c9c780fbf4485d1aa7e602a18cbe07b26eed16034709b89829fa05b2a4ceae',
              'Gateway': '172.18.0.1',
              'IPAddress': '172.18.0.2',
              'IPPrefixLen': 16,
              'IPv6Gateway': '',
              'GlobalIPv6Address': '',
              'GlobalIPv6PrefixLen': 0,
              'MacAddress': '02:42:ac:12:00:02',
              'DriverOpts': null
            }
          }
        },
        'Mounts': [
          {
            'Type': 'volume',
            'Name': 'e95b40d40da1f277f3e2837af2f188e81b098401978be73d4df1e7b37c29ed00',
            'Source': '',
            'Destination': '/var/webdav',
            'Driver': 'local',
            'Mode': '',
            'RW': true,
            'Propagation': ''
          }
        ]
      },
      {
        'Id': 'eb8dc97b597633235b24217f2f872025af2c5a828c7fbbf752a0c8b2a1f00ea2',
        'Names': [
          '/gitlab-replicated'
        ],
        'Image': 'gitlab/gitlab-ce:latest',
        'ImageID': 'sha256:e55a3e903832023f9d0d36f00d70fe9df1f6b6ce751166475de4e457ea76cb9c',
        'Command': '/assets/wrapper',
        'Created': 1553861212,
        'Ports': [
          {
            'IP': '0.0.0.0',
            'PrivatePort': 22,
            'PublicPort': 32868,
            'Type': 'tcp'
          },
          {
            'IP': '0.0.0.0',
            'PrivatePort': 443,
            'PublicPort': 32867,
            'Type': 'tcp'
          },
          {
            'IP': '0.0.0.0',
            'PrivatePort': 80,
            'PublicPort': 32869,
            'Type': 'tcp'
          }
        ],
        'Labels': {},
        'State': 'running',
        'Status': 'Up 15 minutes (healthy)',
        'HostConfig': {
          'NetworkMode': 'default'
        },
        'NetworkSettings': {
          'Networks': {
            'bridge': {
              'IPAMConfig': null,
              'Links': null,
              'Aliases': null,
              'NetworkID': 'e1fa5e028e5ca5d0beba3c3319282cde2c045200dac0c3e23c8ffd9c9f1e4c00',
              'EndpointID': 'a984450a38115dff34b6afe9492a81bd74c280f68ecdb75ce62539cbe67b2f55',
              'Gateway': '172.17.0.1',
              'IPAddress': '172.17.0.2',
              'IPPrefixLen': 16,
              'IPv6Gateway': '',
              'GlobalIPv6Address': '',
              'GlobalIPv6PrefixLen': 0,
              'MacAddress': '02:42:ac:11:00:02',
              'DriverOpts': null
            }
          }
        },
        'Mounts': [
          {
            'Type': 'bind',
            'Source': '/srv/gitlab/config',
            'Destination': '/etc/gitlab',
            'Mode': '',
            'RW': true,
            'Propagation': 'rprivate'
          },
          {
            'Type': 'bind',
            'Source': '/srv/gitlab/logs',
            'Destination': '/var/log/gitlab',
            'Mode': '',
            'RW': true,
            'Propagation': 'rprivate'
          },
          {
            'Type': 'bind',
            'Source': '/srv/gitlab/data',
            'Destination': '/var/opt/gitlab',
            'Mode': '',
            'RW': true,
            'Propagation': 'rprivate'
          }
        ]
      },
      {
        'Id': '946240acd4ae9531aec1bb4e85472a643462fd1d064ef11f041aa7fae53a38b3',
        'Names': [
          '/gitlab'
        ],
        'Image': 'gitlab/gitlab-ce:latest',
        'ImageID': 'sha256:e55a3e903832023f9d0d36f00d70fe9df1f6b6ce751166475de4e457ea76cb9c',
        'Command': '/assets/wrapper',
        'Created': 1553798130,
        'Ports': [
          {
            'IP': '0.0.0.0',
            'PrivatePort': 22,
            'PublicPort': 32768,
            'Type': 'tcp'
          },
          {
            'IP': '0.0.0.0',
            'PrivatePort': 443,
            'PublicPort': 32767,
            'Type': 'tcp'
          },
          {
            'IP': '0.0.0.0',
            'PrivatePort': 80,
            'PublicPort': 32769,
            'Type': 'tcp'
          }
        ],
        'Labels': {},
        'State': 'running',
        'Status': 'Up 15 minutes (healthy)',
        'HostConfig': {
          'NetworkMode': 'default'
        },
        'NetworkSettings': {
          'Networks': {
            'bridge': {
              'IPAMConfig': null,
              'Links': null,
              'Aliases': null,
              'NetworkID': 'e1fa5e028e5ca5d0beba3c3319282cde2c045200dac0c3e23c8ffd9c9f1e4c00',
              'EndpointID': 'ada33554af15938b5eefb8c9bf7187949cb6cd97bcc2366a97aaf3174b838b5f',
              'Gateway': '172.17.0.1',
              'IPAddress': '172.17.0.3',
              'IPPrefixLen': 16,
              'IPv6Gateway': '',
              'GlobalIPv6Address': '',
              'GlobalIPv6PrefixLen': 0,
              'MacAddress': '02:42:ac:11:00:03',
              'DriverOpts': null
            }
          }
        },
        'Mounts': [
          {
            'Type': 'bind',
            'Source': '/srv/gitlab/config',
            'Destination': '/etc/gitlab',
            'Mode': '',
            'RW': true,
            'Propagation': 'rprivate'
          },
          {
            'Type': 'bind',
            'Source': '/srv/gitlab/logs',
            'Destination': '/var/log/gitlab',
            'Mode': '',
            'RW': true,
            'Propagation': 'rprivate'
          },
          {
            'Type': 'bind',
            'Source': '/srv/gitlab/data',
            'Destination': '/var/opt/gitlab',
            'Mode': '',
            'RW': true,
            'Propagation': 'rprivate'
          }
        ]
      }
    ]
  }
}

const backups = {
  '1': {
    '6e475b5f90a0caf066e21457c95cdf47dba2c3becae64c4d1502668b82a906d7': {
      'backups': [
        {
          'containerName': 'gitlab',
          'backupName': 'etc-gitlab',
          'hostname': 'MacBook-Pro-di-Alessandro.local',
          'createdAt': '2019-05-15T12:54:29.252Z'
        },
        {
          'containerName': 'gitlab',
          'backupName': 'var-log-gitlab',
          'hostname': 'MacBook-Pro-di-Alessandro.local',
          'createdAt': '2019-05-15T12:54:29.256Z'
        },
        {
          'containerName': 'gitlab',
          'backupName': 'var-opt-gitlab',
          'hostname': 'MacBook-Pro-di-Alessandro.local',
          'createdAt': '2019-05-15T12:54:29.257Z'
        }
      ]
    }
  },
  '2': {
    '585fcb498e046093df2554044bf1dacbb530202a214fad8cfa982fc9dae440a8': {
      'backups': [
        {
          'containerName': 'doc-node_webdav_1',
          'backupName': 'var-webdav',
          'hostname': 'astaffolani-XPS-13-9350',
          'createdAt': '2019-05-15T12:56:20.086Z'
        }
      ]
    },
    'eb8dc97b597633235b24217f2f872025af2c5a828c7fbbf752a0c8b2a1f00ea2': {
      'backups': [
        {
          'containerName': 'gitlab-replicated',
          'backupName': 'etc-gitlab',
          'hostname': 'astaffolani-XPS-13-9350',
          'createdAt': '2019-05-15T12:56:52.305Z'
        },
        {
          'containerName': 'gitlab-replicated',
          'backupName': 'var-log-gitlab',
          'hostname': 'astaffolani-XPS-13-9350',
          'createdAt': '2019-05-15T12:56:52.306Z'
        },
        {
          'containerName': 'gitlab-replicated',
          'backupName': 'var-opt-gitlab',
          'hostname': 'astaffolani-XPS-13-9350',
          'createdAt': '2019-05-15T12:56:52.306Z'
        }
      ]
    },
    '946240acd4ae9531aec1bb4e85472a643462fd1d064ef11f041aa7fae53a38b3': {
      'backups': [
        {
          'containerName': 'gitlab',
          'backupName': 'etc-gitlab',
          'hostname': 'astaffolani-XPS-13-9350',
          'createdAt': '2019-05-15T12:57:23.382Z'
        },
        {
          'containerName': 'gitlab',
          'backupName': 'var-log-gitlab',
          'hostname': 'astaffolani-XPS-13-9350',
          'createdAt': '2019-05-15T12:57:23.383Z'
        },
        {
          'containerName': 'gitlab',
          'backupName': 'var-opt-gitlab',
          'hostname': 'astaffolani-XPS-13-9350',
          'createdAt': '2019-05-15T12:57:23.383Z'
        }
      ]
    }
  }
}
