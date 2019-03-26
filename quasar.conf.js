// Configuration for your app

var path = require('path')

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'i18n',
      'axios',
      'vuelidate',
      'vuemoment',
      'satcomponents'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons' // optional, you are not bound to it
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing alias

          // Add your own alias like this
          mixins: path.resolve(__dirname, './src/mixins'),
          components: path.resolve(__dirname, './src/components'),
        }
      }
    },
    devServer: {
      https: true,
      port: 8443,
      open: false, // opens browser window automatically
      proxy: {
        '/ui': {
          target: 'https://' + (process.env.SAT_SERVER_HOST || 'localhost') + ':' + (process.env.SAT_SERVER_PORT || '8444'),
          changeOrigin: true,
          pathRewrite: {
            '^/ui': '/api'
          },
          secure: false
        }
      }
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        // Buttons
        'QBtn',
        'QBtnDropdown',
        'QBtnGroup',

        // Grouping
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCardActions',
        'QCollapsible',
        'QStepper',
        'QStep',
        'QStepperNavigation',

        // Form Components
        'QCheckbox',
        'QBtnToggle',
        'QField',
        'QInput',
        'QKnob',
        'QRadio',
        'QSelect',
        'QToggle',
        'QSearch',
        'QSlider',

        // List
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QItemSeparator',
        'QItemTile',

        // Layout
        'QFab',
        'QFabAction',
        'QLayout',
        'QLayoutHeader',
        'QLayoutFooter',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',

        // Progress
        'QSpinnerHourglass',
        'QSpinnerIos',

        // Popups
        'QPopover',
        'QModal',
        'QModalLayout',

        // Common
        'QTooltip',
        'QIcon',

        // Navigation
        'QPullToRefresh',
        'QToolbar',
        'QToolbarTitle',
        'QBreadcrumbs',
        'QBreadcrumbsEl',
        'QTabs',
        'QTab',
        'QTabPane',
        'QRouteTab',

        // Tree
        'QTree',

        // Data Table
        'QTable',
        'QTh',
        'QTr',
        'QTd',
        'QTableColumns',

        // Others
        'QChip',
        'QScrollArea',
      ],
      directives: [
        'Ripple',
        'CloseOverlay',
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'Loading',
        'SessionStorage',
        'LocalStorage',
        'Dialog'
      ]
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      // i18n: 'de' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack(cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
