set positional-arguments
set dotenv-load

mnemonic := env_var_or_default("DEV_MNEMONIC", "test test test test test test test test test test test junk")
sender := env_var_or_default("DEV_SENDER", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
mainnet := env_var("MAINNET_RPC_URL")
mainnet_pk := env_var("MAINNET_PRIVATE_KEY")
mainnet_sender := env_var("MAINNET_SENDER")
etherscan := env_var("ETHERSCAN_API_KEY")

#
# aliases
#

alias w := watch-test
alias d := dev

#
# public commands
#


# full dev stack
# 1. eth-watch (live-reloading anvil w/ deploy)
# 2. next.js
dev:
  #!/bin/bash -ue
  trap 'kill %1; kill %2' SIGINT
  just eth-watch | sed -e 's/^/\x1b[0;31m[node]\x1b[0m /' &
  just web 2>&1 | sed -e 's/^/\x1b[0;32m[next]\x1b[0m /' &
  wait

watch-test:
  forge test --watch -vvv

test:
  forge test

#
# private commands
#

# 1. build contracts
# 2. run test suite
# 4. wait a bit for anvil to boot, then run deploy script asynchronously
eth:
  #!/bin/bash
  killall -9 anvil
  just build-contracts
  just test
  sleep 2 && just eth-deploy &
  anvil --host 0.0.0.0 --silent

build-contracts:
  forge build

# start next.js dev server
web:
  yarn start

# restart `just eth` when contracts change
eth-watch:
  watchexec \
    --watch contracts \
    --watch test \
    --watch foundry.toml \
   --restart \
   --exts sol,toml \
   just eth

# deploy contracts for development
eth-deploy:
  just forge-script script/DevDeploy.s.sol

# run a forge script from the appropriate sender
forge-script script:
  forge script \
    $1 \
    --fork-url http://localhost:8545 \
    --broadcast \
    --mnemonics "{{ mnemonic }}" \
    --sender "{{ sender }}"

# run a forge script from the appropriate sender
mainnet-script script:
  forge script \
    $1 \
    --fork-url {{ mainnet }} \
    --private-key "{{ mainnet_pk }}" \
    --sender "{{ mainnet_sender }}" \
    --with-gas-price "35000000000" \
    --broadcast

verify:
  forge verify-contract \
    --etherscan-api-key {{ etherscan }} \
    --constructor-args $(cast abi-encode "constructor((address,address)[],uint16,uint16,uint16)" "[(0x6B175474E89094C44Da98b954EedeAC495271d0F,0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9),(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48,0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6),(0xdAC17F958D2ee523a2206206994597C13D831ec7,0x3E7d1eAB13ad0104d2750B8863b489D65364e32D)]" 1065 20 25) \
    --constructor-args ""
    0xBA0a02CC51C88D91bCad72d13aF266b8dC6881c2 \
    OffscriptPayment \
    --watch
