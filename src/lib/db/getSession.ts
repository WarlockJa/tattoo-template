import { auth } from "@auth/auth";
import { cache } from "react";

// deduped auth request
export default cache(auth);
