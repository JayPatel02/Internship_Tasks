require("dotenv").config()

const express = require("express")
const app = express()
const port = 3000

const { getData, getTotalRows, updateData , deleteData , searchData, getUpdateCount} = require("./db")

app.set('view engine', 'ejs')
app.use(express.static("public"))


app.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const sortBy = req.query.sortBy || 'student_id'
        const sortOrder = req.query.sortOrder || 'ASC';
        const update_id = parseInt(req.query.update_id) || null;
        const delete_id = parseInt(req.query.delete_id) || null;
        const searchStr = req.query.searchString || ""
        const searchCondition = req.query.condition || ""

        const saveId = req.query.save_id
        const newFn = req.query.firstN
        const newLn = req.query.lastN
        
        if(saveId && newFn && newLn){
            const updatedData = await updateData(saveId,newFn,newLn)
            return res.redirect(`?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`)
        }
        
        if(delete_id){
            const isDeleted = await deleteData(delete_id)
            return res.redirect(`?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`)
        }
        
        let rows = await getData(page, sortBy, sortOrder)
        
        let totalRows = await getTotalRows()
        let rowPerPage = process.env.RECORDPERPAGE
        
        let totalPages = Math.ceil(totalRows / rowPerPage)
        
        function symbolVal(sym){
            if(sym === "$") return `firstName`
            if(sym === "^") return `lastName`
            if(sym === "_") return `contact`
            if(sym === "[") return `email`
            if(sym === "]") return `city`
        }
        if(!(searchStr == "")){
            let symbolArr = ["$","^","_","[","]"]
            let queryArr = []
            let str = ""
            let sym = ""
            searchStr.split("").forEach( (ch,i) => {
                if(symbolArr.includes(ch)){
                    sym = ch
                }else if (i == searchStr.length - 1 || symbolArr.includes(searchStr[i+1]) ){
                    queryArr.push({
                        column:symbolVal(sym),param: str
                    })
                    str = ""
                    sym = ""
                }
                if(!symbolArr.includes(searchStr[i+1])){
                    str += searchStr[i+1]
                }
            });

            let searchDataDetails = await searchData(page,sortBy,sortOrder,queryArr,searchCondition)
            let totalSearchRow = await getUpdateCount(queryArr,searchCondition)

            let totalSearchPages = Math.ceil(totalSearchRow / rowPerPage)

            res.render("index", {
                rows: searchDataDetails,
                searchStr:searchStr,
                searchCondition:searchCondition,
                previousPage: page - 1,
                currentPage: page,
                nextPage: page + 1,
                totalPage: totalSearchPages,
                sortBy: sortBy,
                sortOrder: sortOrder,
                update_id:update_id,
                delete_id:delete_id
            })
        }
        else{
            res.render("index", {
                rows: rows,
                searchStr:searchStr,
                searchCondition:searchCondition,
                previousPage: page - 1,
                currentPage: page,
                nextPage: page + 1,
                totalPage: totalPages,
                sortBy: sortBy,
                sortOrder: sortOrder,
                update_id:update_id,
                delete_id:delete_id
            })
        }

    }catch(err){
        throw err
    }
})

app.listen(port, () => {
    console.log("Server Started....")
})