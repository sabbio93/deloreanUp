// @flow

const IDB = window.indexedDB

/**
 * Object containing the database connection informations
 * - @type {Object} result - result of the attempt to connect
 * - @type {Object} tx - transaction object containing all the operations to do in this openend connection, if an operation inside a transactions fail the changes are deleted
 * - @type {Object} store - bucket (object store, table) containing records
 */
type DatabaseConnection = {
  result: Object,
  tx: Object,
  store: Object
}

const openIndexedDatabase = (dbName: string, osName: string, osKey: string) => {
  let request = IDB.open(dbName)

  request.onupgradeneeded = (event) => {
    let database = event.target.result
    if (!database.objectStoreNames.contains(osName)) {
      database.createObjectStore(osName, { keyPath: osKey })
    }
  }

  return request
}

/**
 * Function that open a connection to local IndexedDB
 * @param {string} dbName - database name
 * @param {string} tableName - cache table name
 * @param {string} tableKey - cache table key field
 * @return {Promise<DatabaseConnection>} - promise resolved with @type {DatabaseConnection} or rejected with error message
 */
export function getDatabaseConnection (dbName: string, tableName: string, tableKey: string): Promise<DatabaseConnection> {
  return new Promise((resolve, reject) => {
    let databaseOpeningRequest = openIndexedDatabase(dbName, tableName, tableKey)

    databaseOpeningRequest.onerror = (event) => {
      reject(event.target.result)
    }

    databaseOpeningRequest.onsuccess = (event) => {
      let connection: DatabaseConnection = {}

      connection.result = databaseOpeningRequest.result
      connection.tx = connection.result.transaction(tableName, 'readwrite')
      connection.store = connection.tx.objectStore(tableName)

      resolve(connection)
    }
  })
}

/**
 * Function that deletes the IndexedDB specified with all object stores. It is reversible because the database is recreated when a new connection is opened.
 * @param {string} dbName - a string with the database to delete
 * @return {Promise<string>} - promise resolved with the result message
 */
export function deleteDatabase (dbName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let dbRequest = IDB.deleteDatabase(dbName)
    dbRequest.onsuccess = () => {
      resolve(dbName + ' deleted')
    }
    dbRequest.onerror = () => {
      reject(new Error('Error while deleting: ' + dbName))
    }
  })
}
