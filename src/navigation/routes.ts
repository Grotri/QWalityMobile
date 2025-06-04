import AccountManagement from "../components/pages/AccountManagement";
import Admin from "../components/pages/Admin";
import FAQ from "../components/pages/FAQ";
import ForgotPassword from "../components/pages/ForgotPassword";
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import Main from "../components/pages/Main";
import Payment from "../components/pages/Payment";
import PaymentChange from "../components/pages/PaymentChange";
import Profile from "../components/pages/Profile";
import Registration from "../components/pages/Registration";
import Settings from "../components/pages/Settings";
import Subscription from "../components/pages/Subscription";
import SubscriptionChange from "../components/pages/SubscriptionChange";
import TrashBin from "../components/pages/TrashBin";
import { IAuthRoute, IMainRoute, ISubscriptionRoute } from "./types";

export const mainRoutes: IMainRoute[] = [
  {
    name: "Main",
    component: Main,
  },
  {
    name: "Profile",
    component: Profile,
  },
  {
    name: "Admin",
    component: Admin,
  },
  {
    name: "AccountManagement",
    component: AccountManagement,
  },
  {
    name: "FAQ",
    component: FAQ,
  },
  {
    name: "Settings",
    component: Settings,
  },
  {
    name: "TrashBin",
    component: TrashBin,
  },
  {
    name: "SubscriptionChange",
    component: SubscriptionChange,
  },
  {
    name: "PaymentChange",
    component: PaymentChange,
  },
];

export const authRoutes: IAuthRoute[] = [
  {
    name: "Home",
    component: Home,
  },
  {
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    name: "Login",
    component: Login,
  },
  {
    name: "Registration",
    component: Registration,
  },
];

export const subscriptionRoutes: ISubscriptionRoute[] = [
  {
    name: "Subscription",
    component: Subscription,
  },
  {
    name: "Payment",
    component: Payment,
  },
];
