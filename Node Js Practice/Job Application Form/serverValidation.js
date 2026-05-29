const validator = require("validator")

function basicVal(req, res, next) {
    let err = []
    if (!validator.isAlpha(req.body.firstName)) {
        err.push("Not a valid first name.")
    }
    if (!validator.isAlpha(req.body.lastName)) {
        err.push("Not a valid last name.")
    }
    if (validator.isEmpty(req.body.designation)) {
        err.push("Not a valid designation.")
    }
    if (!validator.isLength(req.body.address1, { min: 5 })) {
        err.push("Not a valid address 1.")
    }
    if (req.body.address2 != "") {
        if (!validator.isLength(req.body.address2, { min: 5 })) {
            err.push("Not a valid address 2.")
        }
    }
    if (!validator.isEmail(req.body.email)) {
        err.push("Not a valid email.")
    }
    if (!validator.isLength(req.body.phoneNumber, { max: 10 ,min:10 })) {
        err.push("Not a valid Phone Number.")
    }
    if (!validator.isAlpha(req.body.cityName)) {
        err.push("Not a valid City Name.")
    }
    if (!validator.isLength(req.body.pinCode, { max: 6 }) && !validator.isNumeric(req.body.pinCode)) {
        err.push("Not a valid Pin Code.")
    }
    if (!validator.isBefore(req.body.dateOfBirth, { comparisonDate: Date().toString() })) {
        err.push("Not a valid Date Of Birth.")
    }
    if (Object.keys(req.body).includes("peferedLoc") == false) {
        err.push("Select Prefered Location")
    }
    if (req.body.noticePeriod != "") {
        if (!validator.isNumeric(req.body.noticePeriod)) {
            err.push("Not a valid Notice Period.")
        }
    }
    if (!validator.isNumeric(req.body.expactedCtc)) {
        err.push("Not a valid Expected CTC.")
    }
    if (!validator.isNumeric(req.body.currentCtc)) {
        err.push("Not a valid Current CTC.")
    }

    if (err.length > 0) {
        res.send(err)
        return
    }
    next()
}

function eduVal(req, res, next) {
    let err = []
    if (!Object.keys(req.body).includes("education")) {
        err.push("Atleast One Education field is must.")
        res.send(err)
        return 
    }

    req.body.education.forEach(ele => {
        if (!validator.isNumeric(ele.passingYear)) {
            err.push("Not a valid passing Year.")
        }
        if (!validator.isAlpha(ele.uniBod)) {
            err.push("Not a valid passing Year.")
        }
        if (!validator.isNumeric(ele.result)) {
            err.push("Not a valid result.")
        }
    });

    if (err.length > 0) {
        res.send(err)
        return
    }
    next()
}

function compVal(req, res, next) {
    let err = []
    if (!Object.keys(req.body).includes("company")) {
        err.push("Atleast One Company field is must.")
        res.send(err)
        return
    }

    req.body.company.forEach(ele => {
        if (!validator.isAlpha(ele.company)) {
            err.push("Not a valid Company Name")
        }
        if (!validator.isBefore(ele.fromDate, { comparisonDate: Date().toString() })) {
            err.push("Not a valid From Date")
        }
        if (!validator.isBefore(ele.toDate, { comparisonDate: Date().toString() })) {
            err.push("Not a valid To Date")
        }
        if (!validator.isNumeric(ele.annualPackage)) {
            err.push("Not a valid Annual Package.")
        }
        if (!validator.isAlpha(ele.reasonToLeave)) {
            err.push("Not a valid Reason To Leave")
        }
        if (!validator.isLength(ele.refContNumber, { max: 10 , min:10 })) {
            err.push("Not a valid Phone Number.")
        }
        if (!validator.isAlpha(ele.refContName)) {
            err.push("Not a valid Name")
        }
    });

    if (err.length > 0) {
        res.send(err)
        return
    }
    next()
}

function langVal(req,res,next){
    console.log(Object.keys(req.body))
    if (!Object.keys(req.body).includes("lang")) {
        res.send("Atleast One language field is must.")
        return
    }

    next()
} 

function techVal(req,res,next){
    console.log(Object.keys(req.body))
    if (!Object.keys(req.body).includes("tech")) {
        res.send("Atleast One Technology field is must.")
        return
    }
    next()
} 

function refVal(req,res,next){
    let err = []
    if (req.body.refName1 != "") {
        if (!validator.isAlpha(req.body.refName1)) {
            err.push("Not a valid Name.")
        }
    }
    if (req.body.refName2 != "") {
        if (!validator.isAlpha(req.body.refName2)) {
            err.push("Not a valid Name.")
        }
    }
    if (req.body.refContNum1 != "") {
        if (!validator.isNumeric(req.body.refContNum1)) {
            err.push("Not a valid Number.")
        }
    }
    if (req.body.refContNum2 != "") {
        if (!validator.isNumeric(req.body.refContNum2)) {
            err.push("Not a valid Number.")
        }
    }
    if (req.body.refRel1 != "") {
        if (!validator.isAlpha(req.body.refRelation1)) {
            err.push("Not a valid Relation.")
        }
    }
    if (req.body.refRel2 != "") {
        if (!validator.isAlpha(req.body.refRelation2)) {
            err.push("Not a valid Relation.")
        }
    }
    next()
}

module.exports = {basicVal,eduVal,compVal,langVal,techVal,refVal}