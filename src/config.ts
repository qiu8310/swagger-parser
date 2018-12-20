/**
 * 格式化相关的字符
 */
export const FORMAT = {
  /** 换行符 */
  EOL: '\n',
  /** 制表符 */
  TAB: '  ',
}


/**
 * 将 swagger 中的简单类型转化成 typescript 中可以识别的类型
 */
export const SIMPLE_TYPE_MAP: {[key: string]: string} = {
  integer: 'number',
  long: 'number',
  float: 'number',
  double: 'number',
  byte: 'string',
  binary: 'string',
  date: 'string',
  dateTime: 'string',
  password: 'string',
  color: 'string',
  array: 'any[]',
  object: 'any',
  file: 'any',
  string: 'string',
  number: 'number',
  boolean: 'boolean',
}
