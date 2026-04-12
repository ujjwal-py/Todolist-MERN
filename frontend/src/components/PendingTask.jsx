import high from '../assets/red-flag.svg';
import medium from '../assets/yellow-flag.svg'
import low from '../assets/green-flag.svg'
import clock from '../assets/clock-white.svg';
import check from '../assets/check.svg'
import edit_img from '../assets/edit.svg';
import trash from '../assets/delete.svg'


function PendingTask({ t, handleEdit, deleteTask, markDone }) {
    return (
        <div >
            <div className='flex gap-4 '>
                <h3 >{t.title}</h3>
                <img src={t.priority === "high" ? high : t.priority === "medium" ? medium : low} className='icon-img' />

            </div>

            <div>
                <p className='font-normal text-sm'>{t.description}</p>
            </div>

            <div className='flex flex-col md:flex-row md:gap-4 mt-2'>
                <div className='flex flex-row'>
                    <img src={clock} className='icon-img' />
                    <p className='font-normal '>Deadline: {t.deadline_date} {t.deadline_time}</p>
                </div>
                <div className='flex gap-4 mt-2 md:mt-0'>
                    <img src={check} className='icon-img '
                    onClick={() => {
                        markDone(t._id);
                    }} />
                <img src={edit_img}
                    className='icon-img'
                    onClick={() => {
                        handleEdit(t);
                    }}
                />
                <img src={trash} className='icon-img'
                    onClick={() => {
                        deleteTask(t._id)
                    }}
                />
                </div>
                
            </div>
        </div>
    )
}

export default PendingTask