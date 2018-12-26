// @ts-check

/**
 * @type import('../services/').Config[]
 */
const configs = [
  {
    type: 'fe',
    // json: "http://192.168.35.74:9560/v2/api-docs",
    json: 'src/api/petstore.json',
    outputDir: "src/api/petstore",
    // tagNameMap: (name) => {
    //   return name === 'user'
    // },
    // apiNameMap: (name) => {
    //   return name.startsWith('getUser')
    //   // return name === 'createUser'
    // },
    operationMap: (operation, tagName, apiName) => {

    },
    alwaysOverwriteMock: true
  }
]

module.exports = configs
