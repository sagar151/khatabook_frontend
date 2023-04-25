import { RxDashboard } from "react-icons/rx";
import { FcDebt } from "react-icons/fc";
import { FiCreditCard } from "react-icons/fi";

export const Sidebar = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: <RxDashboard />,
  },
  {
    name: "Creditor",
    url: "/creditor",
    icon: <FiCreditCard />,
  },
  {
    name: "Debtor",
    url: "/debtor",
    icon: <FcDebt />,
  },
];
