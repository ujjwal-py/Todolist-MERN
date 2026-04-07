import high from '../assets/red-flag.svg';
import medium from '../assets/yellow-flag.svg'
import low from '../assets/green-flag.svg'
import clock from '../assets/clock-white.svg';
import check from '../assets/check.svg'
import edit_img from '../assets/edit.svg';


function PendingTask({t, handleEdit}) {
    return (
        <div>
            <div className='flex gap-4'>
                <h3 title={t.description}>{t.title}</h3>
                <img src={t.priority === "high" ? high : t.priority === "medium" ? medium : low} className='icon-img' />

            </div>

            <div className='flex gap-4'>
                <div className='flex'>
                    <img src={clock} className='icon-img' />
                    <p className='font-normal'>Deadline: {t.deadline_date} {t.deadline_time}</p>
                </div>
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
            </div>
        </div>
    )
}

export default PendingTask