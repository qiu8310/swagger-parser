// @ts-check

/**
 * @type import('../services/').Config[]
 */
const configs = [
  {
    name: 'petstore',
    type: 'fe',
    language: 'ts',
    // json: "http://192.168.35.74:9560/v2/api-docs",
    json: 'example-json/petstore.json',
    tagNameMap: (name) => {
      return name === 'pet'
    },
    apiNameMap: (name) => {
      return name.startsWith('getPet')
    },
    operationMap: (operation, tagName, apiName) => {

    },
    mock: {
      config: {
        repeats: {min: 2, max: 5}
      },
      examples: [
        {
          match: 'category.name@Pet',
          value: ['Pet种类 1', 'Pet种类 2', 'Pet种类 3']
        },
        {
          exect: true,
          match: '^nam@Pet',
          value: (op, keys) => {
            return '猫' + Math.random().toFixed(16).substr(-3)
          }
        }
      ],
      generator(op, keys, mock) {
        // keys 长度为 0 表示最外层的数据
        if (op.key === 'Pet.getPetById' && keys.length === 0) {
          mock.tags.length = 1
        }
        return mock
      }
    }
  },
  // {
  //   name: 'daybreak',
  //   type: 'fe',
  //   json: 'example-json/daybreak.json',
  //   operationMap(api) {
  //     api.omitParameter('body', 'userId')

  //     api.omitResponse('resultCode')
  //     api.omitResponse('resultMessage')
  //     api.omitResponse('respErrorData')
  //   }
  // },
  // {
  //   name: 'credit',
  //   type: 'fe',
  //   json: 'example-json/credit.json',
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
