var StatusENUMS = {

    ACTIVE:"ACTIVE",
    COMPLETE:"COMPLETE",
    DELETED:"DELETED",
};


var todos={

    1:{title:"Learn JavaScript",status:StatusENUMS.ACTIVE},
    2:{title:"Git tutorial",status:StatusENUMS.ACTIVE},
    3:{title:"Interactive Git",status:StatusENUMS.ACTIVE},
};

var next_todo_id=4;

module.exports={
    StatusEnums:StatusENUMS,
    todos:todos,
    next_todo_id:next_todo_id,
}