import { Link } from "@material-ui/core";
import { PrimaryButton } from "@olympusdao/component-library";
import React from "react";
import { useWeb3Context, Web3ContextProvider } from "../../../hooks/Web3Context";

const ConnectButton: React.FC = () => {
  const { connect, provider, address, networkId } = useWeb3Context();

  return (
    <div>
      {!address ? (
        <Link onClick={connect}>
          <span>Connect Wallet</span>
        </Link>)
        : <div className='navbar-item'>
          <Link>
            {address}
            {/* <span className='lines'></span> */}
          </Link>
        </div>
      }
    </div>
  );
};

export default ConnectButton;
