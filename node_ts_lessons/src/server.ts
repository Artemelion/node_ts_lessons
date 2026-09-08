import http from "node:http"
const PORT:number = 4200
import fs from "node:fs"
import path from "node:path"
 
/*
https://shop.com/product?name=phone&price=1000
params
query params
body
*/
const server = http.createServer((req,res)=>{
    const PATH_TO_PAGES = path.join("src", "pages")
    if(req.method==="GET" && req.url === '/')
    {
        const PATH_TO_INDEX_PAGE = path.join(PATH_TO_PAGES, "index.html")
        const content = fs.readFileSync(PATH_TO_INDEX_PAGE)
        res.setHeader("Content-Type", "text/html; charset=utf-8")
        res.write(content)
    }
    else if(req.method==="GET" && req.url ==='/about')
    {
        const PATH_TO_INDEX_PAGE = path.join(PATH_TO_PAGES, "about.html")
        const content = fs.readFileSync(PATH_TO_INDEX_PAGE)
        res.setHeader("Content-Type", "text/html; charset=utf-8")
        res.write(content)
    }
    else if(req.method === "POST"){
        res.setHeader("Content-Type", "application/json; charset=utf-8")
        const user = {
            name:"John",
            age:30
        }
        console.log("Request: ", req.url)
        if(req.url === "/user"){
        res.write(JSON.stringify(user))
        }
    }
     else if(req.method === "PUT"){
        res.setHeader("Content-Type", "text/html; charset=utf-8")
        res.write(`<h1>Ти хочеш оновити дані. Request: ${req.method}</h1>`)
    }
   
    res.end()
})
server.listen(PORT,()=>{
    console.log(`Server http://localhost:${PORT} has been started...`)
})