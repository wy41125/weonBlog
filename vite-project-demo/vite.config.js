import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// const chainWebpackConfig = (config) => {
//   config.module
//     .rule("worker-loader")
//     .test(/\.worker\.js$/)
//     .use({
//       loader: "worker-loader",
//       options: {
//         inline: true,
//       },
//     })
//     .loader("worker-loader")
//     .end();
// };

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
  	css: {
		loaderOptions: {
			less: {
				lessOptions: {
					modifyVars: {
						"primary-color": "#298CFF",
					},
					javascriptEnabled: true,
				},
			},
		},
	},
	// chainWebpack: (config) => chainWebpackConfig(config),
});
