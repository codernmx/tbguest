module.exports = {
  publicPath: "./", // 基本路径
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'api': '@/api',
        'views': '@/views',
      }
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://file.nmxgzs.cn',
        ws: true,
        changOrigin: true,
        // pathRewrite: {
        //         '^/api': '',
        // }

      },
      '^/DataApi': {
        target: 'http://api.xuandan.com/',
        ws: true,
        changOrigin: true,
        // pathRewrite: {
        //         '^/api': '',
        // }

      },
      '^/tbk': {
        target: 'http://82.156.117.112:9191/',//服务器
        // target: 'http://127.0.0.1:9191/',//本地
        ws: true,
        changOrigin: true,
        // pathRewrite: {
        //         '^/api': '',
        // }

      },
      '^/xxx': {
        target: 'http://127.0.0.1:9191/',
        ws: true,
        changOrigin: true,
        // pathRewrite: {
        //         '^/api': '',
        // }

      },
      //淘宝联盟
      '^/tblm': {
        target: 'http://82.156.117.112:3031/',
        ws: true,
        changOrigin: true,
        // pathRewrite: {
        //         '^/api': '',
        // }

      },
      '^/item_detail': {
        target: 'http://v2.api.haodanku.com',
        ws: true,
        changOrigin: true,
        // pathRewrite: {
        //   '/item_detail': '',
        // }

      }
    },



  }
}
