import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { BigNumber, BigNumberish } from "ethers";
import { NetworkId } from "../constants/networkDetails";

export interface IJsonRPCError {
  readonly message: string;
  readonly code: number;
}


export interface IBaseAsyncThunk {
  readonly networkID: NetworkId;
  readonly provider: StaticJsonRpcProvider | JsonRpcProvider;
}

export interface IGetTicketsAsyncThunk extends IBaseAsyncThunk {
  readonly amount: string,
  readonly currentAddress: string;
}

export interface IGetInformation extends IBaseAsyncThunk {
  readonly currentAddress: string;
}

