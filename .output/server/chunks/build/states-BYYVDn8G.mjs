import { b as useState } from './server.mjs';

const useCurrentUser = () => useState("useCurrentUser", () => null);
const useCurrentUserProfile = () => useState("useCurrentUserProfile", () => null);

export { useCurrentUser as a, useCurrentUserProfile as u };
//# sourceMappingURL=states-BYYVDn8G.mjs.map
