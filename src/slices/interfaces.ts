import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";

export interface IJsonRPCError {
    readonly message: string;
    readonly code: number;
  }
  