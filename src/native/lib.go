package main

import (
	"fmt"
	"syscall/js"
)

func main() {
	fmt.Println("Hello, Go WebAssembly")

	js.Global().Set("say", js.FuncOf(alertFunc))

	alert := js.Global().Get("alert")
	alert.Invoke("test")
}

func alertFunc(this js.Value, args []js.Value) interface{} {
	// alert := js.Global().Get("alert")
	// alert.Invoke("test")

	fmt.Println("test")
	return nil
}