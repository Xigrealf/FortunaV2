import { EnvHelper } from "./Environment";
import { NodeHelper } from "./NodeHelper";
import { ethers, utils } from "ethers";
import Lottery from "../data/Contracts/Lottery.json"
import DAI from "../data/Contracts/DAI.json"
import USDC from "../data/Contracts/USDC.json"
import Tether from "../data/Contracts/MockTether.json"

// Returns Ticket Count
export const getTicketsLeft = async ({ provider, networkID }) => {

    return "";
}
// Buys Tickets For The Amount Requested
export async function getTickets(amount, { provider, networkID }) {

}

//Checks If Apprval Enough To Buy Ticket
export const isApprovalEnough = async (amount, { provider, networkID }) => {
    return true;
}

//Gets The Winnings Of Current Provider
export const getWinningAmount = async ({ provider, networkID }) => {
    
    return "";
}