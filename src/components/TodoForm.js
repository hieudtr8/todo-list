import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  })

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      id: !props.edit ? Math.floor(Math.random() * 1000).toString() : props.edit.id.toString(),
      text: input,
    });
    setInput('');
  };
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a todo"
        value={input}
        name="text"
        onChange={handleChange}
        ref={inputRef}
        className='todo-input edit'

      />
      <button className="todo-button">{props.edit ? 'Edit task' : 'Add task' } </button>
    </form>
  );
}

export default TodoForm;
