import DocNode from "../../model/DocNode";

const docNodes = [
    new DocNode('192.168.1.1', 80),
    new DocNode('192.168.1.2',80),
    new DocNode('192.168.1.3',100)
]


function getAllNodes(){
    return docNodes
}

export {getAllNodes}
