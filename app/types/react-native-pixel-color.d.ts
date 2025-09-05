declare module "react-native-pixel-color" {
  export default class PixelColor {
    static getHex(
      uri: string,
      point: { x: number; y: number }
    ): Promise<string>;

    static getRGB(
      uri: string,
      point: { x: number; y: number }
    ): Promise<{ r: number; g: number; b: number; a: number }>;
  }
}