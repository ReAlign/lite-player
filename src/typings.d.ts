declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

interface IF_PluginMenuItem {
  label: string;
  key: string;
  fn: () => void;
}

interface IF_LitePlayer_Props {
  videoUrl: string;
  pluginMenu?: IF_PluginMenuItem[];
}
