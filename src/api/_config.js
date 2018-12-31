// @ts-check

/**
 * @type import('../services/').Config[]
 */
const configs = [
  // {
  //   type: 'fe',
  //   language: 'ts',
  //   // json: "http://192.168.35.74:9560/v2/api-docs",
  //   json: 'example-json/petstore.json',
  //   outputDir: "src/api/petstore",
  //   tagNameMap: (name) => {
  //     return name === 'pet'
  //   },
  //   apiNameMap: (name) => {
  //     return name.startsWith('getPet') || name.startsWith('findPet')
  //     // return name !== 'addPet'
  //   },
  //   operationMap: (operation, tagName, apiName) => {

  //   },
  // },
  {
    type: 'fe',
    json: 'example-json/daybreak.json',
    outputDir: "src/api/daybreak",
    operationMap(api) {
      api.omitParameter('body', 'userId')

      api.omitResponse('resultCode')
      api.omitResponse('resultMessage')
      api.omitResponse('respErrorData')
    }
  },
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
  // },
]

module.exports = configs
