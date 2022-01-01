const fs = require("fs");

const fileWrite = (text:string) => {
  fs.writeFileSync("gameResult.txt", "\n" + text)
}
export default fileWrite;

