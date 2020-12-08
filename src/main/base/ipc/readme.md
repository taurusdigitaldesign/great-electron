## ipc 

- emit(channel: string, data: object | Function, callback: Function): void;

- emit(channel: string, data: object | Function, callback: Function): Promise<any>;

- on(channel: string, callback: Function): void;

示例代码
``` javascript
/* browserWindow */
great.ipc.emit("ping", (event, data) => {
  console.log(data) // pong
})

// or

great.ipc.emit("ping").then((event, data) => {
  console.log(data) // pong
})

/* service */
great.ipc.on("ping", (event, params) => {
  console.log(params)  // ping
  return "pong" 
})

/* main */
ipc.on("ping", (event, params) => {
  console.log(params) //ping
  return "pong"
})
```
