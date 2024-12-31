import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react";

const customConfig = defineConfig({
  globalCss: {
    body: {
      background: "background",
    },
  },
  theme: {
    tokens: {
      colors: {
        background: { value: "#FAFAF5" },
      },
      fonts: {
        body: { value: "system-ui, sans-serif" },
      },
    },
    recipes: {},
  },
});

const system = createSystem(defaultConfig, customConfig);

export default system;
