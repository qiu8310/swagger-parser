import {Application, RequestConfig} from '@hujiang/foe-api'
import * as middleware from '@hujiang/foe-api/frontend'

/**
 * 默认配置，可以在子 base.ts 文件中修改
 */
const defaultApplicationOpts: RequestConfig.Init = {
  disableArgRequireCheck: true,
  debug: __DEV__,
  mock: {
    enabled: false,
    delay: Math.random() * 1400
  },
}

export function createApplication(type: 'petstore' | 'credit' | 'instal' | 'daybreak', opts?: RequestConfig.Init) {
  opts = {...defaultApplicationOpts, ...opts}
  let app = new Application(opts)

  app.use(
    middleware.debug(),
    async (ctx, next) => {
      await next()
      if (ctx.error && ctx.res && ctx.res.status === 401) {
        // @TODO: 判断接口返回的状态，可能需要在这里跳登录页去
      }
    },
    middleware.foe(),
    middleware.mock({app, mockEnvKey: __PROJECT__}),
    middleware.fetch()
  )

  return app
}
