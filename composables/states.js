// global state for the current user
export const useCurrentUser = () => useState( 'useCurrentUser', () => null )

// global state for the current user's profile
export const useCurrentUserProfile = () => useState( 'useCurrentUserProfile', () => null )