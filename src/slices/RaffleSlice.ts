import { BigNumber, BigNumberish, ethers, utils, Signer } from "ethers";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import * as React from 'react';
import { Provider } from "@ethersproject/providers";
import { Raffle__Factory } from '../Generator/Contracts/LotteryFactory'
import { USDC__Factory } from '../Generator/Contracts/USDCFactory'
import { DAI__Factory } from '../Generator/Contracts/DAIFactory'
import { IGetInformation, IGetTicketsAsyncThunk } from './interfaces'

import { addresses, NetworkId } from "../constants/networkDetails";
import { IJsonRPCError } from "./interfaces";
import { MockTether__Factory } from "../Generator/Contracts/MockTetherFactory";
import { error, info } from "./MessagesSlice";
import { clearPendingTxn, fetchPendingTxns } from "./PendingTxnsSlice";

export type RaffleDetails = {
    readonly winnings: number;
    readonly prizePool: number;
    readonly ticketsLeft: number;
    readonly ticketsOwned: number;
    readonly raffleCounter: number;
}

export type transactionInformation = {
    success: boolean,
    message: string,
    hash: string
} | null;

export type transactionReturn = {
    return: transactionInformation;
} | null;

export const getTicketsUSDC = createAsyncThunk(
    "raffle/GetTicketUSDC",
    async ({ currentAddress, amount, provider, networkID }: IGetTicketsAsyncThunk, { dispatch }) => {
        if (!provider) {
            dispatch(error("Please connect your wallet!"));
        }
        console.log(currentAddress, amount, provider, networkID);
        // const signer = provider.getSigner();
        const raffleContract = Raffle__Factory.connect(addresses[networkID].RAFFLE_ADDRESS, provider.getSigner());
        console.log("RsffleContract is ", raffleContract);
        let approveTx;
        let ticketTx;
        const USDCContract = USDC__Factory.connect(addresses[networkID].USDC_ADDRESS, provider.getSigner());
        const allowance = await USDCContract.allowance(currentAddress, raffleContract.address)
        console.log("???? ~ file: RaffleSlice.ts ~ line 48 ~ allowance", Number(allowance))

        let a = amount + "0000000";
        console.log("???? ~ file: RaffleSlice.ts ~ line 258 ~ a", a)
        if (Number(allowance) >= Number(a)) {
            try {
                console.log("Inside allowance bigger than if")
                ticketTx = await raffleContract.getTickets(
                    amount);

                await ticketTx.wait();
                console.log(ticketTx);
            } catch (e: unknown) {
                console.log((e as IJsonRPCError).message)
                dispatch(error((e as IJsonRPCError).message));
            } finally {
                if (ticketTx) {
                    dispatch(clearPendingTxn(ticketTx.hash));
                }
            }
        }
        else {
            try {
                console.log("Inside allowance less than if", a);
                approveTx = await USDCContract.approve(raffleContract.address, a);
                dispatch(
                    fetchPendingTxns({
                        txnHash: approveTx.hash,
                        text: "Approving " + amount + "Of Tickets",
                        type: "approve_" + USDCContract.name,
                    })
                )
                await approveTx.wait();
                console.log("ApproveTx is : ", approveTx);
            } catch (e: unknown) {
                console.log((e as IJsonRPCError).message)
                dispatch(error((e as IJsonRPCError).message));
            } finally {
                if (approveTx) {
                    dispatch(clearPendingTxn(approveTx.hash));
                    console.log("Transaction Approved!");
                    try {
                        console.log("Inside 2nd Try!");
                        ticketTx = await raffleContract.getTickets(
                            amount);
                        dispatch(
                            fetchPendingTxns({
                                txnHash: ticketTx.hash,
                                text: "Approving " + amount + "Of Tickets",
                                type: "approve_" + raffleContract.name,
                            })
                        )
                        await ticketTx.wait();
                        console.log("TicketTx is : ", ticketTx);
                    } catch (e: unknown) {
                        console.log((e as IJsonRPCError).message)
                        dispatch(error((e as IJsonRPCError).message));
                    } finally {
                        if (ticketTx) {
                            dispatch(clearPendingTxn(approveTx.hash));
                        }
                    }
                }
            }
        }
    }
);

export const getRaffleInformation = createAsyncThunk(
    "raffle/getRaffleInformation",
    async ({ currentAddress, provider, networkID }: IGetInformation, { dispatch }): Promise<RaffleDetails> => {
        let ticketsLeft = 0,
            raffleCounter = 0,
            winnings = 0,
            prizePool = 0,
            ticketsOwned = 0;
        if (networkID === 80001 || networkID === 137) {
            try {
                try {
                    const ticketsResult = await dispatch(getTicketsLeft({ currentAddress, provider, networkID }),
                    ).unwrap();
                    console.log("???? ~ file: RaffleSlice.ts ~ line 123 ~ ticketsResult", ticketsResult)
                    ticketsLeft = Number(ticketsResult.toString());
                    console.log("???? ~ file: RaffleSlice.ts ~ line 125 ~ ticketsLeft", ticketsLeft)
                }
                catch (e: unknown) {
                    console.log((e as IJsonRPCError).message);
                    console.error("Returned a null response from dispatch(getTicketsLeft)");
                }
                try {
                    const winningsResult = await dispatch(getWinnings({ currentAddress, provider, networkID }),
                    ).unwrap();
                    console.log("???? ~ file: RaffleSlice.ts ~ line 133 ~ winningsResult", winningsResult)
                    winnings = Number(ethers.utils.formatEther(winningsResult.toString()));
                    console.log("???? ~ file: RaffleSlice.ts ~ line 134 ~ winnings", winnings)
                }
                catch {
                    console.error("Returned a null response from dispatch(getWinnings)");
                }
                try {
                    const counterResult = await dispatch(getRaffleCounter({ currentAddress, provider, networkID }),
                    ).unwrap();
                    raffleCounter = Number(counterResult.toString());
                    console.log("???? ~ file: RaffleSlice.ts ~ line 143 ~ raffleCounter", raffleCounter)
                }
                catch {
                    console.error("Returned a null response from dispatch(getRaffleCounter)");
                }
                try {
                    const currentBalanceResult = await dispatch(getCurrentRaffleBalance({ currentAddress, provider, networkID }),
                    ).unwrap();
                    prizePool = Number(ethers.utils.formatEther(currentBalanceResult.toString()));
                    console.log("???? ~ file: RaffleSlice.ts ~ line 152 ~ prizePool", prizePool)
                }
                catch {
                    console.error("Returned a null response from dispatch(getCurrentRaffleBalance)");
                }
                try {
                    const currentBalanceResult = await dispatch(getCurrentTickets({ currentAddress, provider, networkID }),
                    ).unwrap();
                    ticketsOwned = Number(currentBalanceResult.toString());
                }
                catch {
                    console.error("Returned a null response from dispatch(getCurrentTickets)");
                }
            }
            catch {
                console.error("Something Went Wrong In getRaffleInformation");
            }
        }
        return ({
            winnings: winnings,
            prizePool: prizePool,
            ticketsLeft: ticketsLeft,
            ticketsOwned: ticketsOwned,
            raffleCounter: raffleCounter
        })
    });

export const getTicketsLeft = createAsyncThunk(
    "raffle/GetTicketsLeft",
    async ({ currentAddress, provider, networkID }: IGetInformation, { dispatch }) => {
        if (!provider) {
            dispatch(error("Please connect your wallet!"));
        }
        console.log("Information", currentAddress, provider, networkID);

        const raffleContract = Raffle__Factory.connect(addresses[networkID].RAFFLE_ADDRESS, provider.getSigner());
        console.log("RaffleContract is ", raffleContract);
        let ticketTx;

        try {
            ticketTx = await raffleContract.ticketsLeft();
            console.log(ticketTx);
        } catch (e: unknown) {
            console.log((e as IJsonRPCError).message)
            dispatch(error((e as IJsonRPCError).message));
        } finally {
            if (ticketTx) {
                dispatch(clearPendingTxn(ticketTx.hash));
                return ticketTx;
            }
        }
    }
);

export const getWinnings = createAsyncThunk(
    "raffle/GetCurrentWinnings",
    async ({ currentAddress, provider, networkID }: IGetInformation, { dispatch }) => {
        if (!provider) {
            dispatch(error("Please connect your wallet!"));
        }
        console.log("Information", currentAddress, provider, networkID);

        const raffleContract = Raffle__Factory.connect(addresses[networkID].RAFFLE_ADDRESS, provider.getSigner());
        console.log("RaffleContract is ", raffleContract);
        let winningsTx;

        try {
            winningsTx = await raffleContract.getWinningsAmount();
            console.log(winningsTx);
        } catch (e: unknown) {
            console.log((e as IJsonRPCError).message)
            dispatch(error((e as IJsonRPCError).message));
        } finally {
            if (winningsTx) {
                dispatch(clearPendingTxn(winningsTx.hash));
                return winningsTx;
            }
        }
    }
);

export const getRaffleCounter = createAsyncThunk(
    "raffle/GetRaffleCounter",
    async ({ currentAddress, provider, networkID }: IGetInformation, { dispatch }) => {
        if (!provider) {
            dispatch(error("Please connect your wallet!"));
        }
        console.log("Information", currentAddress, provider, networkID);

        const raffleContract = Raffle__Factory.connect(addresses[networkID].RAFFLE_ADDRESS, provider.getSigner());
        console.log("RaffleContract is ", raffleContract);
        let counterTx;

        try {
            counterTx = await raffleContract.raffleCounter();
            console.log(counterTx);
        } catch (e: unknown) {
            console.log((e as IJsonRPCError).message)
            dispatch(error((e as IJsonRPCError).message));
        } finally {
            if (counterTx) {
                dispatch(clearPendingTxn(counterTx.hash));
                return counterTx;
            }
        }
    }
);

export const getCurrentRaffleBalance = createAsyncThunk(
    "raffle/GetCurrentRaffleBalance",
    async ({ currentAddress, provider, networkID }: IGetInformation, { dispatch }) => {
        if (!provider) {
            dispatch(error("Please connect your wallet!"));
        }
        console.log("Information", currentAddress, provider, networkID);

        const raffleContract = Raffle__Factory.connect(addresses[networkID].RAFFLE_ADDRESS, provider.getSigner());
        console.log("RaffleContract is ", raffleContract);
        let balanceTx;

        try {
            balanceTx = await raffleContract.getCurrentRaffleBalance();
            console.log(balanceTx);
        } catch (e: unknown) {
            console.log((e as IJsonRPCError).message)
            dispatch(error((e as IJsonRPCError).message));
        } finally {
            if (balanceTx) {
                dispatch(clearPendingTxn(balanceTx.hash));
                return balanceTx;
            }
        }
    }
);

//GetCurrentTickets
export const getCurrentTickets = createAsyncThunk(
    "raffle/GetCurrentRaffleBalance",
    async ({ currentAddress, provider, networkID }: IGetInformation, { dispatch }) => {
        if (!provider) {
            dispatch(error("Please connect your wallet!"));
        }
        console.log("Information", currentAddress, provider, networkID);
        const raffleContract = Raffle__Factory.connect(addresses[networkID].RAFFLE_ADDRESS, provider.getSigner());
        console.log("RaffleContract is ", raffleContract);
        let ticketTx;

        try {
            ticketTx = await raffleContract.getCurrentTickets();
            console.log(ticketTx);
        } catch (e: unknown) {
            console.log((e as IJsonRPCError).message)
            dispatch(error((e as IJsonRPCError).message));
        } finally {
            if (ticketTx) {
                dispatch(clearPendingTxn(ticketTx.hash));
                return ticketTx;
            }
        }
    }
);

export const claimWinnings = createAsyncThunk(
    "lottery/claimWinnings",
    async ({ currentAddress, provider, networkID }: IGetInformation, { dispatch }) => {
        const raffleContract = Raffle__Factory.connect(addresses[networkID].RAFFLE_ADDRESS, provider.getSigner());
        console.log("LotteryContract is ", raffleContract);
        let claimTx;
        try {
            console.log("Claim Winnings Try")
            claimTx = await raffleContract.withdrawWinnings();
            await claimTx.wait();
            console.log(claimTx);
        } catch (e: unknown) {
            console.log((e as IJsonRPCError).message)
            dispatch(error((e as IJsonRPCError).message));
        } finally {
            if (claimTx) {
                dispatch(clearPendingTxn(claimTx.hash));
            }
        }
    }
)

export const getTicketsMockTether = createAsyncThunk(
    "lottery/GetTicket",
    async ({ currentAddress, amount, provider, networkID }: IGetTicketsAsyncThunk, { dispatch }) => {
        if (!provider) {
            dispatch(error("Please connect your wallet!"));
        }
        console.log(currentAddress, amount, provider, networkID);
        const raffleContract = Raffle__Factory.connect(addresses[networkID].RAFFLE_ADDRESS, provider.getSigner());
        console.log("LotteryContract is ", raffleContract);
        let approveTx;
        let ticketTx;
        const mockTetherContract = MockTether__Factory.connect(addresses[networkID].MOCKTETHER_ADDRESS, provider.getSigner());
        const allowance = await mockTetherContract.allowance(currentAddress, raffleContract.address)
        const gasPrice = await provider.getGasPrice();

        let a = amount + "0";
        console.log("???? ~ file: RaffleSlice.ts ~ line 258 ~ a", a)
        if (Number(allowance) > Number(utils.parseEther(a))) {
            try {
                console.log("Inside allowance bigger than if")
                ticketTx = await raffleContract.getTickets(
                    amount);

                await ticketTx.wait();
                console.log(ticketTx);
            } catch (e: unknown) {
                console.log((e as IJsonRPCError).message)
                dispatch(error((e as IJsonRPCError).message));
            } finally {
                if (ticketTx) {
                    dispatch(clearPendingTxn(ticketTx.hash));
                }
            }
        }
        else {
            try {
                console.log("Inside allowance less than if", utils.parseEther(a));
                approveTx = await mockTetherContract.approve(raffleContract.address, utils.parseEther(a));
                dispatch(
                    fetchPendingTxns({
                        txnHash: approveTx.hash,
                        text: "Approving " + amount + "Of Tickets",
                        type: "approve_" + mockTetherContract.name,
                    })
                )
                await approveTx.wait();
                console.log("ApproveTx is : ", approveTx);
            } catch (e: unknown) {
                console.log((e as IJsonRPCError).message)
                dispatch(error((e as IJsonRPCError).message));
            } finally {
                if (approveTx) {
                    dispatch(clearPendingTxn(approveTx.hash));
                    console.log("Transaction Approved!");
                    try {
                        console.log("Inside 2nd Try!");
                        ticketTx = await raffleContract.getTickets(
                            amount);
                        dispatch(
                            fetchPendingTxns({
                                txnHash: ticketTx.hash,
                                text: "Approving " + amount + "Of Tickets",
                                type: "approve_" + raffleContract.name,
                            })
                        )
                        await ticketTx.wait();
                        console.log("TicketTx is : ", ticketTx);
                    } catch (e: unknown) {
                        console.log((e as IJsonRPCError).message)
                        dispatch(error((e as IJsonRPCError).message));
                    } finally {
                        if (ticketTx) {
                            dispatch(clearPendingTxn(approveTx.hash));
                        }
                    }
                }
            }
        }
    }
);