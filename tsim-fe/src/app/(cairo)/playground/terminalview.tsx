import dynamic from "next/dynamic"
import { Terminal } from "@xterm/xterm"
import { Fragment, useEffect } from "react"
// const DynamicTerminal = dynamic()



export const TerminalView = () => {
    useEffect(() => {
        var term = new Terminal();
        let teee = document.getElementById("terminal");
        if (teee) {
            term.open(teee);
            term.write("Hello World from the good side of the world")
        }
    }, [])

    return (
        <Fragment>
            <div id="terminal">
            </div>
        </Fragment>
    )
}