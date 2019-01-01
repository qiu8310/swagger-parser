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
    json: '../../example-json/petstore.json',
    docPrefix: 'https://petstore.swagger.io/#',
    tagNameMap: (name) => {
      return name === 'pet'
    },
    apiNameMap: (name) => {
      return name.startsWith('getPet')
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
  {
    name: 'credit',
    type: 'fe',
    json: '../../example-json/credit.json',
    operationMap(api) {
      api.omitParameter('body', 'userId', true)
        .omitResponse('escapeCode', true)
        .omitResponse('escapeMessage', true)
    },
    mock: {
      config: {
        timeFormat: (timestamp) => new Date(timestamp).toISOString()
      },

      examples: [
        {match: 'cvv2',           value: '123'},
        {match: 'productCode',    value: ['CREDIT_INSTALMENT']},
        {match: 'merchantCode',   value: ['hj']},
        {match: 'bankAcronym',    value: ['ABC', 'BCOM', 'BOC', 'CCB']},
        {match: 'supportedTerms', value: [[3, 6], [3, 6, 9], [3, 6, 9, 12]]},
        {match: 'term | terms',   value: [3, 6, 9, 12]},
        {match: 'validThru',      value: '{@Date("MMDD", 10)}'}
      ]
    }
  },
  {
    name: 'instal',
    json: '../../example-json/instal.json',
    operationMap(api) {
      api.omitParameter('body', 'userId', true)
        .omitResponse('respMsg', true)
        .omitResponse('respCode', true)
        .omitResponse('respErrorData', true)
    }
  },
  {
    name: 'daybreak',
    disabled: true,
    type: 'fe',
    json: '../../example-json/daybreak.json',
    operationMap(api) {
      api.omitParameter('body', 'userId', true)
        .omitResponse('resultCode', true)
        .omitResponse('resultMessage', true)
        .omitResponse('respErrorData', true)
    }
  },
]

module.exports = configs
