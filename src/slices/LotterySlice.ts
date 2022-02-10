
import { BigNumber, BigNumberish, ethers, utils } from "ethers";
import * as React from 'react';
import { Lottery__Factory } from '../Generator/Contracts/LotteryFactory'
import { USDC__Factory } from '../Generator/Contracts/USDCFactory'
import { DAI__Factory } from '../Generator/Contracts/DAIFactory'

import { addresses, NetworkId } from "../networkDetails";
import { IJsonRPCError } from "./interfaces";
import { MockTether__Factory } from "../Generator/Contracts/MockTetherFactory";

export const getTicketsDAI = async ({ address, amount, provider, networkID }) => {
    if (!provider) {
        return ("Please connect your wallet!");
    }

    const signer = provider.getSigner();
    const lotteryContract = Lottery__Factory.connect(address, signer);

    let approveTx;
    let ticketTx;
    const daiContract = DAI__Factory.connect(addresses[networkID].DAI_ADDRESS, signer);
    const allowance = await daiContract.allowance(provider.address, address)

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

export const getTicketsUSDC = async ({ address, lottery, amount, provider, networkID }) => {
    if (!provider) {
        return ("Please connect your wallet!");
    }

    const signer = provider.getSigner();
    const lotteryContract = Lottery__Factory.connect(address, signer);

    let approveTx;
    let ticketTx;
    const usdcContract = USDC__Factory.connect(addresses[networkID].USDC_ADDRESS, signer);
    const allowance = await usdcContract.allowance(provider.address, address)

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

export const getTicketsMockTether = async ({ address, lottery, amount, provider, networkID }) => {
    if (!provider) {
        return ("Please connect your wallet!");
    }

    const signer = provider.getSigner();
    const lotteryContract = Lottery__Factory.connect(address, signer);

    let approveTx;
    let ticketTx;
    const mockTetherContract = MockTether__Factory.connect(addresses[networkID].MOCKTETHER_ADDRESS, signer);
    const allowance = await mockTetherContract.allowance(provider.address, address)

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
            approveTx = await mockTetherContract.approve(lotteryContract.address, utils.parseEther(amount))
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
