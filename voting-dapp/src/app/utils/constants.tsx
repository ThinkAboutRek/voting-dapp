import { polygonAmoy } from "viem/chains";

export const SUPPORTED_NETWORKS: any = [polygonAmoy]; //TODO: change to mainnet chain
export const PARTICLE_OPTIONS = {//TODO: client provided keys
    projectId: "c0f5a469-ea09-4674-abf5-f1dead0b6920",
    clientKey: "c6zg9s9UZBUWPMmfwOtnFCLRh4yfGU3TvASWAO2f",
    appId: "4b44551c-8499-4a93-9d5e-003915c33d22",
    customStyle: {
      zIndex: 2147483650, // must greater than 2147483646
    },
  }
  export const WALLET_CONNECT_PROJECT_ID = '739e1b6df1475b28c372b00a8c67064a' 
  export const BACKEND_BASE_URL =
  "http://localhost:5001";
  export const CONTRACT_ADDRESS = '0xb7DFD4Ca6874F464c2274410494972eBF86A6D92';