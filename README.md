# NFT Ticket Platform

## start
1. run `pnpm i`
2. to run any service run `pnpm -F @nft-ticket/<service> dev` for e.g. `pnpm -F @nft-ticket/web dev` to run NextJS.

### to run backedn
1. If you have never create the contracts run `pnpm -F @nft-ticket/contracts compile` to create ABI.
2. Run `docker run --name postgres -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres` to start postgresql service.
3. Execute `pnpm -F @nft-ticket/api` Will run NestJS on port 3000.