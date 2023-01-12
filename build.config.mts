import { defineConfig } from '@ice/pkg';

// https://pkg.ice.work/reference/config-list
export default defineConfig({
  plugins: [
    [
      '@ice/pkg-plugin-docusaurus',
      {
        /**
         * 是否启用文档预览构建，默认为 true
         */
        // enable?: boolean | { start: boolean; build: boolean };
        /**
         * 文档的 title，默认为 "飞冰组件"
         */
        // title?: string;
        title: 'LitePlayer',
        /**
         * 文档部署的顶层 url。比如部署在 github，则是 https://你的项目.github.io
         */
        // url?: string;
        /**
         * 文档路由的 baseUrl。
         */
        // baseUrl?: string;
        /**
         * 文档站点的 favicon 文件位置，默认为 static/img/favicon.ico
         */
        // favicon?: string;
        favicon: 'https://kaola-haitao.oss.kaolacdn.com/b7665e06-e5ab-4fdf-8d24-bfe27a188efe.svg',
        /**
         * 侧边栏 logo，默认为 static/img/logo.png
         */
        // navBarLogo?: string;
        navBarLogo: 'https://kaola-haitao.oss.kaolacdn.com/b7665e06-e5ab-4fdf-8d24-bfe27a188efe.svg',
        /**
         * 侧边栏 title，默认为 "ICE PKG"
         */
        // navBarTitle?: string;
        navBarTitle: 'LitePlayer',
        /**
         * 文档启动的端口，默认为 4000
         */
        // port?: number;
        /**
         * 自定义 sidebar
         */
        // sidebarItemsGenerator?: Function;
        /**
         * 开启移动端组件预览
         */
        // mobilePreview?: boolean;
        /**
         * 文档默认语言，默认值为 zh-Hans，即中文
         */
        // defaultLocale?: string;
        /**
         * 文档需要构建的多语言版本，必须包含 defaultLocale，默认值为 ['zh-Hans']，即中文
         */
        // locales?: string[];
      },
    ],
  ],
  alias: {
    '@': './src',
  },
});
