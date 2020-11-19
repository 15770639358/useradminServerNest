export function fromtDatatolist(objArr) {
    let childArr = []
    objArr.forEach(obj => {
        if((obj.category+'').length === 2){
            let childObj = {}
            for(let key in obj) {
                childObj[key] = obj[key]
            }
            if(objHasChild(objArr, obj.category, 2)) {
                childObj['child'] = []
            }
            let a = filterChilds(objArr,childObj,4)
            childArr.push(a)
        }
    })
    return childArr
}

let filterChilds = (objArr,childObj,limit) => {
    objArr.forEach(obj => {
        if((obj.category+'').length === limit && (obj.category+'').substring(0,limit-2) === (childObj.category+'').substring(0,limit-2)){
            let Objchild = {}
            for(let key in obj) {
                Objchild[key] = obj[key]
            }
            if(objHasChild(objArr, obj.category, limit)){
                Objchild['child']= []
            }
            let childAuth = filterChilds(objArr,Objchild,limit+2)
            childObj['child'].push(childAuth)
        }
    })
    return childObj
}

function objHasChild (objArr, category, limit) {

    return objArr.some((obj) => {return (obj.category+'').length === limit + 2 && (obj.category+'').substring(0,limit) === (category+'').substring(0,limit)})
}