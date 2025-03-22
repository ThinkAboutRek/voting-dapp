"use client";
import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";
import { BACKEND_BASE_URL } from "../utils/constants";
import { useAccount } from "wagmi";

interface ModalContextProps {
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  kycStatus: string;
  kycAccessToken: string;
}

const KYCModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useKYCModal = () => {
  const context = useContext(KYCModalContext);
  if (!context) {
    throw new Error("useKYCModal must be used within a KYCModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const KYCModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [kycStatus, setKycStatus] = useState<string>("");
  const [kycAccessToken, setKycAccessToken] = useState<string>("");
  const { address: account } = useAccount();
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    if (account && kycAccessToken && kycStatus === "pending") {
      openModal();
    } else if (!account) {
      closeModal();
    }
  }, [kycAccessToken, account, kycStatus]);
  

  const applicantStatus = async (id: string) => {
    try {
      const _data = await axios.get(
        `${BACKEND_BASE_URL}/api/getapplicantstatus/`,
        {
          params: {
            applicantId: id,
          },
        }
      );
      return _data.data.reviewStatus;
    } catch (error) {
      return "";
    }
  };

  const getApplicantId = async (_account: string) => {
    try {
      const _data = await axios.get(`${BACKEND_BASE_URL}/api/getApplicant/`, {
        params: { externalUserId: _account },
      });
      return _data.data?.applicantId || null; // Return `null` instead of `undefined`
    } catch (error) {
      console.error("Error fetching applicant ID:", error);
      return null; // Ensure it returns a valid value
    }
  };
  

  const kycVerification = async (_account: string) => {
    let obj = {
      externalUserId: _account,
    };
    try {
      const _data: any = await axios.post(
        `${BACKEND_BASE_URL}/api/kycverification/`,
        obj
      );
      if (_data.status === 200) setKycAccessToken(_data?.response.token);
      else setKycAccessToken("");
    } catch (err) {
      setKycAccessToken("");
      console.log(err);
    }
  };

  const generateAccessToken = async (_account: string) => {
    let obj = { externalUserId: _account };
    try {
      const _data = await axios.post(`${BACKEND_BASE_URL}/api/generateAccessToken/`, obj);
      return _data.data?.token || "";
    } catch (err) {
      console.error("Failed to generate KYC access token:", err);
      return "";
    }
  };
  

  useEffect(() => {
    if (!account) return;
    (async () => {
      setKycAccessToken("");
      const _account = account?.toLowerCase();
      const userApplicantId = await getApplicantId(_account?.toLowerCase());

      const userStatus = await applicantStatus(userApplicantId);
      setKycStatus(userStatus);
      if (userStatus === "notFound")
        await kycVerification(_account?.toLowerCase());
      else {
        const accessToken = await generateAccessToken(_account);
        setKycAccessToken(accessToken);
      }
    })();
  }, [account]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
  
    const fetchData = async () => {
      const userApplicantId = await getApplicantId(account?.toLowerCase() as string);
      const userStatus = await applicantStatus(userApplicantId);
      setKycStatus(userStatus);
  
      if (userStatus === "completed" && interval) {
        clearInterval(interval);
      }
    };
  
    if (account) {
      interval = setInterval(fetchData, 5000);
    }
  
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [account]);
  

  return (
    <KYCModalContext.Provider
      value={{ showModal, openModal, closeModal, kycStatus, kycAccessToken }}
    >
      {children}
    </KYCModalContext.Provider>
  );
};
