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

        console.log("MockTetherContract is ", USDCContract);
        console.log("Allowance is ", allowance);
        if (allowance > utils.parseEther(amount)) {
            try {
                console.log("Inside allowance bigger than if")
                ticketTx = await raffleContract.getTickets(amount);
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
                console.log("Inside allowance less than if", utils.parseEther(amount));
                approveTx = await USDCContract.approve(raffleContract.address, utils.parseEther(amount));
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
                    console.log("Transaciotn Approved!");
                    try {
                        console.log("Inside 2nd Try!");
                        ticketTx = await raffleContract.getTickets(amount);
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

export const getTicketsLeft = createAsyncThunk(
    "raffle/GetTicketsLeft",
    async ({ currentAddress, provider, networkID }: IGetInformation, { dispatch }) => {
        if (!provider) {
            dispatch(error("Please connect your wallet!"));
        }
        console.log(currentAddress, provider, networkID);
        // const signer = provider.getSigner();
        const raffleContract = Raffle__Factory.connect(addresses[networkID].RAFFLE_ADDRESS, provider.getSigner());
        console.log("RaffleContract is ", raffleContract);
        let ticketTx;

        try {
            ticketTx = await raffleContract.ticketsLeft();
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
);

export const getWinnings = createAsyncThunk(
    "raffle/GetCurrentWinnings",
    async ({ currentAddress, provider, networkID }: IGetInformation, { dispatch }) => {
        if (!provider) {
            dispatch(error("Please connect your wallet!"));
        }
        console.log(currentAddress, provider, networkID);
        // const signer = provider.getSigner();
        const raffleContract = Raffle__Factory.connect(addresses[networkID].RAFFLE_ADDRESS, provider.getSigner());
        console.log("RaffleContract is ", raffleContract);
        let winningsTx;

        try {
            winningsTx = await raffleContract.getWinningsAmount();
            await winningsTx.wait();
            console.log(winningsTx);
        } catch (e: unknown) {
            console.log((e as IJsonRPCError).message)
            dispatch(error((e as IJsonRPCError).message));
        } finally {
            if (winningsTx) {
                dispatch(clearPendingTxn(winningsTx.hash));
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
        console.log(currentAddress, provider, networkID);
        // const signer = provider.getSigner();
        const raffleContract = Raffle__Factory.connect(addresses[networkID].RAFFLE_ADDRESS, provider.getSigner());
        console.log("RaffleContract is ", raffleContract);
        let counterTx;

        try {
            counterTx = await raffleContract.getRaffleCounter();
            await counterTx.wait();
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
        console.log(currentAddress, provider, networkID);
        // const signer = provider.getSigner();
        const raffleContract = Raffle__Factory.connect(addresses[networkID].RAFFLE_ADDRESS, provider.getSigner());
        console.log("RaffleContract is ", raffleContract);
        let balanceTx;

        try {
            balanceTx = await raffleContract.getCurrentRaffleBalance();
            await balanceTx.wait();
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



export const getTicketsMockTether = createAsyncThunk(
    "lottery/GetTicket",
    async ({ currentAddress, amount, provider, networkID }: IGetTicketsAsyncThunk, { dispatch }) => {
        if (!provider) {
            dispatch(error("Please connect your wallet!"));
        }
        console.log(currentAddress, amount, provider, networkID);
        // const signer = provider.getSigner();
        const raffleContract = Raffle__Factory.connect(addresses[networkID].RAFFLE_ADDRESS, provider.getSigner());
        console.log("LotteryContract is ", raffleContract);
        let approveTx;
        let ticketTx;
        const mockTetherContract = MockTether__Factory.connect(addresses[networkID].MOCKTETHER_ADDRESS, provider.getSigner());
        const allowance = await mockTetherContract.allowance(currentAddress, raffleContract.address)

        console.log("MockTetherContract is ", mockTetherContract);
        console.log("Allowance is ", allowance);
        if (allowance > utils.parseEther(amount)) {
            try {
                console.log("Inside allowance bigger than if")
                ticketTx = await raffleContract.getTickets(amount);
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
                console.log("Inside allowance less than if", utils.parseEther(amount));
                approveTx = await mockTetherContract.approve(raffleContract.address, utils.parseEther(amount));
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
                    console.log("Transaciotn Approved!");
                    try {
                        console.log("Inside 2nd Try!");
                        ticketTx = await raffleContract.getTickets(amount);
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