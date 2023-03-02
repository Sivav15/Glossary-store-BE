

const tokenChecker = (req,res)=>{
try {

    res.status(200).json({
        message : true
    })
} catch (error) {
    res.status(500).json({
        message : "Server error"
    })
}
}

module.exports = tokenChecker;