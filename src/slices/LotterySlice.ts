import { BigNumber, BigNumberish, ethers, utils, Signer } from "ethers";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import * as React from 'react';
import { Provider } from "@ethersproject/providers";
import { Lottery__Factory } from '../Generator/Contracts/LotteryFactory'
import { USDC__Factory } from '../Generator/Contracts/USDCFactory'
import { DAI__Factory } from '../Generator/Contracts/DAIFactory'
import { IGetTicketsAsyncThunk } from './interfaces'

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


const returnObject = null;
export const getTicketsDAI = async (currentAddress: string, amount: string, provider: Signer | Provider, networkID: number) => {
    if (!provider) {
        return ("Please connect your wallet!");
    }
    console.log(currentAddress, amount, provider, networkID);
    const lotteryContract = Lottery__Factory.connect(addresses[networkID].LOTTERY_ADDRESS, provider);

    let approveTx;
    let ticketTx;
    const daiContract = DAI__Factory.connect(addresses[networkID].DAI_ADDRESS, provider);
    const allowance = await daiContract.allowance(currentAddress, lotteryContract.address)
    console.log(allowance);
    console.log(utils.parseEther(amount));
    if (allowance > utils.parseEther(amount)) {
        try {
            ticketTx = await lotteryContract.getTickets(amount);
            await ticketTx.wait();
        }
        catch (e: unknown) {

            return {
                success: false,
                message: (e as IJsonRPCError).message,
                hash: ticketTx.hash,
            }

        }
        finally {
            if (ticketTx) {
                return {
                    success: true,
                    message: "Transaction Successfull",
                    hash: ticketTx.hash,
                };
            }
        }
    }
    else {
        try {
            approveTx = await daiContract.approve(lotteryContract.address, utils.parseEther(amount))
            await approveTx.wait();
        } catch (e: unknown) {
            return {
                success: false,
                message: (e as IJsonRPCError).message,
                hash: approveTx.hash,
            };
        }
        finally {
            try {
                ticketTx = await lotteryContract.getTickets(amount);
                await ticketTx.wait();
            }
            catch (e: unknown) {
                return {
                    success: false,
                    message: (e as IJsonRPCError).message,
                    hash: ticketTx.hash,
                };
            }
            finally {
                if (ticketTx) {
                    return {
                        success: true,
                        message: "Transaction Successfull",
                        hash: ticketTx.hash,
                    };
                }
            }
        }
    }
}

export const getTicketsUSDC = async (currentAddress: string, amount: string, provider: Signer | Provider, networkID: number) => {
    if (!provider) {
        return ("Please connect your wallet!");
    }
    console.log(currentAddress, amount, provider, networkID);
    const lotteryContract = Lottery__Factory.connect(addresses[networkID].LOTTERY_ADDRESS, provider);

    let approveTx;
    let ticketTx;
    const usdcContract = USDC__Factory.connect(addresses[networkID].USDC_ADDRESS, provider);
    const allowance = await usdcContract.allowance(currentAddress, lotteryContract.address)

    if (allowance > utils.parseEther(amount)) {
        try {
            ticketTx = await lotteryContract.getTickets(amount);
            await ticketTx.wait();
        }
        catch (e: unknown) {
            return {
                success: false,
                message: (e as IJsonRPCError).message,
                hash: ticketTx.hash,
            };
        }
        finally {
            if (ticketTx) {
                return {
                    success: true,
                    message: "Transaction Successfull",
                    hash: ticketTx.hash,
                };
            }
        }
    }
    else {
        try {
            approveTx = await usdcContract.approve(lotteryContract.address, utils.parseEther(amount))
            await approveTx.wait();
        } catch (e: unknown) {
            return {
                success: false,
                message: (e as IJsonRPCError).message,
                hash: approveTx.hash,
            };
        }
        finally {
            try {
                ticketTx = await lotteryContract.getTickets(amount);
                await ticketTx.wait();
            }
            catch (e: unknown) {
                return {
                    success: false,
                    message: (e as IJsonRPCError).message,
                    hash: ticketTx.hash,
                };
            }
            finally {
                if (ticketTx) {
                    return {
                        success: true,
                        message: "Transaction Successfull",
                        hash: ticketTx.hash,
                    };
                }
            }
        }
    }
}

export const getTicketsMockTether = createAsyncThunk(
    "lottery/GetTicket",
    async ({ currentAddress, amount, provider, networkID }: IGetTicketsAsyncThunk, { dispatch }) => {
        if (!provider) {
            dispatch(error("Please connect your wallet!"));
        }
        console.log(currentAddress, amount, provider, networkID);
        // const signer = provider.getSigner();
        const lotteryContract = Lottery__Factory.connect(addresses[networkID].LOTTERY_ADDRESS, provider.getSigner());
        console.log("LotteryContract is ", lotteryContract);
        let approveTx;
        let ticketTx;
        const mockTetherContract = MockTether__Factory.connect(addresses[networkID].MOCKTETHER_ADDRESS, provider.getSigner());
        const allowance = await mockTetherContract.allowance(currentAddress, lotteryContract.address)

        console.log("MockTetherContract is ", mockTetherContract);
        console.log("Allowance is ", allowance);
        if (allowance > utils.parseEther(amount)) {
            try {
                console.log("Inside allowance bigger than if")
                ticketTx = await lotteryContract.getTickets(amount);
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
                approveTx = await mockTetherContract.approve(lotteryContract.address, utils.parseEther(amount));
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
                        ticketTx = await lotteryContract.getTickets(amount);
                        dispatch(
                            fetchPendingTxns({
                                txnHash: ticketTx.hash,
                                text: "Approving " + amount + "Of Tickets",
                                type: "approve_" + lotteryContract.name,
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