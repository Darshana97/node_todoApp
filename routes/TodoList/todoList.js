const { Router } = require("express");

const { uuid } = require("uuidv4");

let toDoList = [{
        id: uuid(),
        title: "Learn Angular",
        description: "Angular with ngrx",
    },
    {
        id: uuid(),
        title: "Learn Java",
        description: "Java with intelij idea",
    },
];

const router = Router();

router.get("/todo", (req, res) => {
    return res.json(toDoList);
});

router.get("/todoId/:id", (req, res) => {
    const num = req.params.id;
    return res.json(toDoList[num - 1]);
});

router.get("/todos/:idNo", (req, res) => {
    const idNum = req.params.idNo;
    const mytodo = toDoList.filter((todo) => todo.id === idNum);
    if (mytodo) {
        return res.status(200).json(mytodo);
    }
    return res.status(204).json();
});

router.post("/add", (req, res) => {
    const myBody = req.body;
    myBody.id = uuid();
    toDoList = [...toDoList, myBody];
    return res.json(toDoList);
});

router.delete("/del/:delId", (req, res) => {
    const idNum = req.params.delId;
    const isHere = toDoList.some((todo) => todo.id === idNum);
    if (!isHere) {
        return res.json("Todo not Found");
    }
    newtoDoList = toDoList.filter((todo) => todo.id !== idNum);
    toDoList = newtoDoList;
    return res.json(toDoList);
});

router.put("/edit1/:eId", (req, res) => {
    const idNo = req.params.eId;
    const myBody = req.body;
    const idHere = toDoList.some((todo) => todo.id === idNo);
    if (!idHere) {
        return res.json("Todo not found");
    }
    const newToDoList = toDoList.filter((todo) => todo.id !== idNo);
    toDoList = newToDoList;

    const myTodo = { idNo, ...myBody };
    toDoList = [...toDoList, myTodo];
    return res.json(toDoList);
});

router.put("/edit2/:num", (req, res) => {
    const myIdnum = req.params.num;
    const { title, description } = req.body;
    const index = toDoList.findIndex((todo) => todo.id === myIdnum);
    if (index < 0) {
        return res.json("Id not found");
    }
    toDoList[index].title = title;
    toDoList[index].description = description;
    return res.json(toDoList);
});

module.exports = router;