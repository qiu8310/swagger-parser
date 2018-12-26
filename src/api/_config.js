// @ts-check

/**
 * @type import('../services/').Config[]
 */
const configs = [
  {
    type: 'fe',
    // json: "http://192.168.35.74:9560/v2/api-docs",
    json: 'example-json/petstore.json',
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
  },
  // {
  //   type: 'fe',
  //   json: 'example-json/daybreak.json',
  //   outputDir: "src/api/daybreak",
  //   alwaysOverwriteMock: true
  // },
  // {
  //   type: 'fe',
  //   json: 'example-json/credit.json',
  //   outputDir: "src/api/credit",
  //   tagNameMap: (name) => {
  //     return name === 'order'
  //   },
  //   apiNameMap: (name) => {
  //     return name.startsWith('queryPlan')
  //     // return name === 'createUser'
  //   },
  //   alwaysOverwriteMock: true
  // },
]

module.exports = configs
