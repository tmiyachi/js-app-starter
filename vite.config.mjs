import { defineConfig } from 'vite';
import license from 'rollup-plugin-license';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BANNER = `
/*! FOLLOWING LIBRARIES ARE USED.
 */`;

export default defineConfig(({ mode }) => {
  return {
    root: path.resolve(__dirname, 'src'),
    // base: './', // ルートではないパブリックパスにデプロイする場合
    publicDir: path.resolve(__dirname, 'public'),
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    build: {
      // target: ['firefox86'], // バンドルのブラウザ互換性のターゲットを指定する
      outDir: '../dist',
      assetsDir: 'assets',
      // assetsInlineLimit: 0,  // アセットのをbase64インライン化を無効にする場合
      // sourcemap: true,
      emptyOutDir: true, // ビルド時に outDir を空にする

      // assetsInclude
      rollupOptions: {
        output: {
          entryFileNames: '[name].bundle.js',
          chunkFileNames: `js/[name].js`, // vendor chunk filenames
          assetFileNames: `assets/[name].[ext]`, // CSSもassetsになる
        },
        plugins: [
          license({
            sourcemap: true,
            banner: BANNER,
            thirdParty: {
              // includePrivate: true, // Default is false.
              // multipleVersions: true, // Default is false.
              // output: {
              //   file: path.join(__dirname, 'dist', 'DEPENDENCIES.txt'),
              // },
            },
          }),
        ],
      },
    },

    server: {
      port: 8080,
      open: true,
      proxy: {
        // '/api': 'http://localhost:8081',
        // '/api': {
        //  target: 'http://example.com',
        //  changeOrigin: true,
        //  rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  };
});
