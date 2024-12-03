import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
   appId: "com.novelview.app",
   appName: "NovelView",
   webDir: "dist",
   server: {
      url: "http://10.0.0.8:8000",
      cleartext: true,
   },
};

export default config;
