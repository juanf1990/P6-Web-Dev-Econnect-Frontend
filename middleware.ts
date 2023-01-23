export { default } from "next-auth/middleware"

// secure the matching routes
export const config = { matcher : ["/"] };