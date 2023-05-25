from beaker import *
from pyteal import *

app = Application("HelloWorld")

@app.external
def add(a: abi.Uint64, b: abi.Uint64, *, output: abi.Uint64) -> Expr:
    return output.set(a.get()+b.get())

if __name__ == "__main__":
    app.build().export("./artifacts")
