import { createContext } from "react";
import {globalState, action} from '../interface/interfaces'
import User from "../models/User";
const store = createContext<[globalState, React.Dispatch<action>] | null>(null!);

export default store;
