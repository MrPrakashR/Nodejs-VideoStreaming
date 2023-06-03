const express = require("express")
const fs = require("fs")

const app = express()

const videoFileMap = {
    "cdn":"videos/cdn.mp4",
    "generate-pass":"videos/cdn.mp4",
    "get-post":"videos/cdn.mp4",
}

app.get("/videos/:filename",(req,res)=>{
    const fileName = req.params.filename
    const filePath = videoFileMap[fileName]

    if (!filePath) {
        return res.status(400).send("File Not Found")
    }

    const stat = fs.statSync(filePath)
    const filesize = stat.filesize
    const range = req.headers.range

    if (range) {

        let parts = range.replace("/bytes=/","").split("-")
        let start = parseInt(parts[0],10)
        let end = parts[1] ? parseInt(parts[1]) : filesize -1

        const contentChunk = end - start + 1
        const file = fs.createReadStream(filePath,{stat,end})
        const head = {
            'Content-Range':`bytes ${start}-${end}/${filesize}`,
            'Accept-Ranges':'bytes',
            'Content-Length':contentChunk,
            'Content-Type':'video/mp4'
        }
        res.writeHead(206,head)
        file.pipe(res)
    } else {

        const head = {
            'Content-Length':filesize,
            'Content-Type':'video/mp4'
        }
        res.writeHead(200,head)
        fs.createReadStream(filePath).pipe(res)
    }
    
})

app.listen(3000,()=>{
    console.log("app server listing on port 3000")
})