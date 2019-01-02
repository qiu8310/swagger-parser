import {parser2} from '../parser2'
import {Operation} from '../struct/Operation'

// 避免纯 d.ts 的定义，会导致 webpack 不自动加载它
export const __INTERNAL_USE_ONLY = true

export interface Mock {
  /** 内置 mock 系统的配置项 */
  config?: {
    /** 时间戳的长度（js 中是 10 位， java 中是 13 位） */
    timestampLength?: 10 | 13

    /**
     * * 如果是函数，则直接返回要 mock 的数据
     * * 如果是字符串，则会按下面的格式来格式化时间
     *
     *  FORMAT  |       EXAMPLE
     *  --------|----------------
     *  yyyy    |       2014
     *  yy      |       14
     *  m, mm   |       1, 01
     *  M, MM   |       Jan, January
     *  d, dd   |       2, 02
     *  D, DD   |       Thur, Thursday
     *  Do      |       2nd（Day of month with ordinal: 1st..31st）
     *  H, HH   |       4, 04（24 hour time)
     *  h, hh   |       4, 04 (12 hour time used with `a A`)
     *  a, A    |       am, AM
     *  i, ii   |       5, 05
     *  s, ss   |       6, 06
     *  x       |       1388646306
     *  X       |       1388646306346
     */
    timeFormat?: string | ((timestamp: number) => string)

    /** 指定数组重复的次数，或者指定一个范围 */
    repeats?: number | {min: number, max: number}
  },

  /**
   * 示例 mock 数据
   *
   * 按顺序匹配，匹配成功则不继续向下
   */
  examples?: Array<{
    /**
     * 是否必须全部匹配 keys
     *
     * 如果此值不为 true，则表示只会匹配最后的字段，如 `name` 会和 `category.name` 及 `tag.name`、`name` 都匹配成功
     */
    exect?: boolean

    /** 是否只匹配叶子节点 */
    leaf?: boolean

    /**
     *
     * * match 的规则
     *  - `name@Pet#getPet` 标签名为 Pet，函数名为 getPetById 下的 name 字段
     *  - `name#getPet`     函数名为 getPetById 下的 name 字段
     *  - `name@User`       标签名为 User 下的 name 字段
     *  - `users[].name`    users 数组下的 name 字段
     *  - `user.name`       user 下的 name 字段
     *  - `name`            所有的 name 字段
     *  - `^name`           以 name 开头的字段
     *  - `$name`           以 name 结尾的字段
     *  - `~name`           包含 name 的字段
     *
     * * match 的组合
     *  - `^name | $Name`   以 "name" 开头或以 "Name" 结尾（优先级为两者之间的最大者）
     *  - `^name & $Name`   以 "name" 开头并且以 "Name" 结尾（优先级为两者之和）
     */
    match: string | ((op: Operation, keys: string[]) => boolean),
    /**
     * * value 的规则
     *  - `1`       如果值为数字/布尔值，则也会生成一个随机的数字/布尔值来当 mock 数据
     *  - `abc123`  如果值为字符串，则也会生成一个随机的字符串来当 mock 数据，并且生成的长度和原长度保持一致，格式也一致
     *  - `{@Char}` 如果值用 {} 包裹起来了，则会使用 [yod-mock](https://github.com/qiu8310/yod-mock) 来生成内部数据
     *  - `[1,2,3]` 如果值为数组（数组中可以是任意值），表示枚举，会从中随机取一个值来当 mock 数据
     *  - `()=> {}` 如果值为函数，则会使用函数返回的值来当 mock 数据（无论返回了什么）
     */
    value: string | number | boolean | any[] | ((op: Operation, keys: string[]) => any)
  }>

  /**
   * 所有 mock 的数据（包括叶子节点和对象节点和数组节点）都会经过此函数，此函数需要返回新的 mock 数据
   */
  generator?: (op: Operation, keys: string[], mock: any) => any
}

export interface Config extends parser2.Options {
  /** 指定名称，每个配置项应该保证名称唯一 */
  name: string
  /** 禁用，即运行命令时不会自动更新，除非指定了 name 为当前 name */
  disabled?: boolean
  /** 不生成 mock 数据 */
  disableMock?: boolean
  /** 指定是给前端用的还是给 node 用的 api，默认 fe */
  type?: 'fe' | 'node'
  /** 生成 javascript 还是 typescript 代码，默认 ts */
  language?: 'js' | 'ts'
  /** 指定 swagger json 的地址，可以是个 url 链接，或本地路径（相对于项目根目录） */
  json: string
  /** swagger ui 文档地址前缀，生成文档时会添加 /{tagName}/{apiName} 后缀用于点击跳转到文档位置 */
  docPrefix?: string
  /** 生成的 ts 所在的路径，如果没有指定此目录，则和 _config.js 文件同目录下的 name 文件夹 */
  outputDir?: string

  /** 是否输出 generate 相关的日志 */
  showGenerateLog?: boolean
  /** 显示更新日志 */
  showUpdateLog?: boolean

  /** 生成的 api 的名称，默认使用 Api[TagName] 的结构 */
  fileNameMap?: (oldName: string) => string | boolean

  /** mock 相关配置 */
  mock?: Mock
}

export interface ParsedConfig extends Config {
  outputDir: string
}
