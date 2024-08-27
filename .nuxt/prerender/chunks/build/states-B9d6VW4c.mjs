import { u as useState } from './server.mjs';

const useCurrentUser = () => useState("useCurrentUser", () => null);
const useCurrentUserProfile = () => useState("useCurrentUserProfile", () => null);

export { useCurrentUser as a, useCurrentUserProfile as u };
//# sourceMappingURL=states-B9d6VW4c.mjs.map
