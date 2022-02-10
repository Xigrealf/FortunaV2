import { NetworkId } from "../constants/networkDetails";

export type AddressMap = Partial<Record<NetworkId, string>>;

export const LOTTERY_ADDRESS = {
  [NetworkId.POLYGON]: "",
  [NetworkId.POLYGON_TESTNET]: "0x50e843fb44a6d8620e5fc9cfa08756ef72380aa8"
};

export const MTETHER_ADDRESS = {
  [NetworkId.POLYGON_TESTNET]: "0xfC7293f04B051C61855e5b34847a2F1153757BEc"
}

export const DAI_ADDRESS = {
  [NetworkId.POLYGON]: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063"
}

export const USDC_ADDRESS = {
  [NetworkId.POLYGON]: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174"
}
