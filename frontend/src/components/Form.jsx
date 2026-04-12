import React from 'react'

function Form({formData, handleChange, handleSubmit, isReq}) {
    return (
        <div className='p-4 md:p-0'>
            <form className='flex flex-col justify-center gap-6 md:gap-10 md:flex-row ' onSubmit={handleSubmit}>
                <div className=''>
                    <label className="block">Title:</label>
                    <input type="text" name="title" className="w-full md:w-96 mb-4" value={formData.title} required = {isReq}
                        onChange={handleChange} />
                    <label className="block">Description:</label>
                    <textarea name="description" type="text" className=" bg-[#76ABDF] text-white p-2 w-full md:w-96 h-24 resize-none" value={formData.description}
                        onChange={handleChange} />
                </div>
                <div className='flex flex-col'>
                    <p className='mb-2'>Task Priority: </p>
                    <div className='flex gap-6 mb-4 flex-wrap'>
                        <label className='flex items-center gap-2'>
                            <input type='radio' name='priority' value="high"
                                checked={formData.priority === "high"}
                                onChange={handleChange}></input>
                            High
                        </label>

                        <label className='flex items-center gap-2'>
                            <input type='radio' name='priority' value="medium"
                                checked={formData.priority === "medium"}
                                onChange={handleChange}></input>
                            Medium
                        </label>
                        <label className='flex items-center gap-2'>
                            <input type='radio' name='priority' value="low"
                                checked={formData.priority === "low"}
                                onChange={handleChange}></input>
                            Low
                        </label>
                    </div>
                    <label className='block mt-4'>Deadline:</label>
                    <div className='flex flex-col md:flex-row gap-2 md:gap-2'>
                        <input type='date' name="deadline_date" className='mt-2 text-black text-lg bg-white flex-1 md:flex-none'
                            value={formData.deadline_date}
                            onChange={handleChange}
                            required = {isReq}
                        />
                        <input type="time" name="deadline_time" className='text-black text-lg bg-white flex-1 md:flex-none'
                            value={formData.deadline_time}
                            onChange={handleChange}
                            required = {isReq}
                        /> 
                    </div>
                    <button type='submit' className='mt-7 w-full md:w-auto' title='Click to submit'>{isReq ? 'Add Task' : 'Save Changes'}</button>
                </div>
            </form>
        </div>
    )
}

export default Form