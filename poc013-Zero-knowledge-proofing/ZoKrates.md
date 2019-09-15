# ZoKrates

[![Join the chat at https://gitter.im/ZoKrates/Lobby](https://badges.gitter.im/ZoKrates/Lobby.svg)](https://gitter.im/ZoKrates/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Zokrates is a toolbox for zkSNARKs on Ethereum. 
_This is a proof-of-concept implementation. It has not been tested for production._

## Resources
https://www.youtube.com/watch?v=sSlrywb5J_0

https://github.com/JacobEberhardt/ZoKrates

## Using ZoKrates

ZoKrates provides a command line interface.
To see an overview of the available subcommands, run

```
./zokrates
```

### Example

To execute the program, perform the setup for the program, generate a proof
```
def add(a, b, c):
  return a + b + c
```
with `add(1, 2, 3)`, call
```
./zokrates compile -i 'add.code_path'
./zokrates compute-witness -a 1 2 3
./zokrates setup
./zokrates generate-proof
./zokrates export-verifier
```

## Building

Currently needs to be build with nightly Rust.

### Docker (Recommended)

Example usage:
```
docker build -t zokrates .
docker run -ti zokrates /bin/bash
cd ZoKrates
./target/release/zokrates compile -i examples/add.code
```

### Without libsnark
Build with the feature `nolibsnark`
```
cargo build --features nolibsnark
```

### Environment Variables
Set the libsnark library path in `LD_LIBRARY_PATH`
```
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib
```

## Testing

Run normal tests with
```
cargo test
```
and run long and expensive tests with
```
cargo test -- --ignored
```
