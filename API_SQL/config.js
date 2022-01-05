// Load configuration from process.env.CONFIG
const STAGE = process.env.NODE_ENV || "dev"

/* eslint global-require:off, import/no-dynamic-require:off */
module.exports = process.env.CONFIG || require(`./config/${STAGE}`)
