declare module "color-namer" {
  interface ColorNames {
    ntc: { name: string; hex: string }[];
    pantone: { name: string; hex: string }[];
    html: { name: string; hex: string }[];
    basic: { name: string; hex: string }[];
  }

  function colorNamer(color: string): ColorNames;
  export default colorNamer;
}