import React from 'react'

function Form({isReq, handleSubmit, task, handleChange}) {
    return (
        <div>
            <form className='flex justify-center' onSubmit={handleSubmit}>
                <div className='mr-10'>
                    <label className="block">Title:</label>
                    <input type="text" name="title" className="w-96 mb-4" value={task.title} required = {isReq}
                        onChange={handleChange} />
                    <label className="block">Description:</label>
                    <textarea name="description" type="text" className=" bg-cyan-900 text-white p-2 w-96 h-24" value={task.description}
                        onChange={handleChange} />
                </div>
                <div className=''>
                    <p className='mb-2'>Task Priority: </p>
                    <label>High</label>
                    <input type='radio' name='priority' value="high"
                        checked={task.priority === "high"}
                        onChange={handleChange}></input>

                    <label>Medium</label>
                    <input type='radio' name='priority' value="medium"
                        checked={task.priority === "medium"}
                        onChange={handleChange}></input>
                    <label>Low</label>
                    <input type='radio' name='priority' value="low"
                        checked={task.priority === "low"}
                        onChange={handleChange}></input>
                    <label className='block mt-4'>Deadline:</label>
                    <input type='date' name="deadline_date" className='mt-2 text-black text-lg bg-white mb-4'
                        value={task.deadline_date}
                        onChange={handleChange}
                        required = {isReq}
                    />
                    <input type="time" name="deadline_time" className='text-black text-lg bg-white ml-2'
                        value={task.deadline_time}
                        onChange={handleChange}
                        required = {isReq}
                    /> <br></br>
                    <button type='submit' className='mt-7' title='Click to submit'>{isReq ? 'Add Task' : 'Save Changes'}</button>
                </div>
            </form>
        </div>
    )
}

export default Form