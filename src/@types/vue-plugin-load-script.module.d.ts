declare module 'vue-plugin-load-script' {
  import { PluginFunction } from 'vue'

  export const install: PluginFunction<{}>

  interface loadScriptMethods {
    loadScript: (src: string) => Promise<any>;
    unloadScript: (src: string) => Promise<any>;
  }

  module 'vue/types/vue' {
    interface Vue {
      $loadScript: loadScriptMethods
    }
  }
}
