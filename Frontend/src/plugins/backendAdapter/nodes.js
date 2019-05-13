import { NodesApi } from 'delorean-up-api'

/**
 * This array contain the error that are handled by the api
 * @type {number[]}
 */
const specialErrorStatus = [
  400,
  404
]

/**
 * Method to call on the backed the GET route `/api/{version}/nodes` that return the list of doc-nodes
 * @return {Promise<any>} - promise resolved with the list of the nodes or when the response is an error with code
 * included in the `specialErrorStatus` array, otherwise is rejected
 */
function getNodes() {
  return new Promise((resolve, reject) => {
    const nodesApi = new NodesApi()

    nodesApi.nodesGET((err, data, response) => {
      handleApiResponse(err, data, response)
        .then(resolve)
        .catch(reject)
    })
  })
}


/**
 * Method that handle the response received by the doc-node-client, that is resolved when there is a success and also when
 * the response is an error with code included in the `specialErrorStatus` array, otherwise is rejected
 * @param {Object} err - error object of the response
 * @param {Object} data - response data
 * @param {Object} response - response of the request
 * @return {Promise<Object>} - return a promise resolved with a response object, composed by 2 properties:
 *  - `success` boolean that is true if there are not errors, otherwise false
 *  - `data` an object containing the response data in case of success, otherwise contain an object with `code` and `message` of the error
 *  rejected otherwise
 */
function handleApiResponse (err, data, response) {
  return new Promise((resolve, reject) => {
    const responseObject = {
      success: true,
      data: null
    }
    console.log(err, data, response)
    if (err) {
      const status = err.status
      // If the error status if one of the special error resolve the response with success false and the error, otherwise reject the promise
      if (specialErrorStatus.includes(status)) {
        responseObject.success = false
        responseObject.data = response.body
        resolve(responseObject)
      } else {
        reject(err)
      }
    } else {
      // If there are not errors resolve the response with success true and the response data
      responseObject.success = true
      responseObject.data = response.body
      resolve(responseObject)
    }
  })
}

export {
  getNodes
}
