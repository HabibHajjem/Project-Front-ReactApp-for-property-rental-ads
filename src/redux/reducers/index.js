import { combineReducers } from "redux";
import { authReducer } from "./autReducer";
import { postReducer} from "./postReducer"

const rootReducer = combineReducers({
authReducer,postReducer
});

export default rootReducer
