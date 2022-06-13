import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri/';
import { TiEdit } from 'react-icons/ti';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
function Todo({ todos, completeTodo, removeTodo, editTodos,setTodos }) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    isComplete: false,
  });
  const submitUpdate = (value) => {
    editTodos(edit.id, value, edit.isComplete);
    console.log(edit);
    setEdit({
      id: null,
      value: '',
      isComplete: false,
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index,1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);

  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onClick={() => completeTodo(todo.id)}
                    className={
                      todo.isComplete ? 'todo-row complete' : 'todo-row'
                    }
                    key={index}
                  >
                    <div key={todo.id}>{todo.text}</div>
                    <div className="icon">
                      <RiCloseCircleLine
                        onClick={() => removeTodo(todo.id)}
                        className="delete-icon"
                      />
                      <TiEdit
                        onClick={() =>
                          setEdit({ id: todo.id, value: todo.text })
                        }
                        className="edit-icon"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
 
}

export default Todo;
