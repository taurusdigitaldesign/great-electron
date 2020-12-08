package main

/*
URL: http://myexternalip.com/#golang
*/

import (
    "fmt"
	"io/ioutil"
	"net/http"
	"os"
)

func main() {
	resp, err := http.Get("http://myexternalip.com/raw")
	if err != nil {
        fmt.Fprintf(os.Stderr, "fetch: %v\n", err)
        os.Exit(1)
    }
    fmt.Println("get")
    b, err := ioutil.ReadAll(resp.Body)
    resp.Body.Close()
    if err != nil {
        fmt.Fprintf(os.Stderr, "fetch: reading: %v\n", err)
        os.Exit(1)
    }
	fmt.Printf("%s", b)
}
