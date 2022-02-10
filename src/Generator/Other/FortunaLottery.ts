import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface FortunaLotteryInterface extends utils.Interface {
  functions: {
    "getTickets(uint256)": FunctionFragment;
    "withdrawWinnings()": FunctionFragment;
    "updatePercentages(uint256,uint256,uint256)": FunctionFragment;
    "updateLottery(uint256,uint256,uint256)": FunctionFragment;
  }

  encodeFunctionData(
    functionFragment: "getTickets",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "withdrawWinnings", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "updatePercentages",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateLottery",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "getTickets", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdrawWinnings", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "updatePercentages", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "updateLottery", data: BytesLike): Result;
}

export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber],
  { owner: string; spender: string; value: BigNumber }
>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export type BurnEvent = TypedEvent<
  [string, BigNumber, BigNumber, string],
  { sender: string; amount0: BigNumber; amount1: BigNumber; to: string }
>;

export type BurnEventFilter = TypedEventFilter<BurnEvent>;

export type MintEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  { sender: string; amount0: BigNumber; amount1: BigNumber }
>;

export type MintEventFilter = TypedEventFilter<MintEvent>;

export type SwapEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, BigNumber, string],
  {
    sender: string;
    amount0In: BigNumber;
    amount1In: BigNumber;
    amount0Out: BigNumber;
    amount1Out: BigNumber;
    to: string;
  }
>;

export type SwapEventFilter = TypedEventFilter<SwapEvent>;

export type SyncEvent = TypedEvent<
  [BigNumber, BigNumber],
  { reserve0: BigNumber; reserve1: BigNumber }
>;

export type SyncEventFilter = TypedEventFilter<SyncEvent>;

export type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  { from: string; to: string; value: BigNumber }
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface FortunaLottery extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: FortunaLotteryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getTickets(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<ContractTransaction>;

    decimals(withdrawWinnings?: CallOverrides): Promise<[number]>;

    updatePercentages(
      lotteryPerc: BigNumberish,
      teamPerc: BigNumberish,
      charityPerc: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateLottery(
      ticketLimit: BigNumberish,
      ticketPerWalletLimit: BigNumberish,
      ticketPriceUpdate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  getTickets(
    amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<ContractTransaction>;

  decimals(withdrawWinnings?: CallOverrides): Promise<[number]>;

  updatePercentages(
    lotteryPerc: BigNumberish,
    teamPerc: BigNumberish,
    charityPerc: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateLottery(
    ticketLimit: BigNumberish,
    ticketPerWalletLimit: BigNumberish,
    ticketPriceUpdate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {

    getTickets(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<ContractTransaction>;

    decimals(withdrawWinnings?: CallOverrides): Promise<[number]>;

    updatePercentages(
      lotteryPerc: BigNumberish,
      teamPerc: BigNumberish,
      charityPerc: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateLottery(
      ticketLimit: BigNumberish,
      ticketPerWalletLimit: BigNumberish,
      ticketPriceUpdate: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  filters: {
    // "getTickets(uint256)"(
    //   amount: BigNumberish,
    //   spender: string,

    // ): ApprovalEventFilter;
    // Approval(
    //   owner?: string | null,
    //   spender?: string | null,
    //   value?: null
    // ): ApprovalEventFilter;

    // "updatePercentages(uint256,uint256,uint256)"(
    //   from?: string | null,
    //   to?: string | null,
    //   value?: null
    // ): TransferEventFilter;
    // Transfer(
    //   from?: string | null,
    //   to?: string | null,
    //   value?: null
    // ): TransferEventFilter;
  }
}

